"use client";

import { useRouter } from "next/navigation";
import Button from "./_ui/Button";

// THIS NOT FOUND PAGE COMPONENT WOULD BE REDESINED LATER (BUT FOR NOW, KINDLY ROLE WITH THIS)

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center gap-4">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-dark-gray">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>
      <Button onClick={() => router.push("/dashboard")}>
        Go Back to Dashboard
      </Button>
    </div>
  );
}
