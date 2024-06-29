import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import RedirectPage from "./pages/RedirectPage.jsx";

function App() {
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