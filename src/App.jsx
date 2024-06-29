import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index.jsx";
import RedirectPage from "./pages/RedirectPage.jsx";

function App() {
  const [links, setLinks] = useState([]);
  const handleLinkClick = (name) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.name === name ? { ...link, traffic: link.traffic + 1 } : link
      )
    );
  };

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/redirect/:linkName" element={<RedirectPage links={links} handleLinkClick={handleLinkClick} />} />
      </Routes>
    </Router>
  );
}

export default App;