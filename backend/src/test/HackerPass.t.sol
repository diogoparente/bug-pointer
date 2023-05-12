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
}