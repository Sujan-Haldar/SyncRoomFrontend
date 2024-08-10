import { ServerSidebar } from "@/components";

const ServerIdLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) => {
  return (
    <div className="h-full">
      <div className="displayNone md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default ServerIdLayout;
