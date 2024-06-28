import { web3, ContractInstance } from "./ConnectChain";


export async function AccountVerification(address) {
  const listOfVoter = await ContractInstance.methods.VoterList().call();
  const listOfCandidate = await ContractInstance.methods.CandidateList().call();
  return (
    listOfCandidate.some((item) =>
      item.Address.toUpperCase().includes(address.toUpperCase())
    ) ||
    listOfVoter.some((item) =>
      item.Address.toUpperCase().includes(address.toUpperCase())
    )
  );
}

export const DuplicateVoteVerification = async (address) => {
  const listOfVoter = await ContractInstance.methods.VoterList().call();
  const SingleArray = listOfVoter.filter(
    (item) => item.Address.toUpperCase() == address.toUpperCase()
  );
  return parseInt(SingleArray[0].voteCandidateId) != 0;
};

export async function voterVerification(address) {
  const listOfVoter = await ContractInstance.methods.VoterList().call();
  return listOfVoter.some((item) =>
    item.Address.toUpperCase().includes(address.toUpperCase())
  );
}

export const ElectionOwnerVerification = async (address) => {
  const OwnerAddress = await ContractInstance.methods.ElectionOwer().call();
  return OwnerAddress.toUpperCase() === address.toUpperCase();
};
