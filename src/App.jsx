import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Landing from "./pages/landing";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* HEADER */}
        <header className="title">
          <h2><span>Gear</span> Head</h2>
        </header>

        {/* NAVIGATION */}
        <nav className="section">
          <NavLink className="btn" to="/">Home</NavLink>
          <NavLink className="btn" to="/collection">Collection</NavLink>
          <NavLink className="btn" to="/about">About</NavLink>
          <NavLink className="btn" to="/contact">Contact</NavLink>
        </nav>

        {/* ROUTES */}
        <main className="content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
