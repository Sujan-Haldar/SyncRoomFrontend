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
      <div className=" md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        {/*I have  Removed Hidden From this div */}
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default ServerIdLayout;
