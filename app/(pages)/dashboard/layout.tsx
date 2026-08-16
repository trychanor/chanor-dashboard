import Header from "@/app/components/global/Header";
import Sidebar from "@/app/components/global/Sidebar";

export default function DahboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      <div className="ml-[248px] flex flex-col h-screen bg-[#F9FAFB]">
        <Header />
        <main className="flex-1 overflow-auto md:p-8 px-4">{children}</main>
      </div>
    </>
  );
}
