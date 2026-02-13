const { ethers } = require("ethers");

// Replace with your values
const SATP_TOKEN_BYTECODE = require("../artifacts/contracts/SATPTokenContract.sol/SATPTokenContract.json")["bytecode"];
const SATP_TOKEN_ABI = require("../artifacts/contracts/SATPTokenContract.sol/SATPTokenContract.json")["abi"];

async function main(port) {
  const provider = new ethers.JsonRpcProvider(`http://172.17.0.1:${port}`);

  let deployerAddress, userAddress, deployer, user;
  // Since we deploy the contracts always in the same order, we can use a constant address for the bridge.
  const BRIDGE_ADDRESS =  port === 8545 ? "0x42699A7612A82f1d9C36148af9C77354759b210b" : "0x5fbdb2315678afecb367f032d93f642f64180aa3";

  if (port === 8545) {
    deployerAddress = "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73";
    userAddress = "0xf17f52151EbEF6C7334FAD080c5704D77216b732";
    deployer = new ethers.Wallet("0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63", provider);
    user = new ethers.Wallet("0xae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f", provider);
  } else {
    const accounts = await provider.listAccounts();
    deployerAddress = accounts[10].address;
    userAddress = accounts[11].address;
    deployer = await provider.getSigner(accounts[10].address);
    user = await provider.getSigner(accounts[11].address);
  }
  
  console.log(`${port} - User Address:`, userAddress);
  console.log(`${port} - Deployer Address:`, deployerAddress);
  // Deploy the SATPTokenContract
  console.log(`${port} - Deploying SATPTokenContract...`);
  const SATPTokenContractFactory = new ethers.ContractFactory(SATP_TOKEN_ABI, SATP_TOKEN_BYTECODE, deployer);
  const satpTokenContract = await SATPTokenContractFactory.deploy(deployerAddress);
  await satpTokenContract.waitForDeployment();
  console.log(`${port} - SATPTokenContract deployed to:`, satpTokenContract.target);

  // Give BRIDGE_ROLE to bridge address so that the bridge can interact with the contract and call functions like mint, burn, etc.
  console.log(`${port} - Giving role to bridge address...`);
  const giveRole2Tx = await satpTokenContract.connect(deployer).giveRole(BRIDGE_ADDRESS);
  await giveRole2Tx.wait();

  if (port === 8545) {
    // Mint tokens to the user address in the source chain (8545)
    console.log(`${port} - Minting tokens...`);
    const mintTx = await satpTokenContract.connect(deployer).mint(userAddress, 100);
    await mintTx.wait();
    
    // Approve bridge address to spend tokens on behalf of the user in the source chain (8545)
    console.log(`${port} - Approving bridge address...`);
    const approve2Tx = await satpTokenContract.connect(user).approve(BRIDGE_ADDRESS, 100);
    await approve2Tx.wait();
    
    // Check allowance of bridge address given by user in the source chain (8545)
    console.log(`${port} - Checking allowance...`);
    const allowance = await satpTokenContract.allowance(
      userAddress,
      BRIDGE_ADDRESS
    );
    console.log(`${port} - Allowance:`, allowance.toString());
  }
}

main(8545).catch(console.error);
main(8547).catch(console.error);
