// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import {IERC721} from "../lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol";
import {IERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {Contest} from "./Contest.sol";
import {LinkTokenInterface} from "../lib/chainlink-contracts/LinkTokenInterface.sol";

contract ContestFactory {
    mapping(address => bool) public deployedContests;
    mapping(address => bool) public activeSponsors;

    address public immutable hackerPassNFT;
    address public owner;

    uint256 public constant MAX_DURATION = 30 days;
    uint256 public constant MIN_TOTAL_BOUNTY = 250 * 10 ** 6;

    address public constant LINK_ADDR =
        0x326C977E6efc84E512bB9C30f76E30c160eD06FB;
    address public constant USDC_ADDR =
        0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner.");
        _;
    }

    constructor(address _hackerPassNFT) {
        hackerPassNFT = _hackerPassNFT;
        owner = msg.sender;
    }

    function setOwner(address _newOwner) external onlyOwner {
        owner = _newOwner;
    }

    function createContest(
        uint256 _amount,
        uint256 _ongoingContestDuration,
        uint256 _waitingJudgeSubmissionDuration
    ) external returns (address) {
        require(_amount >= MIN_TOTAL_BOUNTY, "Bounty too small");
        require(
            IERC721(hackerPassNFT).balanceOf(msg.sender) == 1,
            "Does not own an HackerPassNFT."
        );
        require(
            activeSponsors[msg.sender] == false,
            "Sponsor can't have 2 contests at the same time."
        );
        require(
                1 days +
                _ongoingContestDuration +
                _waitingJudgeSubmissionDuration <
                MAX_DURATION,
            "contest duration should be less than 30 days"
        );

        LinkTokenInterface link = LinkTokenInterface(LINK_ADDR);
        address contest = address(
            new Contest(
                msg.sender,
                hackerPassNFT,
                _ongoingContestDuration,
                _waitingJudgeSubmissionDuration
            )
        );

        bool success = IERC20(USDC_ADDR).transferFrom(
            msg.sender,
            contest,
            _amount
        );
        require(success, "Unable to transfer usdc tokens");
        require(
            link.transfer(contest, 5 * 10 ** 18),
            "Unable to transfer link tokens"
        );

        deployedContests[contest] = true;
        activeSponsors[msg.sender] = true;

        return contest;
    }

    function inactivateSponsor(address _sponsor) public {
        require(deployedContests[msg.sender], "invalid contest");
        require(activeSponsors[_sponsor], "sponsor already inactive");

        activeSponsors[_sponsor] = false;
    }
}
