import React, { useContext } from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Departments from "../components/Departments";
import FileUpload from "./fileupload";

const Home = () => {
  return (
    <>
      <Hero
        title={
          <>
            Diagnosense Smarter Detection Healthier Futures
            <br />
            <span className="text-gray-600">
              AI-Powered Lung Cancer Detection You Can Trust
            </span>
          </>
        }
        imageUrl="/hero.png"
      />

      <Biography imageUrl={"/about.jpg"} />
      <Departments />
      <FileUpload/>
    </>
  );
};

export default Home;
