import { getCurrentUser } from "../lib/session";
import Header from "./components/Header";
import MainNavbar from "../components/MainNavbar";
import { navbarItems } from "../config/navigation";
import { notFound } from "next/navigation";
import "semantic-ui-css/semantic.min.css";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const user = await getCurrentUser();

  if (!user) {
    return notFound();
  }

  return (
    <section>
      <Header user={user} />
      <MainNavbar items={navbarItems.mainNavbar} />
      <main>{children}</main>
    </section>
  );
};

export default DashboardLayout;
