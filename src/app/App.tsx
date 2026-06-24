import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import HistoryPage from "../pages/HistoryPage";
import ParliamentaryPage from "../pages/ParliamentaryPage";
import InternationalPage from "../pages/InternationalPage";
import PressPage from "../pages/PressPage";
import OtherPage from "../pages/OtherPage";
import ContactPage from "../pages/ContactPage";
import SearchPage from "../pages/SearchPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/a-propos" element={<AboutPage />} />
          <Route path="/historique" element={<HistoryPage />} />
          <Route path="/travaux-parlementaires" element={<ParliamentaryPage />} />
          <Route path="/international" element={<InternationalPage />} />
          <Route path="/espace-presse" element={<PressPage />} />
          <Route path="/autres" element={<OtherPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/recherche" element={<SearchPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;