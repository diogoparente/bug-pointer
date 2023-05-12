// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ByteHasher} from "./helpers/ByteHasher.sol";
import {IWorldID} from "./interfaces/IWorldID.sol";
import {ERC721} from "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";

contract HackerPass is ERC721 {
    using ByteHasher for bytes;

    error InvalidNullifier();

    // Worldcoin related.
    IWorldID internal immutable worldId;
    uint256 internal immutable externalNullifier;
    uint256 internal immutable groupId = 1;
    mapping(uint256 => bool) internal nullifierHashes;

    // Collection related.
    uint256 public supply;
    mapping(address => uint256) public xpOfHacker;
    mapping(address => uint8) public levelOfHacker;

    constructor(
        IWorldID _worldId,
        string memory _appId,
        string memory _actionId
    ) ERC721("Hacker Pass", "HP") 
    {
        worldId = _worldId;
        externalNullifier = abi
            .encodePacked(abi.encodePacked(_appId).hashToField(), _actionId)
            .hashToField();
    }

    // this function works as verification and mint function 
    function verifyAndMint(address signal, 
        uint256 root, 
        uint256 nullifierHash, 
        uint256[8] calldata proof
    ) public {
        if (nullifierHashes[nullifierHash]) revert InvalidNullifier();

        worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(signal).hashToField(),
            nullifierHash,
            externalNullifier,
            proof
        );

        nullifierHashes[nullifierHash] = true;

        supply += 1;

        _mint(signal, supply);
    }
    
    // TODO: Update the level of the hacker based on the XP.
    // this function can only be called by an active contest.
}