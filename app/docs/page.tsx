"use client";
// THIS IS THE USAGE FOR ALL REUSABLE UI

import { Activity, ArrowUp, MoveRight, User } from "lucide-react";
import Button from "../_ui/Button";
import LoaderMini from "../_ui/LoaderMini";
import Status from "../_ui/Status";
import Skeleton from "../_ui/Skeleton";
import MediaButton from "../_ui/MediaButton";
import { TOAST_PROPERTIES } from "../_config/toast.config";
import { toast } from "react-toastify";
import Textarea from "../_ui/Textarea";
import SearchBar from "../_ui/SearchBar";
import { useState } from "react";
import Card from "../_ui/Card";
import Dropdown from "../_ui/Dropdown";
import Tabs from "../_ui/Tabs";
import LineCharts from "../_ui/LineChart";
import PieCharts from "../_ui/PieChart";
import DateTimePicker from "../_ui/DateTimePicker";
import Modal from "../_ui/Modal";
import Table from "../_ui/Table";

type DocsTableRow = {
  ticketId: string;
  sender: string;
  receiver: string;
  amount: string;
  date: string;
  status: React.ReactNode;
};

export default function DocsPage() {
  const [query, setQuery] = useState("");
  const [value, setValue] = useState("");
  const [activeTab, setActiveTab] = useState("Daily Net");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const tabs = [
    { key: "Daily Net", label: "Daily Net", content: "Daily Net" },
    { key: "Float Gauge", label: "Float Gauge", content: "Float Gauge" },
    { key: "Users Wallet", label: "Users Wallet", content: "Users Wallet" },
    {
      key: "Business Wallet",
      label: "Business Wallet",
      content: "Business Wallet",
    },
  ];

  // Line Chart Sample data
  const data = [
    { name: "Monday", pv: 2400, amt: 2400 },
    { name: "Tuesday", pv: 1398, amt: 2210 },
    { name: "Wednesday", pv: 9800, amt: 2290 },
    { name: "Thursday", pv: 3908, amt: 2000 },
    { name: "Friday", pv: 4800, amt: 2181 },
    { name: "Saturday", pv: 3800, amt: 2500 },
    { name: "Sunday", pv: 4300, amt: 2100 },
  ];

  // Pie Chart Data
  const channelData = [
    { name: "Voice", value: 58 },
    { name: "WhatsApp", value: 30 },
    { name: "Web", value: 10 },
  ];

  const handleSearch = (value: string) => {
    console.log("Searching for:", value);
    // API call, filter table, etc.
  };

  const columns: Array<{ key: keyof DocsTableRow; label: string }> = [
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
      // actions: <Button>Edit</Button>,
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
        status: <Status label="failed" appearance="subtle" showDot={true} />,
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
        status: <Status label="failed" appearance="subtle" showDot={true} />,
      },
    },
  ];

  // ALERT FUNCTIONS
  const showSuccess = () => {
    toast.success("Success", TOAST_PROPERTIES);
  };
  const showError = () => {
    toast.error("Error", TOAST_PROPERTIES);
  };
  const showWarning = () => {
    toast.warning("Warning", TOAST_PROPERTIES);
  };
  const showInfo = () => {
    toast.info("Info", TOAST_PROPERTIES);
  };
  return (
    <div className="m-10">
      {/* Page header */}
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-[#111827]">
          Reusable UI — Usage Examples
        </h1>
        <p className="mt-2 text-sm text-gray-600 max-w-3xl leading-relaxed">
          This page demonstrates how to use the reusable UI components available
          in the design system. <strong>Important:</strong> the UI components
          are presentational, do the logic and heavy lifting in the parent
          component. Pass only data, simple callbacks (like <code>onClick</code>
          ) and props required for rendering. Avoid embedding business logic
          inside the UI components.
        </p>
      </header>

      {/* STATUS/USAGE */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[#0f172a] mb-2">
          Status / Badge
        </h2>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed max-w-2xl">
          The <strong>Status</strong> component renders small status badges used
          across the app. It comes in multiple appearance variants so it fits
          different visual contexts:
        </p>
        <ul className="list-disc ml-5 mb-4 text-sm text-gray-600 max-w-2xl">
          <li>
            <strong>solid</strong> — filled badge for high emphasis.
          </li>
          <li>
            <strong>subtle</strong> — light background for lower emphasis.
          </li>
          <li>
            <strong>subtle-rounded</strong> — subtle with rounded corners.
          </li>
        </ul>
        <p className="text-sm text-gray-600 mb-3">
          Check the Status component UI for available props (e.g.{" "}
          <code>label</code>, <code>appearance</code>, <code>showDot</code>).
          The component is presentational, compute statuses and pass the
          resulting values from the parent.
        </p>
        <div className="flex gap-2">
          <Status label="failed" appearance="solid" showDot={false} />
          <Status label="active" appearance="subtle" showDot={true} />
          <Status label="pending" appearance="subtle-rounded" showDot={false} />
        </div>
      </section>

      {/* BUTTON */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[#0f172a] mb-2">Button</h2>
        <p className="text-sm text-gray-600 mb-3 leading-relaxed max-w-2xl">
          The <strong>Button</strong> component supports several visual variants
          and accepts typical action props such as <code>onClick</code>,{" "}
          <code>disabled</code>, and custom styling via{" "}
          <code>additionalStyles</code> or <code>className</code>. Use buttons
          to trigger actions from the parent component, keep the logic outside
          of the UI component.
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Common variants included: <strong>default</strong>,{" "}
          <strong>destructive</strong>,<strong>outline</strong>,{" "}
          <strong>success</strong>, and <strong>text</strong>.
        </p>
        <div className="flex gap-2">
          <Button additionalStyles="cursor-not-allowed">
            <LoaderMini size={20} color="white" /> Loading...
          </Button>
          <Button variant="destructive">Delete</Button>
          <Button variant="outline">Go Back</Button>
          <Button variant="success">Operation Successful</Button>
          <Button variant="text">
            View All <MoveRight />
          </Button>
        </div>
      </section>

      {/* SKELETON UI */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[#0f172a] mb-2">
          Skeleton UI
        </h2>
        <p className="text-sm text-gray-600 mb-3 leading-relaxed max-w-2xl">
          The <strong>Skeleton</strong> component provides placeholder UI during
          loading states. Use it if you prefer placeholders over traditional
          spinners/loader components. Pass size via className or style
          (width/height).
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Example: pass width and height as extra styles (e.g.{" "}
          <code>className=&quot;w-60 h-60&quot;</code>).
        </p>
        <div>
          <Skeleton className="w-60 h-60 mb-2" />
          <Skeleton className="w-40 h-5 mb-2" />
          <Skeleton className="w-20 h-5" />
        </div>
      </section>

      {/* MEDIA PLAY/PAUSE BUTTON */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[#0f172a] mb-2">
          Media Button
        </h2>
        <p className="text-sm text-gray-600 mb-3 leading-relaxed max-w-2xl">
          <strong>MediaButton</strong> renders a simple play / pause control.
          Provide <code>mode=&quot;play&quot;</code> or{" "}
          <code>mode=&quot;pause&quot;</code> and optionally pass a{" "}
          <code>size</code> prop to adjust its dimensions. Keep play/pause
          handling logic in the parent component.
        </p>
        <div className="flex gap-2">
          <MediaButton mode="play" />
          <MediaButton mode="pause" size={50} />
        </div>
      </section>

      {/* LOADER */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[#0f172a] mb-2">Loader</h2>
        <p className="text-sm text-gray-600 mb-3 leading-relaxed max-w-2xl">
          Use the loader (e.g., <strong>LoaderMini</strong>) to show short,
          inline loading states. You can customize size via props. The loader is
          intended for visual feedback only, run your async logic in the parent.
        </p>
        <div>
          <LoaderMini />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[#0f172a] mb-2">
          Alerts (Toasts / Notifications)
        </h2>
        <p className="text-sm text-gray-600 mb-3 leading-relaxed max-w-3xl">
          The project integrates <strong>react-toastify</strong> for toast
          notifications. The Raba design toast closely matches react-toastify,
          so we rely on that library for consistency and simplicity.
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Call the toast helpers from the parent (for example:{" "}
          <code>toast.success(content, TOAST_PROPERTIES)</code>,
          <code>toast.error(...)</code>, <code>toast.info(...)</code>,{" "}
          <code>toast.warning(...)</code>). The <code>TOAST_PROPERTIES</code>{" "}
          configuration is defined in <code>toast.config.ts</code>.
        </p>
        <div className="flex gap-2 mb-3">
          <Button variant="success" onClick={showSuccess}>
            Show Success
          </Button>
          <Button variant="destructive" onClick={showError}>
            Show Error
          </Button>
          <Button variant="text" onClick={showInfo}>
            Show Info
          </Button>
          <Button variant="outline" onClick={showWarning}>
            Show Warning
          </Button>
        </div>
        <p className="text-sm text-gray-600">
          Visit the react-toastify docs for details on available properties and
          behaviour:
          <a
            href="https://fkhadra.github.io/react-toastify/introduction/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 underline text-sm"
          >
            react-toastify — introduction
          </a>
        </p>
      </section>

      {/* TEXTAREA */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[#0f172a] mb-2">Textarea</h2>
        <p className="text-sm text-gray-600 mb-3 leading-relaxed max-w-2xl">
          The <strong>Textarea</strong> component supports multiple visual
          variants:
          <strong> default</strong>, <strong>outline</strong>,{" "}
          <strong>error</strong>, and <strong>success</strong>. Use the{" "}
          <code>variant</code> prop to reflect validation or state. Pass rows,
          placeholder and className for sizing when needed.
        </p>
        <div className="grid gap-3">
          <Textarea
            placeholder="Add  any comment  or note about this  approval"
            rows={5}
            variant="default"
          />
          <Textarea
            placeholder="Outline variant"
            variant="outline"
            className="h-32"
          />
          <Textarea placeholder="Error variant" variant="error" />
          <Textarea placeholder="Success variant" variant="success" />
        </div>
      </section>

      {/* SEARCH */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[#0f172a] mb-2">
          Search Bar
        </h2>
        <p className="text-sm text-gray-600 mb-3 leading-relaxed max-w-2xl">
          <strong>SearchBar</strong> is a controlled component. Pass{" "}
          <code>value</code>,<code>onChange</code> and <code>onSearch</code>{" "}
          callbacks from the parent. Keep filtering and API logic outside the UI
          component.
        </p>
        <SearchBar
          value={query}
          onChange={setQuery}
          onSearch={handleSearch}
          placeholder="Search users by name or email..."
          className="w-full"
        />
      </section>

      {/* CARDS */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[#0f172a] mb-2">Cards</h2>
        <p className="text-sm text-gray-600 mb-3 leading-relaxed max-w-3xl">
          The <strong>Card</strong> component is flexible: pass any combination
          of <code>header</code>,<code>main</code> and <code>footer</code>{" "}
          sections. Do calculations and data formatting in the parent; provide
          only rendered values or elements to the Card.
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Styling hints used in examples below: icon size ~{" "}
          <strong>20px</strong>, <strong>h2</strong> is <strong>24px</strong>,
          paragraph text ~ <strong>14px</strong>. Use design tokens such as{" "}
          <strong>red-primary</strong>, <strong>green-primary</strong>, and
          neutral/gray tokens as needed.
        </p>
        <div className="flex gap-2">
          <Card
            header={
              <div className="flex items-center justify-between">
                <p className="text-[14px] text-[#1a1a1a]">User</p>
                <User className="w-5 h-5 text-[#8E8E93]" />
              </div>
            }
            main={
              <>
                <h2 className="text-[24px] font-bold text-[#1a1a1a]">5320</h2>
              </>
            }
            footer={
              <>
                <p className="text-sm text-dark-gray">
                  <span className="text-red-primary">-25%</span> From last week
                </p>
              </>
            }
          />
          <Card
            header={
              <div className="flex items-center justify-between">
                <p className="text-sm text-dark-gray">User Wallet Balance</p>
                <Activity className="w-5 h-5 text-green-primary" />
              </div>
            }
            footer={
              <>
                <h2 className="text-[24px] font-bold text-neutral-black">
                  37,000.00
                </h2>

                <p className="flex items-center text-[13px] text-green-primary">
                  <ArrowUp className="w-5 h-5" />
                  <span className="">-85% </span> From last month
                </p>
              </>
            }
          />
        </div>
      </section>

      {/* DROPDOWN */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[#0f172a] mb-2">Dropdown</h2>
        <p className="text-sm text-gray-600 mb-3 leading-relaxed max-w-3xl">
          <strong>Dropdown</strong> supports many variants (sizes, directions,
          custom triggers, custom option rendering). Use the parent to handle
          selection state or pass
          <code>value</code> and <code>onChange</code> for controlled behavior.
        </p>
        <div className="flex flex-wrap gap-2">
          <Dropdown
            options={[
              { label: "React", value: "react" },
              { label: "Next.js", value: "next" },
              { label: "Vue", value: "vue" },
            ]}
          />
          <Dropdown
            value={value}
            onChange={(v) => setValue(v)}
            direction="top"
            options={[
              { label: "USD", value: "usd" },
              { label: "EUR", value: "eur" },
            ]}
          />
          <Dropdown
            trigger={
              <div className="px-3 py-2 bg-black text-white rounded-md">
                Open Menu
              </div>
            }
            options={[
              { label: "Profile", value: "profile" },
              { label: "Settings", value: "settings" },
            ]}
          />
          <Dropdown
            options={[
              { label: "Frontend", value: "fe" },
              { label: "Backend", value: "be" },
            ]}
            renderOption={(item, selected) => (
              <div className="flex items-center gap-2">
                <span>{item.label}</span>
                {selected && <span className="text-green-600">✔</span>}
              </div>
            )}
          />
          <Dropdown
            size="sm"
            variant="outline"
            options={[
              { label: "React", value: "react" },
              { label: "Next.js", value: "next" },
              { label: "Vue", value: "vue" },
            ]}
          />
          <Dropdown
            size="md"
            variant="solid"
            options={[
              { label: "React", value: "react" },
              { label: "Next.js", value: "next" },
              { label: "Vue", value: "vue" },
            ]}
          />
          <Dropdown
            size="lg"
            variant="outline"
            options={[
              { label: "React", value: "react" },
              { label: "Next.js", value: "next" },
              { label: "Vue", value: "vue" },
            ]}
          />
          <Dropdown
            className="w-full"
            width="100%"
            options={[
              { label: "React", value: "react" },
              { label: "Next.js", value: "next" },
              { label: "Vue", value: "vue" },
            ]}
          />
        </div>
      </section>

      {/* TAB USAGE */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[#0f172a] mb-2">Tabs</h2>
        <p className="text-sm text-gray-600 mb-3 leading-relaxed max-w-3xl">
          <strong>Tabs</strong> accepts an array of tab objects:{" "}
          <code>{`{ key, label, content }`}</code>. The <code>content</code> can
          be any React node, table, list, chart, or a custom component. Manage
          the active tab and any data fetching in the parent; Tabs is
          responsible for rendering the UI.
        </p>
        <div>
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>
      </section>

      {/* LINE CHART */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[#0f172a] mb-2">
          Line Chart
        </h2>
        <p className="text-sm text-gray-600 mb-3 leading-relaxed max-w-3xl">
          The LineCharts component accepts data arrays and provides a simple way
          to render trend graphs. Modify width, height and data in the parent as
          required.
        </p>
        <LineCharts data={data} />
      </section>

      {/* PIE CHART */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[#0f172a] mb-2">Pie Chart</h2>
        <p className="text-sm text-gray-600 mb-3 leading-relaxed max-w-3xl">
          The PieCharts component expects an array of objects with{" "}
          <code>name</code> and <code>value</code>. Use the parent to transform
          or aggregate the data before passing it to the chart.
        </p>
        <PieCharts data={channelData} />
      </section>

      {/* DATE TIME PICKER */}
      <section>
        <h2 className="text-xl font-semibold text-[#0f172a] mb-2">
          Date Time Picker
        </h2>
        <div>
          <DateTimePicker />
          <DateTimePicker value={date} onChange={setDate} />
          <p>A date picker with only date</p>
          <DateTimePicker showTime={false} />
          <DateTimePicker
            minDate={new Date()}
            maxDate={new Date("2025-12-31")}
          />
          <p>A form sample date picker</p>
          <form>
            <label className="text-sm font-medium">Event Date</label>
            <DateTimePicker
              onChange={(d) => console.log("Selected:", d)}
              className="mt-1"
            />
            <Button variant="success">Submit</Button>
          </form>
        </div>
      </section>

      <div>
        <h2 className="text-xl font-semibold text-[#0f172a] mb-2">Modals</h2>
        <p className="text-sm text-gray-600 mb-3 leading-relaxed max-w-3xl">
          This modal component can be used for any action like deleting, showing
          more details, forms etc, check the ui component to see what data can
          be passed and you can see some sample below
        </p>
        <Button variant="destructive" onClick={() => setIsDeleteOpen(true)}>
          Show Delete Modal
        </Button>
        <Modal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          title="Delete Item"
          actions={
            <>
              <Button variant="outline">Cancel</Button>
              <Button variant="destructive">Delete</Button>
            </>
          }
        >
          <p>
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>
        </Modal>
      </div>
      <div>
        <Button onClick={() => setIsFormOpen(true)}>Show Form Modal</Button>
        <Modal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          title="Add New User"
          width="400px"
          actions={<Button variant="success">Submit</Button>}
        >
          <form
            id="userForm"
            // onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="Name"
              className="border px-3 py-2 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              className="border px-3 py-2 rounded"
            />
          </form>
        </Modal>
      </div>
      <div>
        <Button variant="text" onClick={() => setIsInfoOpen(true)}>
          Show Info Modal
        </Button>
        <Modal
          isOpen={isInfoOpen}
          onClose={() => setIsInfoOpen(false)}
          title="System Info"
        >
          <p>The system will undergo maintenance at 2 AM tonight.</p>
        </Modal>
      </div>

      <section>
        <h2 className="text-xl font-semibold text-[#0f172a] mb-2">Tables</h2>
        <p>
          Ensure you check the table component to see further flexibilty and
          action.
        </p>
        <Table columns={columns} rows={rows} />
      </section>
    </div>
  );
}
