import Table from "@/app/components/ui/Table";

type ProfitBreakdownRow = {
  month: string;
  transfer: string;
  airtime: string;
  bill: string;
  total: string;
};

export default function ProfitBreakdown() {
  const columns: Array<{ key: keyof ProfitBreakdownRow; label: string }> = [
    { key: "month", label: "Month" },
    { key: "transfer", label: "Transfer" },
    { key: "airtime", label: "Airtime" },
    { key: "bill", label: "Bill" },
    { key: "total", label: "Total" },
  ];

  const rows = [
    {
      id: 1,
      data: {
        month: "Jan",
        transfer: "₦40,000",
        airtime: "₦90,000",
        bill: "₦30,000",
        total: "₦150,000",
      },
    },
    {
      id: 2,
      data: {
        month: "Feb",
        transfer: "₦40,000",
        airtime: "₦90,000",
        bill: "₦30,000",
        total: "₦150,000",
      },
    },
    {
      id: 3,
      data: {
        month: "Mar",
        transfer: "₦40,000",
        airtime: "₦90,000",
        bill: "₦30,000",
        total: "₦150,000",
      },
    },
    {
      id: 4,
      data: {
        month: "April",
        transfer: "₦40,000",
        airtime: "₦90,000",
        bill: "₦30,000",
        total: "₦150,000",
      },
    },
  ];
  return <Table columns={columns} rows={rows} />;
}
