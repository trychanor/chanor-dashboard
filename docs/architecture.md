# Chanor Dashboard Architecture

## Purpose

Chanor Dashboard is a Next.js App Router application for internal fintech
operations. It uses Clerk for access control, TanStack Query for browser data,
and a protected Next.js API layer for supervisor API requests.

Use this document when you add a dashboard screen, UI feature, or API
integration.

## Application Structure

```text
app/
  (pages)/dashboard/        Protected dashboard routes and dashboard shell
  api/                      Protected browser-facing API routes
  components/global/        Header and sidebar
  components/feature/       Domain UI, grouped by feature
  components/ui/            Reusable UI primitives
  providers/                Clerk, query, environment, and device providers
  store/                    Shared client state
  loading.tsx               Application loading UI
lib/
  api/                      HTTP clients, route helpers, and API modules
  hooks/                    TanStack Query hooks
  models/                   API response-to-view-model mapping
types/                      Shared API contracts
```

`app/layout.tsx` installs the global providers. The dashboard route layout adds
the fixed sidebar, header, and scrollable content area. Dashboard pages should
only compose the feature components needed for that route.

## Routes And Rendering

Use Server Components by default. Add `"use client"` only when a component
needs browser events, React state, a browser-only hook, or TanStack Query.

Use these placement rules:

- Put route entry points in `app/(pages)/dashboard/<route>/page.tsx`.
- Put a feature's interactive UI in `app/components/feature/<feature>/`.
- Put shared controls in `app/components/ui/`.
- Keep global navigation in `app/components/global/`.
- Keep dashboard route pages thin. Compose feature components there.

## UI Build Pattern

Before creating a component, check `app/components/ui/` and the relevant
feature folder for an existing fit. Reuse shared controls when possible.

Current shared primitives include `Button`, `Table`, `Tabs`, `Dropdown`,
`Pagination`, `SearchBar`, `Status`, `EmptyState`, `TableSkeleton`,
`RefreshButton`, `ViewButton` etc.

Use these conventions:

- Use Tailwind classes and the colour tokens in `app/globals.css`.
- Use `raba-orange` for primary commands. Use neutral borders and surfaces for
  operational dashboard content.
- Use Lucide icons for familiar actions.
- Keep sections as unframed layouts. Use cards for repeated or truly bounded
  information only.
- Keep responsive constraints on tables, grids, and controls.
- Use the shared `Table` for structured records. Its row action menu renders
  in a portal to prevent table overflow problems.
- Use `EmptyState` for successful responses with no records.
- Use friendly product copy for failures. Do not show raw API errors to users.

### Loading States

Use the loading state that matches the operation:

- Use the route or application loader for the first data load.
- Use a content-shaped skeleton for a manual refresh. Do not reload the route.
- Keep existing data visible during ordinary search, pagination, and filter
  requests when the query can retain previous data.
- Disable only the control that cannot run during the request.

The User View and customer details screens implement this pattern. Their
Refresh buttons call TanStack Query `refetch()` and show skeletons without a
Next.js route refresh.

## Authentication And Access Control

`proxy.ts` protects `/dashboard/*`. A user must be signed in and must have the
configured Clerk dashboard organization as their active organization.

Browser-facing API routes must repeat this check. Use
`getDashboardRouteAccessError` from `lib/api/dashboard-route-access.ts` before
calling the supervisor API. This protects API routes when a caller bypasses
the dashboard UI.

Do not put server credentials in browser code. Do not use `NEXT_PUBLIC_` for
supervisor API credentials or service URLs that should remain server-only.

## API Integration Pattern

Use this request path for interactive dashboard data:

```text
Client component
  -> TanStack Query hook
  -> lib/api/browser-client.ts
  -> app/api/<domain>/route.ts
  -> dashboard-route-access.ts
  -> lib/api/<domain> module
  -> lib/api/http-client.ts
  -> Supervisor API
```

This pattern keeps credentials and Clerk tokens on the server. It also lets the
browser Network panel show normal JSON responses from `/api/...` routes.

### Server HTTP Client

`lib/api/http-client.ts` is server-only. It creates the shared Ky client and:

- Selects the supervisor base URL from `API_ENV`.
- Adds the Clerk bearer token when available.
- Adds the supervisor API key when configured.
- Uses a 10-second request timeout.
- Converts failures to the shared `ApiResult<T>` shape.

Use `safeApiCall` in API modules. Do not create a separate Ky instance for a
feature without a clear requirement.

### API Modules

Put backend calls in `lib/api/<domain>/`. For example,
`lib/api/supervisor/customers.ts` owns the supervisor customer requests.

API modules must:

- Define request parameter types.
- Use the shared server HTTP client.
- Return `ApiResult<T>` through `safeApiCall`.
- Avoid UI formatting and browser-only code.

### Route Handlers

Put browser-facing handlers in `app/api/<domain>/route.ts`. For a dynamic
resource, use `app/api/<domain>/[id]/route.ts`.

Each handler must:

1. Set `dynamic = "force-dynamic"` for authenticated live data.
2. Check access with `getDashboardRouteAccessError`.
3. Validate all query and path input.
4. Reuse `readPositiveInteger` and `MAX_PAGE_SIZE` for pagination.
5. Call the domain API module.
6. Return the `ApiResult` as JSON.
7. Return `502` when the upstream request returns an error.

Do not call the supervisor API directly from a client component. Do not expose
the server Ky client to client code.

### Browser Client And Query Hooks

`lib/api/browser-client.ts` fetches a local `/api/...` path and parses the
shared JSON response shape. It uses `cache: "no-store"` for live dashboard
data.

Create a hook in `lib/hooks/` for client data consumption. Use TanStack Query
keys that include every request input. Use `keepPreviousData` for paginated
lists when retaining the previous table improves the experience.

Keep query hooks focused on fetching and cache behavior. Put raw response
conversion in a model mapper.

## Data Models And UI Contracts

The backend response is not the UI contract. Map it before rendering.

Use `lib/models/<domain>.model.ts` for defensive conversion from `unknown` API
data to stable UI models. The customer mapper is the reference pattern.

Mappers must:

- Validate required identifiers and structural data.
- Convert nullable fields to `null` or a safe empty array.
- Convert API-specific values, such as decimal objects, to UI values.
- Keep backend field names out of feature components where practical.
- Throw a clear internal error when a required response structure is invalid.

Feature components should render the mapped model and choose user-facing
fallback copy, such as `Not available` or an `EmptyState`.

## Adding A New API-Backed Feature

1. Define or extend the shared API types in `types/`.
2. Add the server request in `lib/api/<domain>/`.
3. Add a response mapper in `lib/models/` when the API shape is not already a
   suitable UI contract.
4. Add a protected route handler in `app/api/`.
5. Add a browser query hook in `lib/hooks/`.
6. Build the feature UI from shared components first.
7. Add loading, empty, unavailable, and retry states.
8. Verify the new endpoint in the browser Network panel and with the Postman
   collection when applicable.
9. Run `npx tsc --noEmit --pretty false --incremental false`, `npm run lint`,
   and `npm run build` for TypeScript or route changes.

## Environment Configuration

Use the documented variable names in `.env.example`.

- `APP_ENV` controls application environment context.
- `API_ENV=local` selects the local supervisor API URL.
- Other `API_ENV` values select the remote supervisor API URL.
- Clerk dashboard organization configuration is required for protected routes.

Do not add real credential values to documentation, source code, or commits.
