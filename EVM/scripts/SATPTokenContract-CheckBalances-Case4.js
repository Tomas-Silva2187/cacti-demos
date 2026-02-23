const { ethers } = require("ethers");
const { config } = require("hardhat");

// Replace with your values
const SATP_TOKEN_BYTECODE = require("../artifacts/contracts/SATPTokenContract.sol/SATPTokenContract.json")["bytecode"];
const SATP_TOKEN_ABI = require("../artifacts/contracts/SATPTokenContract.sol/SATPTokenContract.json")["abi"];

async function main(port) {
  const provider = new ethers.JsonRpcProvider(`http://0.0.0.0:${port}`);
  
  let BRIDGE_ADDRESS, TOKEN_ADDRESS, user, deployer, userAddress;
  if (port === 8545) {
    //Addresses for Besu
    BRIDGE_ADDRESS = "0x42699A7612A82f1d9C36148af9C77354759b210b";
    TOKEN_ADDRESS = "0xa50a51c09a5c451C52BB714527E1974b686D8e77";
    deployer = new ethers.Wallet("0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63", provider);
    user = new ethers.Wallet("0xae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f", provider);
    userAddress = "0xf17f52151EbEF6C7334FAD080c5704D77216b732";
  } else {
    //Addresses for Ethereum
    BRIDGE_ADDRESS = "0x8464135c8f25da09e49bc8782676a84730c318bc";
    TOKEN_ADDRESS = "0xfbfbfDdd6e35dA57b7B0F9a2C10E34Be70B3A4E9";
    const accounts = await provider.listAccounts();
    deployer = await provider.getSigner(accounts[10].address);
    user = await provider.getSigner(accounts[11].address);
    userAddress = accounts[11].address;
  }

  // load the SATPTokenContract already deployed in the previous step
  console.log(`${port} - Loading SATPTokenContract...`);
  const satpTokenContract = new ethers.Contract(
    TOKEN_ADDRESS,
    SATP_TOKEN_ABI,
    deployer
  );
  console.log(`${port} - SATPTokenContract address:`, satpTokenContract.target);
  
  // Check balance of user
  console.log(`${port} - Checking balance of user...`);
  const userBalance = await satpTokenContract.balanceOf(userAddress);
  console.log(`${port} - User Balance:`, userBalance.toString());

  // Check balance of bridge address
  console.log(`${port} - Checking balance of bridge address...`);
  const bridgeBalance = await satpTokenContract.balanceOf(BRIDGE_ADDRESS);
  console.log(`${port} - Bridge Contract Balance:`, bridgeBalance.toString());
}

main(8545).catch(console.error);
main(8547).catch(console.error);
