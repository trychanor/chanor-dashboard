import { auth } from "@clerk/nextjs/server";

const API_BASE_URL = "https://rabapay.onrender.com/api/v1";

export async function testSupervisorUsersEndpoint() {
  // ✅ auth() MUST be awaited in App Router
  const { getToken } = await auth();

  const token = await getToken();

  if (!token) {
    throw new Error("No Clerk auth token found");
  }

  const res = await fetch(
    `${API_BASE_URL}/supervisors/analytics/users`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "x-apikey": process.env.SUPERVISOR_API_KEY as string,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  const data = await res.json();

  return {
    status: res.status,
    data,
  };
}
