import UserAction from "./UserAction";
import UserTable from "./UserTable";

export default function UserView() {
  return (
    <div className="mt-3 bg-white rounded-lg">
      <UserAction />
      <UserTable />
    </div>
  );
}
