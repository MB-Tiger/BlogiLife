import Navbar from "../Navbar";
import Footer from "../Footer";

const MainLayout = (props) => {
  return (
    <>
      <Navbar />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
