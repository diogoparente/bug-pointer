// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test} from "../../lib/forge-std/src/Test.sol";
import {HackerPass} from "../HackerPass.sol";
import {InteractsWithWorldID} from "./helpers/InteractsWithWorldID.sol";

contract HackerPassTest is Test, InteractsWithWorldID {
    HackerPass internal hackerPass;

    function setUp() public {
        setUpWorldID();

        hackerPass = new HackerPass(worldID, "bugpointer", "hackerpass");

        vm.label(address(this), "Sender");
        vm.label(address(hackerPass), "Hacker Pass");
    }

    function testCanMint() public {
        registerIdentity(); // this simulates a World ID "verified" identity

        (uint256 nullifierHash, uint256[8] memory proof) = getProof(
            address(this),
            "bugpointer",
            "hackerpass"
        );
        hackerPass.verifyAndMint(
            address(this),
            getRoot(),
            nullifierHash,
            proof
        );

        // check if the Hacker Pass was minted.
        assertEq(hackerPass.balanceOf(address(this)), 1);
    }

    function testCannotDoubleMint() public {
        registerIdentity();

        (uint256 nullifierHash, uint256[8] memory proof) = getProof(
            address(this),
            "bugpointer",
            "hackerpass"
        );

        hackerPass.verifyAndMint(
            address(this),
            getRoot(),
            nullifierHash,
            proof
        );

        uint256 root = getRoot();
        vm.expectRevert(HackerPass.InvalidNullifier.selector);
        hackerPass.verifyAndMint(
            address(this),
            root,
            nullifierHash,
            proof
        );

        // check that only one NFT was minted.
        assertEq(hackerPass.balanceOf(address(this)), 1);
    }

    function testCannotMintIfNotMember() public {
        registerInvalidIdentity();

        uint256 root = getRoot();
        (uint256 nullifierHash, uint256[8] memory proof) = getProof(
            address(this),
            "bugpointer",
            "hackerpass"
        );

        vm.expectRevert(abi.encodeWithSignature("InvalidProof()"));
        hackerPass.verifyAndMint(
            address(this),
            root,
            nullifierHash,
            proof
        );

        // check that no NFT was minted.
        assertEq(hackerPass.balanceOf(address(this)), 0);
    }

    function testCannotCallWithInvalidSignal() public {
        registerIdentity();

        (uint256 nullifierHash, uint256[8] memory proof) = getProof(
            address(this),
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
        assertEq(hackerPass.balanceOf(address(this)), 0);
    }


    function testCannotCallWithInvalidProof() public {
        registerIdentity();

        (uint256 nullifierHash, uint256[8] memory proof) = getProof(
            address(this),
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
        assertEq(hackerPass.balanceOf(address(this)), 0);
    }

    function test_updateHackerXp() public {
        
    }

    function test_updateHackerLevel() public {

    }
}