import Header from "../_components/Header";
import Sidebar from "../_components/Sidebar";

export default function DahboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />

      <div className="ml-[280px] flex flex-col h-screen bg-[#F9FAFB]">
        <Header />
        <main className="flex-1 overflow-auto p-8 ">{children}</main>
      </div>
    </>
  );
}
