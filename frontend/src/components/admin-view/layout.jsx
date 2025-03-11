import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./header";
import AdminSideBar from "./sidebar";

const AdminLayout = () => {
  const [openSiderbar, setOpenSidebar] = useState(false);
  return (
    <div className="flex min-h-screen w-full">
      {/* admin sidebar */}
      <AdminSideBar open={openSiderbar} setOpen={setOpenSidebar} />
      <div className="flex flex-1 flex-col">
        {/* admin Header */}
        <AdminHeader open={openSiderbar} setOpen={setOpenSidebar} />
        <main className="flex-1 flex bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
