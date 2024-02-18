import Header from "@/components/modules/Header";
import Footer from "../modules/Footer";

async function Layout({ children }) {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
