import React from "react";
import blue_block from "../assets/images/blue_hexagonal.png";
import { FaUserTie, FaUsers, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
function Home() {
  return (
    <section className="bg-white dark:bg-gray-900 ">
      <LoadingBar color="#08daf1" progress={100} />
      <div className="py-14 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight leading-auto text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Empowering Decentralized
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-cyan-300 from-sky-400">
            {" "}
            Voting{" "}
          </span>
          with Blockchain
        </h1>
        <p className="mb-8 flex flex-col items-center text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Explore the future of secure and transparent voting systems powered by
          blockchain technology. Your voice matters!
          <p onClick={()=>window.location="https://github.com/LinuxKunaL/Voting-Dapp"} className="cursor-pointer text-cyan-700 flex gap-2 items-center hover:underline ">
            view the source code <FaGithub />
          </p>
        </p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Link to="/voterRegister">
            <a
              href="#watch-video"
              className="inline-flex justify-center  gap-3 items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              <FaUsers />
              voter register
            </a>
          </Link>
          <Link to="/candidateRegister">
            <a
              href="#watch-video"
              className="inline-flex justify-center gap-3 items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              <FaUserTie />
              Candidate register
            </a>
          </Link>
        </div>
        <div className="flex justify-center">
          <img
            className="blue-box w-1/2 md:w-auto"
            style={{ filter: "drop-shadow(0px 30px 120px #5ec4f8)" }}
            // style={{ filter: "drop-shadow(0px 30px 120px #1749aa89)" }}
            src={blue_block}
            alt="blue_block"
          />
        </div>
        {/* <p className="fixed bg-cyan-500 p-3 rounded-xl top-1">
          <Link>
            <FaGithub />
          </Link>
        </p> */}
      </div>
    </section>
  );
}

export default Home;
