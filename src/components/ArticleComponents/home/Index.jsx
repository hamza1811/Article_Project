import React from "react";
import FtechArticles from "../Article/FtechArticles";
import HeroBanner from "./HeroBanner";

function HomePage() {
  return (
    <div className='wrapper'>
      <div className='container-fluid'>
        <HeroBanner />
      </div>
      <div className='container'>
        <FtechArticles />
      </div>
    </div>
  );
}

export default HomePage;
