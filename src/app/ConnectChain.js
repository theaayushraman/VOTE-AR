import Web3 from "web3";
import Abi from "../abi/VotingAbi.json";

const ContractAddress = "0x49663961f73C3C35d70975023D3d134BC8930E9F";

//this variable are go through metamask (sepolia)connect a testnet for only writing state
export const web3 = new Web3(window.ethereum);
export const ContractInstance = new web3.eth.Contract(Abi, ContractAddress);

//this variable are direct connect a testnet for only reading state
export const web3TestNet = new Web3("https://rpc.sepolia.org");
export const ContractInstanceTestNet = new web3TestNet.eth.Contract(
  Abi,
  ContractAddress
);
