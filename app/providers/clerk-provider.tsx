import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";


export default function CustomClerkProvider({ children }: { children: ReactNode }) {
    const hiddenProfileSections = {
        appearance: {
            elements: {
                userButtonPopoverActionButton__signOut: { display: "none" },
                profileSection__emailAddresses: { display: "none" },
                profileSection__phoneNumbers: { display: "none" },
                profileSection__connectedAccounts: { display: "none" },
                profileSection__enterpriseAccounts: { display: "none" },
                profileSection__web3Wallets: { display: "none" },
                profileSection__danger: { display: "none" },
                formFieldRow__firstName: { display: "none" },
                formFieldRow__lastName: { display: "none" },
            },
        },
    }

    return (
        <ClerkProvider
            appearance={hiddenProfileSections.appearance}
        >
            {children}
        </ClerkProvider>
    )
}