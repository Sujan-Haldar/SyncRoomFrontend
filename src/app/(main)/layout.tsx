import { AuthProvider } from "@/components";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <AuthProvider>
        <div className="displayNone md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
          <NavigationSidebar />
        </div>
        <main className="md:pl-[72px] h-full">{children}</main>
      </AuthProvider>
    </div>
  );
};

export default MainLayout;
