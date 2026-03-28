import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import ScrollBar from "./components/ScrollBar";

import { AnimatePresence, motion } from "framer-motion";

import Chat from "./components/Chat";

function App() {
  const location = useLocation();

  return (
    <>
      <Menu />
      <ScrollBar />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <main>
            <Outlet />
          </main>
        </motion.div>
      </AnimatePresence>

      <Chat />

      <Footer />
    </>
  );
}

export default App;
