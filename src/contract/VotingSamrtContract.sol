// SPDX-License-Identifier: MIT
pragma solidity <0.9.9;

contract Voting {
    //━━━━━━━━━━━━━initialization━━━━━━━━━━━━━━━━━━//

    struct Candidate {
        uint256 id;
        string name;
        string party;
        string gender;
        uint256 age;
        address Address;
        uint256 votes;
    }
    struct Voter {
        uint256 id;
        string name;
        string gender;
        uint256 age;
        uint256 voteCandidateId;
        address Address;
    }

    struct DateTime {
        uint256 StartDate;
        uint256 EndDate;
    }

    DateTime public datetimes;

    mapping(uint256 => Candidate) public candidateDetails;
    mapping(uint256 => Voter) public VoterDetails;

    uint256 candidateId = 1;
    uint256 VoterId = 1;
    string public winnerName = "Not Declare";

    address public ElectionOwer;

    constructor() {
        ElectionOwer = msg.sender;
    }

    //━━━━━━━━━━━━━functions━━━━━━━━━━━━━━━━━━//

    function CandidateRegister(
        string calldata _name,
        string calldata _party,
        string calldata _gender,
        uint256 _age
    ) public {
        require(
            CandidateVerification(msg.sender),
            "Candidate account is already exist !!"
        );

        candidateDetails[candidateId] = Candidate(
            candidateId,
            _name,
            _party,
            _gender,
            _age,
            msg.sender,
            0
        );
        candidateId += 1;
    }

    function CandidateVerification(address _sender)
        private
        view
        returns (bool)
    {
        for (uint256 i = 0; i < candidateId; i++) {
            if (candidateDetails[i].Address == _sender) {
                return false;
            }
        }
        return true;
    }

    function CandidateList() public view returns (Candidate[] memory) {
        Candidate[] memory array = new Candidate[](candidateId - 1);
        for (uint256 i = 1; i < candidateId; i++) {
            array[i - 1] = candidateDetails[i];
        }
        return array;
    }

    function VoterRegister(
        string calldata _name,
        string calldata _gender,
        uint256 _age
    ) public {
        require(
            VoterVerification(msg.sender),
            "Voter account is already register"
        );
        require(_age >= 18, "Voter person age is smaller");
        VoterDetails[VoterId] = Voter(
            VoterId,
            _name,
            _gender,
            _age,
            0,
            msg.sender
        );
        VoterId += 1;
    }

    function VoterVerification(address _sender) private view returns (bool) {
        for (uint256 i = 1; i < VoterId; i++) {
            if (VoterDetails[i].Address == _sender) {
                return false;
            }
        }
        return true;
    }

    function VoterList() public view returns (Voter[] memory) {
        Voter[] memory array = new Voter[](VoterId - 1);
        for (uint256 i = 1; i < VoterId; i++) {
            array[i - 1] = VoterDetails[i];
        }
        return array;
    }

    function vote(uint256 _candidateId) public {
        uint256 _voterId;

        for (uint256 i = 1; i < VoterId; i++) {
            if (VoterDetails[i].Address == msg.sender) {
                _voterId = VoterDetails[i].id;
                break;
            }
        }
        VoterDetails[_voterId].voteCandidateId = _candidateId;
        candidateDetails[_candidateId].votes += 1;
    }

    function WinnerCheck() public returns (string memory) {
        uint256 maxVotes = 0;

        for (uint256 i = 1; i <= candidateId; i++) {
            if (candidateDetails[i].votes > maxVotes) {
                maxVotes = candidateDetails[i].votes;
                winnerName = candidateDetails[i].name;
            }
        }
        return winnerName;
    }

    function ClearVotingData() public {
        require(msg.sender == ElectionOwer, "Wrong call");

        for (uint256 i = 0; i < candidateId; i++) {
            delete candidateDetails[i];
        }
        for (uint256 i = 0; i < VoterId; i++) {
            delete VoterDetails[i];
        }

        delete datetimes;

        candidateId = 1;
        VoterId = 1;
        winnerName = "Not Declare";
    }

    function setElectionTime(uint256 _StartTime, uint256 _EndTime) public {
        datetimes.StartDate = _StartTime;
        datetimes.EndDate = _EndTime;
    }
}
