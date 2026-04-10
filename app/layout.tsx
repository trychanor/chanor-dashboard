import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Bounce, ToastContainer } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import CustomClerkProvider from "./providers/clerk-provider";
import { EnvironmentProvider } from "./providers/environment-provider";
import { headers } from "next/headers";
import MobileAwareProvider from "./providers/mobile-aware-provider";
import QueryProvider from "./providers/query-provider";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chanor Admin",
  description: "Chanor admin dashboard - for analytics, monitoring and support",
};

function isLikelyPhoneUserAgent(agent: string) {
  const userAgent = agent.toLowerCase();

  return (
    /iphone|ipod|windows phone|blackberry|opera mini/.test(
      userAgent
    ) ||
    (/android/.test(userAgent) &&
      /mobile/.test(userAgent) &&
      !/tablet/.test(userAgent))
  );
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerStore = await headers();
  const userAgent = headerStore.get("user-agent") ?? "";
  const initialIsMobile = isLikelyPhoneUserAgent(userAgent);

  return (
    <CustomClerkProvider>
      <html lang="en">
        <body className={`${poppins.className} antialiased`}>
          <MobileAwareProvider initialIsMobile={initialIsMobile}>
            <EnvironmentProvider environment={process.env.APP_ENV!}>
              <QueryProvider>{children}</QueryProvider>
            </EnvironmentProvider>
          </MobileAwareProvider>
          <ToastContainer
            position="top-left"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </body>
      </html>
    </CustomClerkProvider>
  );
}
