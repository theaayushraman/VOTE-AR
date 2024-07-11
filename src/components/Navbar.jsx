import React, { useEffect, useState } from "react";
import userDefaultLogo from "../assets/images/userDefaultLogo.jpg";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaEthereum } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ToastSuccess, ToastFailure } from "../app/Toast";
import { ContractInstanceTestNet } from "../app/ConnectChain";
import { useDispatch, useSelector } from "react-redux";
import { setAddress, setDateTime, setWinner } from "../app/stateRedux";

import Web3 from "web3";

function Navbar() {
  const Dispatch = useDispatch();
  const ReduxCounter = useSelector((state) => state.stateCounter);
  const VotingDate = useSelector((state) => state.VotingDateTime);
  const Winner = useSelector((state) => state.WinnerId);

  const [account, setAccount] = useState({
    metamask: false,
    account: "0",
    balance: "10 ETH",
  });
  const [Counter, setCounter] = useState(0);

  const [VoteDate, setVoteDate] = useState(VotingDate);

  const ConvertDate = (time) => {
    const Day = new Date(time).getDate();
    const Month = new Date(time).getMonth();
    const Year = new Date(time).getFullYear();

    const Hour = new Date(time).getHours();
    const Minute = new Date(time).getMinutes();

    return `${Day} / ${Month} / ${Year} ${Hour}:${Minute}`;
  };

  useEffect(() => {
    if (localStorage.getItem("metamask") == "true") {
      const web3 = new Web3(window.ethereum);
      window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then(async (account) => {
          const balanceWei = await web3.eth.getBalance(account[0]);
          const balanceEth = web3.utils.fromWei(balanceWei, "ether");
          // await window.ethereum;
          setAccount({
            metamask: true,
            account: account[0],
            balance: balanceEth.toString(),
          });
          Dispatch(setAddress(account[0]));
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setAccount({ metamask: false });
    }
  }, [Counter]);

  useEffect(() => {
    const fetching = async () => {
      try {
        const { StartDate, EndDate } = await ContractInstanceTestNet.methods
          .datetimes()
          .call();

        if (StartDate == 0 || EndDate == 0) {
          setVoteDate({
            StartDate: 0,
            EndDate: 0,
          });
          Dispatch(
            setDateTime({
              StartDate: 0,
              EndDate: 0,
            })
          );
          return null;
        } else if (new Date().getTime() >= parseInt(EndDate)) {
          return null;
        } else if (StartDate != 0 || EndDate != 0) {
          setVoteDate({
            StartDate: ConvertDate(parseInt(StartDate)),
            EndDate: ConvertDate(parseInt(EndDate)),
          });
          Dispatch(
            setDateTime({
              StartDate: parseInt(StartDate),
              EndDate: parseInt(EndDate),
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetching();
  }, [ReduxCounter]);

  useEffect(() => {
    const fetching = async () => {
      try {
        const response = await ContractInstanceTestNet.methods
          .winnerName()
          .call();
        Dispatch(setWinner(response));
      } catch (error) {
        console.log(error);
      }
    };
    fetching();
  }, [ReduxCounter]);

  const HandleConnectMetamask = async () => {
    if (window.ethereum) {
      window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then(() => {
          localStorage.setItem("metamask", true);
          ToastSuccess("metamask connected ! 🎉");
          setCounter(Counter + 1);
        })
        .catch((error) => {
          ToastFailure(error.message + " 💔");
        });
    } else {
      ToastFailure("Metamask is not installed ! 💔");
    }
  };

  const logoutMetamask = () => {
    localStorage.setItem("metamask", false);
    setCounter(Counter + 1);
    Dispatch(setAddress(0));
  };

  return (
    <nav className="border-gray-200 z-10 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 rounded-xl sm:mt-4  sticky top-0">
      <Toaster position="left" />
      <div className="flex relative flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            VOTE AR{" "}
            <span className="text-cyan-500 text-sm font-light">MADE by AAYUSH, RAYANSH & KRITARTH</span>
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-solid-bg"
          onClick={() => {
            document
              .getElementById("navbar-solid-bg")
              .classList.toggle("show-nav");
          }}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-solid-bg"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className="hidden z-50 absolute md:relative top-20 left-0 md:top-auto md:left-auto w-full md:block md:w-auto"
          id="navbar-solid-bg"
        >
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <li>
              <Link
                className="block py-2 px-3 md:p-0 text-white bg-cyan-700 rounded md:bg-transparent md:text-cyan-700 md:dark:text-cyan-500 dark:bg-cyan-600 md:dark:bg-transparent"
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/vote"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-cyan-700 dark:text-white md:dark:hover:text-cyan-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Vote
              </Link>
            </li>
            <li>
              <Link
                to="/lists"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-cyan-700 dark:text-white md:dark:hover:text-cyan-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Lists
              </Link>
            </li>
            <li>
              <Link
                to="/electionCommission"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-cyan-700 dark:text-white md:dark:hover:text-cyan-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Election Commission
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-4">
          {account.metamask ? (
            <>
              <img
                className="w-10 h-10 rounded-full"
                src={userDefaultLogo}
                alt=""
              />
              <div className="font-medium dark:text-white flex flex-col gap-1">
                <div className="flex flex-row items-center gap-2">
                  <span
                    title={account.balance}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    {account.balance.slice(0, 5)} ETH <FaEthereum />
                  </span>
                  <button
                    type="button"
                    onClick={() => logoutMetamask()}
                    className="text-cyan-700 border cursor-pointer border-cyan-700 hover:bg-cyan-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded text-sm p-1 text-center inline-flex items-center dark:border-cyan-500 dark:text-cyan-500 dark:hover:text-white dark:focus:ring-cyan-800 dark:hover:bg-cyan-500"
                    title="LogOut"
                  >
                    <RiLogoutCircleRLine />
                  </button>
                </div>
                <div
                  title={account.account}
                  className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer"
                >
                  {account.account.slice(0, 7) +
                    "..." +
                    account.account.slice(37)}
                </div>
              </div>
            </>
          ) : (
            <button
              onClick={HandleConnectMetamask}
              className="inline-flex gap-2 justify-center items-center py-2 px-2 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              <img
                height="30"
                width="30"
                src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                alt=""
              />
              <span className="flex gap-1 items-center">Connect</span>
            </button>
          )}
        </div>

        <div className="status flex gap-1 flex-row items-center absolute top-20 border-gray-200 p-3 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 rounded-xl sm:mt-5 mt-1 left-0">
          <p className="tracking-tighter text-sm text-cyan-500 md:text-sm dark:text-cyan-400 ">
            Voting Status :
          </p>
          {VotingDate.StartDate != 0 ? (
            <p className="tracking-tighter flex gap-2 text-sm text-gray-500 md:text-sm dark:text-gray-400">
              <b className="text-cyan-300">{VoteDate.StartDate}</b>
              To
              <b className="text-cyan-300">{VoteDate.EndDate}</b>
            </p>
          ) : (
            <p className="text-gray-400 text-sm">{"  "}Closed</p>
          )}
        </div>

        <div className="winner flex gap-1 flex-row absolute top-20 border-gray-200 p-3 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 rounded-xl sm:mt-5 mt-1 right-0">
          <p className="tracking-tighter text-sm text-cyan-500 md:text-sm dark:text-cyan-400 ">
            Winner is
          </p>
          <p className="tracking-tighter text-sm text-gray-500 md:text-sm dark:text-gray-400">
            : {Winner}
          </p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
