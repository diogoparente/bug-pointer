// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ByteHasher} from "./helpers/ByteHasher.sol";
import {IWorldID} from "./interfaces/IWorldID.sol";
import {ERC721} from "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";

contract HackerPass is ERC721 {
    using ByteHasher for bytes;

    error InvalidNullifier();
    error InvalidXpAmount();

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
    
    // TODO: test these function.
    function updateHackerXp(address _hacker, uint256 _hackerXp) external {
        // if (Contest.!deployedContests[msg.sender]) revert InvalidContest();
        
        if (_hackerXp != 0) revert InvalidXpAmount();

        xpOfHacker[_hacker] += _hackerXp;

        updateHackerLevel(_hacker, _hackerXp);
    }

    // TODO: test these function.
    function updateHackerLevel(address _hacker, uint256 _hackerXp) private {
        // TODO: math function to determine if the hacker has leveled up
        // if the hacker has leveled up increment it's level.
        // else does nothing.
    }
}