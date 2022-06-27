import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainSection from "./components/MainSection";
import SectionThree from "./components/SectionThree";

function App() {
  return (
    <>
      <Header />
      <main>
        <section className="sec-1">
              <div className="container-1">
                <img src="./images/illustration-working.svg" alt="llustration-working" />
              </div>
              <div className="container-2">
                <h1>More than just shorter links</h1>
                <p>
                  Build your brand’s recognition and get detailed insights 
                  on how your links are performing.
                </p>
                <button>Get Started</button>
              </div>
        </section>
        <MainSection />
        <SectionThree />
      </main>
      <Footer />
    </>
  );
}

export default App;
