import Link from "next/link";
import Button from "./_ui/Button";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center flex-col text-center justify-center min-h-screen">
        <h1 className="text-raba-orange font-bold text-3xl mb-4">RABA</h1>
        <h2 className="text-2xl font-bold mb-4">Authentication in progress</h2>
        <Link href="/dashboard">
          <Button>Proceed to dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
