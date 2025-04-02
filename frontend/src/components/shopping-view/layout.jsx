import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import { FooterWithSocialLinks } from "./footer";

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* common header */}
      <ShoppingHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
      <FooterWithSocialLinks />
    </div>
  );
}

export default ShoppingLayout;
