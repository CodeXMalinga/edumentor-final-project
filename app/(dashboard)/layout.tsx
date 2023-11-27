import Provider from "./Provider";
import Sidebar from "./sidebar/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <div className="pb-20 pt-12 flex flex-row flex-1">
        <Sidebar />
        {children}
      </div>
    </Provider>
  );
}
