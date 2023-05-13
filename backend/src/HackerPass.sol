// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ByteHasher} from "./helpers/ByteHasher.sol";
import {IWorldID} from "./interfaces/IWorldID.sol";
import {ERC721} from "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import {Counters} from "../lib/openzeppelin-contracts/contracts/utils/Counters.sol";
import {ERC721URIStorage} from "../lib/openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract HackerPass is ERC721, ERC721URIStorage {
    using ByteHasher for bytes;
    using Counters for Counters.Counter;

    error InvalidNullifier();
    error InvalidXpAmount();
    error CannotTransferHackerPass();
    error MaxLevelReached();
    error DoesNotHaveHackerPass();

    // Worldcoin related.
    IWorldID internal immutable worldId;
    uint256 internal immutable externalNullifier;
    uint256 internal immutable groupId = 1;
    mapping(uint256 => bool) internal nullifierHashes;

    // Constants
    uint256 private constant MAX_LEVEL = 10;
    uint256 private constant MUL_FACTOR = 250;

    // Collection related.
    Counters.Counter private _tokenIdCounter;
    mapping(address => uint256) public xpOfHacker;
    mapping(address => uint256) public levelOfHacker;
    mapping(address => uint256) public tokenIdOfHacker;
    string[] IpfsUri = [
        "ipfs://QmabkMt2mKsnWwTgJCQtEbkjTobENpQZFEwvTQhwQ78hKk/HackerPass0.json",    
        "ipfs://QmabkMt2mKsnWwTgJCQtEbkjTobENpQZFEwvTQhwQ78hKk/HackerPass1.json",
        "ipfs://QmabkMt2mKsnWwTgJCQtEbkjTobENpQZFEwvTQhwQ78hKk/HackerPass2.json",
        "ipfs://QmabkMt2mKsnWwTgJCQtEbkjTobENpQZFEwvTQhwQ78hKk/HackerPass3.json",
        "ipfs://QmabkMt2mKsnWwTgJCQtEbkjTobENpQZFEwvTQhwQ78hKk/HackerPass4.json",
        "ipfs://QmabkMt2mKsnWwTgJCQtEbkjTobENpQZFEwvTQhwQ78hKk/HackerPass5.json",
        "ipfs://QmabkMt2mKsnWwTgJCQtEbkjTobENpQZFEwvTQhwQ78hKk/HackerPass6.json",
        "ipfs://QmabkMt2mKsnWwTgJCQtEbkjTobENpQZFEwvTQhwQ78hKk/HackerPass7.json",
        "ipfs://QmabkMt2mKsnWwTgJCQtEbkjTobENpQZFEwvTQhwQ78hKk/HackerPass8.json",
        "ipfs://QmabkMt2mKsnWwTgJCQtEbkjTobENpQZFEwvTQhwQ78hKk/HackerPass9.json",
        "ipfs://QmabkMt2mKsnWwTgJCQtEbkjTobENpQZFEwvTQhwQ78hKk/HackerPass10.json"
    ];

    constructor(
        IWorldID _worldId,
        string memory _appId,
        string memory _actionId
    ) ERC721("Hacker Pass", "HP") {
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

        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        tokenIdOfHacker[signal] = tokenId;
        _safeMint(signal, tokenId);
        _setTokenURI(tokenId, IpfsUri[0]);
    }
    
    function updateHackerXp(address _hacker, uint256 _earnedXp) public {
        // TODO: if (Contest.!deployedContests[msg.sender]) revert InvalidContest();
        
        if (_earnedXp == 0) revert InvalidXpAmount();

        xpOfHacker[_hacker] += _earnedXp;

        updateHackerLevel(_hacker);
    }

    function updateHackerLevel(address _hacker) private {
        uint256 requiredXp;
        uint256 hackerLevel = levelOfHacker[_hacker];
        uint256 currentXp = xpOfHacker[_hacker];
        uint256 newLevel = hackerLevel;

        for (uint i = 1; i <= hackerLevel; i++) {
            requiredXp += calculateLevelXp(i);
        }

        for (uint i = newLevel + 1; i <= MAX_LEVEL; i++) {
            uint256 xpForNextLevel = calculateLevelXp(i);
            if (currentXp < xpForNextLevel) {
                break;
            }
            newLevel = i;
            currentXp -= xpForNextLevel;
        }

        uint256 tokenId = tokenIdOfHacker[_hacker];
        if(tokenId == 0) revert DoesNotHaveHackerPass(); // FALHA ESTE CHECK

        levelOfHacker[_hacker] = newLevel;
        string memory newUri = IpfsUri[newLevel];

        _setTokenURI(tokenId, newUri);
    }

    function calculateLevelXp(uint256 _level) private pure returns (uint256) {
        return 1000 + (_level - 1) * MUL_FACTOR;
    } 

    function _beforeTokenTransfer(
        address from, 
        address to, 
        uint256 tokenId
    ) internal virtual {
        if (from != address(0)) revert CannotTransferHackerPass();
        super._beforeTokenTransfer(from, to, tokenId, 1);  
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }   
}