import './App.css';
import Footer from "./Footer.js"
import Header from "./Header.js"
import Main from "./Main.js"
import { Analytics } from "@vercel/analytics/react"

const App = () => {
  return (
    <>
      <Analytics />
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
