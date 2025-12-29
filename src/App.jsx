import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
    return (
    <BrowserRouter basename="/Aajerna">
      <ScrollToTop />
      <Navbar />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
    );
};

export default App;
