// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import {IERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {IERC721} from "../lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol";
import {VRFV2WrapperConsumerBase} from "../lib/chainlink-contracts/VRFV2WrapperConsumerBase.sol";
import {ContestFactory} from "./ContestFactory.sol";
import {HackerPass} from "./HackerPass.sol";

contract Contest is VRFV2WrapperConsumerBase {
    enum Stages {
        AcceptingJudges, // 0
        ChoosingJudges, // 1
        OngoingContest, // 2
        WaitingJudgeSubmission, // 3
        Finished // 4
    }

    Stages public stage = Stages.AcceptingJudges;   

    uint256 public acceptingJudgesDuration;
    uint256 public ongoingContestDuration;
    uint256 public waitingJudgeSubmissionDuration;

    address public constant USDC_ADDR =
        0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747;
    address public constant LINK_ADDR =
        0x326C977E6efc84E512bB9C30f76E30c160eD06FB;

    address public immutable hackerPass;
    address public sponsor;
    address public contestFactory;

    address[] public judgeCandidates;
    mapping(address => bool) public isCandidate;
    address public judge;

    uint32 constant callbackGasLimit = 100000;
    uint16 constant requestConfirmations = 3;
    uint32 constant numWords = 1;
    address constant wrapperAddress =
        0x99aFAf084eBA697E584501b8Ed2c0B37Dd136693;

    mapping(address => uint256) private tokenRewardsHacker;
    bool public areRewardsClaimable;

    constructor(
        address _sponsor,
        address _hackerPass,
        uint256 _ongoingContestDuration,
        uint256 _waitingJudgeSubmissionDuration
    ) VRFV2WrapperConsumerBase(LINK_ADDR, wrapperAddress) {
        hackerPass = _hackerPass;
        sponsor = _sponsor;
        contestFactory = msg.sender;
        acceptingJudgesDuration = block.timestamp + 1 days;
        ongoingContestDuration = block.timestamp + _ongoingContestDuration;
        waitingJudgeSubmissionDuration =
            block.timestamp +
            _waitingJudgeSubmissionDuration;
    }

    modifier onlySponsor() {
        require(msg.sender == sponsor, "caller is not sponsor");
        _;
    }

    modifier atStage(Stages _stage) {
        require(stage == _stage, "Function invalid at this stage.");
        _;
    }

    modifier timedTransitions() {
        if (
            stage == Stages.AcceptingJudges &&
            block.timestamp >= acceptingJudgesDuration
        ) {
            Stages nextStage = Stages.ChoosingJudges;

            if (judgeCandidates.length == 0) {
                _repaySponsor();
                nextStage = Stages.Finished;
            }

            _nextStage(nextStage);
        }
        if (
            stage == Stages.OngoingContest &&
            block.timestamp >= ongoingContestDuration
        ) {
            Stages nextStage = Stages.WaitingJudgeSubmission;
            if (block.timestamp >= waitingJudgeSubmissionDuration) {
                _repaySponsor();
                nextStage = Stages.Finished;
            }
            _nextStage(nextStage);
        }
        _;
        if (stage == Stages.ChoosingJudges && judge != address(0)) {
            _nextStage(Stages.OngoingContest);
        }
        if (
            stage == Stages.WaitingJudgeSubmission &&
            block.timestamp >= waitingJudgeSubmissionDuration
        ) {
            // TODO: If rewards were calculated and are now claimable, then _nextStage()
            // if submissions by the judges we're not done then _repaySponsor.
            _nextStage(Stages.Finished);
        }
    }

    function _nextStage(Stages _stage) private {
        stage = _stage;
    }

    function requestRandomNumber()
        external
        onlySponsor
        timedTransitions
        atStage(Stages.ChoosingJudges)
    {
        requestRandomness(callbackGasLimit, requestConfirmations, numWords);
    }

    function fulfillRandomWords(
        uint256 /* _requestId */,
        uint256[] memory _randomWords
    ) internal override timedTransitions atStage(Stages.ChoosingJudges) {
        uint256 index = _randomWords[0] % judgeCandidates.length;
        judge = judgeCandidates[index];
    }

    function _repaySponsor() private {
        bool success = IERC20(USDC_ADDR).transferFrom(
            address(this),
            sponsor,
            IERC20(USDC_ADDR).balanceOf(address(this))
        );
        require(success, "Repay sponsor failed.");

        stage = Stages.Finished;
    }

    function getCurrentStage() external view returns (uint256) {
        return uint256(stage);
    }

    function applyToBeJudge()
        external
        timedTransitions
        atStage(Stages.AcceptingJudges)
    {
        require(!isCandidate[msg.sender], "already applied");
        require(
            IERC721(hackerPass).balanceOf(msg.sender) == 1,
            "Does not own an HackerPassNFT."
        );

        judgeCandidates.push(msg.sender);
        isCandidate[msg.sender] = true;
    }

    function submitResults(
        address[] calldata _hackers,
        uint256[] calldata _rewards
    ) external timedTransitions atStage(Stages.WaitingJudgeSubmission) {
        require(
            _hackers.length == _rewards.length,
            "hackers and rewards mismatch"
        );

        for (uint256 i = 0; i < _hackers.length; i++) {
            require(
                IERC721(hackerPass).balanceOf(_hackers[i]) == 1,
                "Does not own an HackerPassNFT."
            );
            tokenRewardsHacker[_hackers[i]] = _rewards[i] * 10 ** 6;
        }

        areRewardsClaimable = true;

        ContestFactory(contestFactory).inactivateSponsor(sponsor);
    }

    function claimRewards() external timedTransitions atStage(Stages.Finished) {
        require(
            IERC721(hackerPass).balanceOf(msg.sender) == 1,
            "Does not own an HackerPassNFT."
        );

        uint256 reward = tokenRewardsHacker[msg.sender];
        require(reward != 0, "No amount to be paid.");

        tokenRewardsHacker[msg.sender] = 0;

        bool success = IERC20(USDC_ADDR).transfer(msg.sender, reward);
        require(success, "Transfer failed");

        HackerPass(hackerPass).updateHackerXp(msg.sender, contestFactory, reward);
    }
}
