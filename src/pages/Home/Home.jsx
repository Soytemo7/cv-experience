import Navigation from "../../components/Navigation/Navigation";

import Identity from "../../components/Identity/Identity";
import Experience from "../../components/Experience/Experience";
import About from "../../components/About/About";
import Formation from "../../components/Formation/Formation";
import Evolution from "../../components/Evolution/Evolution";
import Accounting from "../../components/Accounting/Accounting";
import FinanceTechnology from "../../components/FinanceTechnology/FinanceTechnology";
import Books from "../../components/Books/Books";
import LegacyTransition from "../../components/LegacyTransition/LegacyTransition";
import Magazines from "../../components/Magazines/Magazines";
import MagazineTransition from "../../components/MagazineTransition/MagazineTransition";
import Contact from "../../components/Contact/Contact";
import FooterTransition from "../../components/FooterTransition/FooterTransition";
import Footer from "../../components/Footer/Footer";

function Home() {
  return (
    <main>
      <Navigation />
      <Identity />
      <Experience />
      <About />
      <Formation />
      <Evolution />
      <Accounting />
      <FinanceTechnology />
      <Books />
      <LegacyTransition />   
      <Magazines />   
      <MagazineTransition />
      <Contact />
      <FooterTransition />
      <Footer />
    </main>
  );
}

export default Home;