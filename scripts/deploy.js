const hre = require("hardhat");

async function main(){
    const Token = await hre.ethers.deployContract("Degen");
    await Token.waitForDeployment();
    console.log("Contracts deployed successfully",await Token.target);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});