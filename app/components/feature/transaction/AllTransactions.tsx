import { useTransactionViewStore } from "@/app/store/useTransactionViewStore";
import Button from "@/app/components/ui/Button";
import Dropdown from "@/app/components/ui/Dropdown";
import SearchBar from "@/app/components/ui/SearchBar";
import Status from "@/app/components/ui/Status";
import Table from "@/app/components/ui/Table";
import { ArrowLeft, ChevronLeft, ChevronRight, RotateCw } from "lucide-react";

type TransactionRow = {
  ticketId: string;
  sender: string;
  receiver: string;
  amount: string;
  date: string;
  status: React.ReactNode;
};

export default function AllTransactions() {
  const { setShowAllTransactions } = useTransactionViewStore();
  //       const [query, setQuery] = useState("");
  //     const handleSearch = (value: string) => {
  //     console.log("Searching for:", value);
  //     // API call, filter table, etc.
  //   };
  const columns: Array<{ key: keyof TransactionRow; label: string }> = [
    { key: "ticketId", label: "Ticket ID" },
    { key: "sender", label: "Sender" },
    { key: "receiver", label: "Receiver" },
    { key: "amount", label: "Amount" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
  ];

  const rows = [
    {
      id: 1,
      data: {
        ticketId: "TF-2301",
        sender: "David Ola",
        receiver: "John James",
        amount: "$50,000",
        date: "2025-06-13 03:45",
        status: (
          <Status label="successful" appearance="subtle" showDot={true} />
        ),
      },
    },
    {
      id: 2,
      data: {
        ticketId: "TF-2301",
        sender: "David Ola",
        receiver: "John James",
        amount: "$50,000",
        date: "2025-06-13 03:45",
        status: (
          <Status label="successful" appearance="subtle" showDot={true} />
        ),
      },
    },
    {
      id: 3,
      data: {
        ticketId: "TF-2303",
        sender: "David Ola",
        receiver: "John James",
        amount: "$50,000",
        date: "2025-06-13 03:45",
        status: (
          <Status label="successful" appearance="subtle" showDot={true} />
        ),
      },
    },
    {
      id: 4,
      data: {
        ticketId: "TF-2303",
        sender: "David Ola",
        receiver: "John James",
        amount: "$50,000",
        date: "2025-06-13 03:45",
        status: (
          <Status label="successful" appearance="subtle" showDot={true} />
        ),
      },
    },
    {
      id: 5,
      data: {
        ticketId: "TF-2303",
        sender: "David Ola",
        receiver: "John James",
        amount: "$50,000",
        date: "2025-06-13 03:45",
        status: <Status label="pending" appearance="subtle" showDot={true} />,
      },
    },
    {
      id: 6,
      data: {
        ticketId: "TF-2303",
        sender: "David Ola",
        receiver: "John James",
        amount: "$50,000",
        date: "2025-06-13 03:45",
        status: <Status label="failed" appearance="subtle" showDot={true} />,
      },
    },
    {
      id: 7,
      data: {
        ticketId: "TF-2303",
        sender: "David Ola",
        receiver: "John James",
        amount: "$50,000",
        date: "2025-06-13 03:45",
        status: <Status label="failed" appearance="subtle" showDot={true} />,
      },
    },
    {
      id: 8,
      data: {
        ticketId: "TF-2303",
        sender: "David Ola",
        receiver: "John James",
        amount: "$50,000",
        date: "2025-06-13 03:45",
        status: <Status label="pending" appearance="subtle" showDot={true} />,
      },
    },
    {
      id: 9,
      data: {
        ticketId: "TF-2303",
        sender: "David Ola",
        receiver: "John James",
        amount: "$50,000",
        date: "2025-06-13 03:45",
        status: (
          <Status label="successful" appearance="subtle" showDot={true} />
        ),
      },
    },
  ];
  return (
    <div>
      <Button variant="text" onClick={() => setShowAllTransactions(false)}>
        <ArrowLeft /> Go Back
      </Button>
      <div className="flex items-center gap-4">
        <SearchBar
          //   value={query}
          //   onChange={setQuery}
          //   onSearch={handleSearch}
          placeholder="Search transaction"
          className="w-full"
        />
        <div className="flex items-center">
          <Dropdown
            placeholder="Filter By"
            options={[
              { label: "Completed", value: "completed" },
              { label: "Failed", value: "failed" },
              { label: "Pending", value: "pending" },
            ]}
          />
          <Button variant="text">
            <RotateCw /> Refresh
          </Button>
        </div>
      </div>
      <div>
        <Table columns={columns} rows={rows} />
        <div className="flex justify-between items-center mt-8">
          <p className="text-sm leading-[18px] text-[#797979]">
            Showing 1 to 10 of 10 transactions
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" additionalStyles="cursor-not-allowed">
              <ChevronLeft />
              Previous
            </Button>
            <h3 className="flex justify-center items-center text-white bg-neutral-black py-2.5 px-5 h-full rounded-[5px]">
              1
            </h3>
            <Button variant="outline">
              Next
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
