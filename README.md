# bug-pointer

## Intro

Introducing Bug Pointer, the bug bounty platform with a proof of personhood mechanism, making it Sybil attack resistant. This ensures fair reward distribution, solving a common issue in bug bounty platforms. Say goodbye to injustice and welcome a platform that rewards hackers justly.

## Instructions

### Frontend

Assuming you have npm installed on your machine:

- 1: `cd ../frontend`
- 2: `npm i`
- 3: `npm run dev` 🚀

### Backend (Smart Contracts)

1. End users will need a verified identity, which can be obtained through our [Simulator](https://simulator.worldcoin.org) ([see docs for more info](https://id.worldcoin.org/test)). In production, this would be obtained by verifying with an orb.

2. Use the [JS widget](https://id.worldcoin.org/docs/js) to prompt the user with verification (make sure you're providing the correct [signal](#setting-your-signal) and [action ID](#setting-your-action-id)). Upon acceptance, you'll get a `merkle_root`, `nullifier_hash` and `proof`.

3. The ZKP (attribute `proof`) is a `uint256[8]` array and your smart contract expects it that way. For easier handling, the JS widget will return the proof encoded. Unpack your proof before sending it to your smart contract.

```js
import { defaultAbiCoder as abi } from "@ethers/utils";
const unpackedProof = abi.decode(["uint256[8]"], proof)[0];
// You can now pass your unpackedProof to your smart contract
```

4. Use the obtained parameters, along with any inputs your contract needs (which [should be included in the signal](#setting-your-signal)), to call your smart contract!

## 🚀 Deployment

1. If you've added any parameters to your constructor or renamed the contract, you should update the `scripts/deploy.js` script accordingly.
2. Run `cp .env.example .env` to create your environment file, and add a `RPC_URL` for the network you want to deploy (we currently **only support the Polygon Mumbai Testnet**) and a `PRIVATE_KEY` for the deployer wallet.
3. Run `make deploy` to deploy your contract.

## 🧑‍💻 Development & testing

1. Install [Foundry](https://github.com/gakonst/foundry).
   ```
   curl -L https://foundry.paradigm.xyz | bash
   foundryup # run on a new terminal window; installs latest version
   ```
2. Install [Node.js](https://nodejs.org/en/) v16 or above (required for tests). We recommend [nvm](https://github.com/nvm-sh/nvm) if you use multiple node versions.
3. Install dependencies & build smart contracts
   ```
   make
   ```

> **Warning** Make sure you've run `make` instead of using Foundry directly! We need to build some of WorldID's dependencies in a specific way, and tests will fail otherwise.

### Running test suite

This repository includes automated tests, which you can use to make sure your contract is working as expected before deploying it. Of course, any modifications you've made to the `Contract.sol` file will need to be reflected on the tests as well to make them work.

If you've changed the type of the external nullifier, or the signal, you should look over the `src/test/helpers/InteractsWithWorldID.sol` and `src/test/scripts/generate-proof.js` to update them as well.

Once you've done this, you can run the tests,

```
make test
```

<!-- WORLD-ID-SHARED-README-TAG:START - Do not remove or modify this section directly -->
<!-- The contents of this file are inserted to all World ID repositories to provide general context on World ID. -->

## <img align="left" width="28" height="28" src="https://raw.githubusercontent.com/worldcoin/world-id-docs/main/public/images/shared-readme/readme-world-id.png" alt="" style="margin-right: 0; padding-right: 4px;" /> About World ID

World ID is the privacy-first identity protocol that brings global proof of personhood to the internet. More on World ID in the [announcement blog post](https://worldcoin.org/blog/announcements/introducing-world-id-and-sdk).

World ID lets you seamlessly integrate authentication into your app that verifies accounts belong to real persons through [Sign in with Worldcoin](https://docs.worldcoin.org/id/sign-in). For additional flexibility and cases where you need extreme privacy, [Anonymous Actions](https://docs.worldcoin.org/id/anonymous-actions) lets you verify users in a way that cannot be tracked across verifications.

Follow the [Quick Start](https://docs.worldcoin.org/quick-start) guide for the easiest way to get started.

## 📄 Documentation

All the technical docs for the Wordcoin SDK, World ID Protocol, examples, guides can be found at https://docs.worldcoin.org/

<a href="https://docs.worldcoin.org">
  <p align="center">
    <picture align="center">
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/worldcoin/world-id-docs/main/public/images/shared-readme/visit-documentation-dark.png" height="50px" />
      <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/worldcoin/world-id-docs/main/public/images/shared-readme/visit-documentation-light.png" height="50px" />
      <img />
    </picture>
  </p>
</a>

<!-- WORLD-ID-SHARED-README-TAG:END -->
