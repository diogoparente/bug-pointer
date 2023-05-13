// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test} from "../../lib/forge-std/src/Test.sol";
import {HackerPass} from "../HackerPass.sol";
import {InteractsWithWorldID} from "./helpers/InteractsWithWorldID.sol";
import {ContestFactory} from "../ContestFactory.sol";
import {Contest} from "../Contest.sol";
import {IERC20} from "../../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

contract HackerPassTest is Test, InteractsWithWorldID {
    HackerPass internal hackerPass;
    ContestFactory internal factory;
    Contest internal contest;

    address user1 = address(1000);
    address user2 = address(2000);
    address sponsor = address(3000);
    address USDC_ADDR = 0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747;

    uint256 USDC_AMOUNT = 250 * 10 ** 6;

    function setUp() public {
        setUpWorldID();

        hackerPass = new HackerPass(worldID, "bugpointer", "hackerpass");
        factory = new ContestFactory(address(hackerPass));

        vm.label(address(this), "Sender");
        vm.label(address(hackerPass), "Hacker Pass");
        vm.label(user1, "user1");
        vm.label(user2, "user2");
        vm.label(sponsor, "sponsor");
    }

    function testCanMint() public {
        registerIdentity(); // this simulates a World ID "verified" identity

        (uint256 nullifierHash, uint256[8] memory proof) = getProof(
            user1,
            "bugpointer",
            "hackerpass"
        );
        hackerPass.verifyAndMint(
            user1,
            getRoot(),
            nullifierHash,
            proof
        );

        // check if the Hacker Pass was minted.
        assertEq(hackerPass.balanceOf(user1), 1);
    }

    function testCannotDoubleMint() public {
        registerIdentity();

        (uint256 nullifierHash, uint256[8] memory proof) = getProof(
            user1,
            "bugpointer",
            "hackerpass"
        );

        hackerPass.verifyAndMint(
            user1,
            getRoot(),
            nullifierHash,
            proof
        );

        uint256 root = getRoot();
        vm.expectRevert(HackerPass.InvalidNullifier.selector);
        hackerPass.verifyAndMint(
            user1,
            root,
            nullifierHash,
            proof
        );

        // check that only one NFT was minted.
        assertEq(hackerPass.balanceOf(user1), 1);
    }

    function testCannotMintIfNotMember() public {
        registerInvalidIdentity();

        uint256 root = getRoot();
        (uint256 nullifierHash, uint256[8] memory proof) = getProof(
            user1,
            "bugpointer",
            "hackerpass"
        );

        vm.expectRevert(abi.encodeWithSignature("InvalidProof()"));
        hackerPass.verifyAndMint(
            user1,
            root,
            nullifierHash,
            proof
        );

        // check that no NFT was minted.
        assertEq(hackerPass.balanceOf(user1), 0);
    }

    function testCannotCallWithInvalidSignal() public {
        registerIdentity();

        (uint256 nullifierHash, uint256[8] memory proof) = getProof(
            user1,
            "bugpointer",
            "hackerpass"
        );

        uint256 root = getRoot();
        vm.expectRevert(abi.encodeWithSignature("InvalidProof()"));
        hackerPass.verifyAndMint(
            address(0x01),
            root,
            nullifierHash,
            proof
        );

        // check that no NFT was minted.
        assertEq(hackerPass.balanceOf(user1), 0);
    }


    function testCannotCallWithInvalidProof() public {
        registerIdentity();

        (uint256 nullifierHash, uint256[8] memory proof) = getProof(
            user1,
            "bugpointer",
            "hackerpass"
        );

        // this changes the proof, invalidating it
        proof[0] ^= 42;

        uint256 root = getRoot();
        vm.expectRevert(abi.encodeWithSignature("InvalidProof()"));
        hackerPass.verifyAndMint(
            address(0x01),
            root,
            nullifierHash,
            proof
        );

        // extra checks here
        assertEq(hackerPass.balanceOf(user1), 0);
    }

    function testCannotTransferHackerPass() public {
        registerIdentity(); // this simulates a World ID "verified" identity

        (uint256 nullifierHash, uint256[8] memory proof) = getProof(
            user1,
            "bugpointer",
            "hackerpass"
        );
        hackerPass.verifyAndMint(
            user1,
            getRoot(),
            nullifierHash,
            proof
        );

        // check if the Hacker Pass was minted.
        assertEq(hackerPass.balanceOf(user1), 1);

        vm.startPrank(address(this));
        vm.expectRevert();
        hackerPass.transferFrom(user1, user2, 1);
        vm.stopPrank();
    }

    function testUpdateHackerXp() public {
        registerIdentity(); // this simulates a World ID "verified" identity

        (uint256 nullifierHash, uint256[8] memory proof) = getProof(
            user1,
            "bugpointer",
            "hackerpass"
        );
        hackerPass.verifyAndMint(
            user1,
            getRoot(),
            nullifierHash,
            proof
        );

        assertEq(hackerPass.balanceOf(user1), 1);

        vm.startPrank(address(contest)); // TODO: THIS TEST FAILS
        hackerPass.updateHackerXp(user1, address(factory), 4000);
        vm.stopPrank();

        assertEq(hackerPass.xpOfHacker(user1), 4000);
        assertEq(hackerPass.levelOfHacker(user1), 3);

        uint256 tokenId = hackerPass.tokenIdOfHacker(user1);
        assertEq(hackerPass.tokenURI(tokenId), "ipfs://QmabkMt2mKsnWwTgJCQtEbkjTobENpQZFEwvTQhwQ78hKk/HackerPass3.json");
    }
}
