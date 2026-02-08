import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Bounce, ToastContainer } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import CustomClerkProvider from "./providers/clerk-provider";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CustomClerkProvider>
      <html lang="en">
        <body className={`${poppins.className} antialiased`}>
          <QueryProvider>
            {children}
          </QueryProvider>
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
