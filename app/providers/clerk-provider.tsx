import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";


export default function CustomClerkProvider({ children }: { children: ReactNode }) {
    return (
        <ClerkProvider
        // custom options here
        >
            {children}
        </ClerkProvider>
    )
}