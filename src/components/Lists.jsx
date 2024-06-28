import React, { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import man_2HandUps from "../assets/images/man_2HandUps.png";
import { ContractInstanceTestNet } from "../app/ConnectChain";
import { TbMoodEmptyFilled } from "react-icons/tb";

function Lists() {
  const [ListOfCandidate, setListOfCandidate] = useState([]);
  const [ListOfVoter, setListOfVoter] = useState([]);
  useEffect(() => {
    const fetching = async () => {
      const Candidate = await ContractInstanceTestNet.methods
        .CandidateList()
        .call();
      const Voter = await ContractInstanceTestNet.methods.VoterList().call();
      setListOfVoter(Voter);
      setListOfCandidate(Candidate);
    };
    fetching();
  }, []);
  return (
    <section className="bg-white dark:bg-gray-900 flex justify-between flex-col flex-wrap gap-2 items-center">
      <LoadingBar color="#08daf1" progress={100} />
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight leading-auto text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-cyan-300 from-sky-400">
            {" "}
            Candidates <span className="dark:text-white text-gray-900">
              /{" "}
            </span>{" "}
            Voters{" "}
          </span>
          list's
        </h1>
      </div>
      <div className="flex justify-around gap-2 items-center flex-wrap w-full">
        <div className="flex gap-2 flex-col">
          <h4 className="text-xl font-semibold dark:text-white">
            Candidates Lists
          </h4>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {ListOfCandidate.length != 0 ? (
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Id
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Party
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Gender
                    </th>
                    <th scope="col" className="px-6 py-3">
                      age
                    </th>
                    <th scope="col" className="px-6 py-3">
                      address
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ListOfCandidate.map((item) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4">{item.id.toString()}</td>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.party}</td>
                      <td className="px-6 py-4">{item.gender}</td>
                      <td className="px-6 py-4">{item.age.toString()}</td>
                      <td className="px-6 py-4">
                        {item.Address.toString().slice(0, 6)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="w-full flex items-center justify-between p-3 text-gray-500 bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                No Candidates <TbMoodEmptyFilled />
              </div>
            )}
          </div>
        </div>
        <img
          src={man_2HandUps}
          height={420}
          width={340}
          style={{ filter: "drop-shadow(0px 30px 40px #5ec4f840)" }}
          alt=""
        />
        <div className="flex gap-2 flex-col">
          <h4 className="text-xl font-semibold dark:text-white">
            Voters Lists
          </h4>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {ListOfVoter.length != 0 ? (
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Id
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Gender
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Age
                    </th>
                    <th scope="col" className="px-6 py-3">
                      address
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ListOfVoter.map((item) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4">{item.id.toString()}</td>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.gender}</td>
                      <td className="px-6 py-4">{item.age.toString()}</td>
                      <td className="px-6 py-4">
                        {item.Address.toString().slice(0, 6)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="w-full flex items-center justify-between p-3 text-gray-500 bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                No Voter <TbMoodEmptyFilled />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Lists;
