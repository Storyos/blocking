const { ethers } = require("ethers");

exports.issueSbt = async (metadata) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_RPC_URL);
    const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);

    const sbtContractAddress = process.env.SBT_CONTRACT_ADDRESS;
    const sbtAbi = [
      "function mint(address to, string memory tokenURI) public",
    ];

    const sbtContract = new ethers.Contract(sbtContractAddress, sbtAbi, wallet);

    const tokenURI = metadata.fileUrl;
    const recipientAddress = metadata.userAddress;

    const tx = await sbtContract.mint(recipientAddress, tokenURI);
    await tx.wait();

    console.log("SBT successfully issued to:", recipientAddress);
  } catch (error) {
    console.error("Error issuing SBT:", error);
    throw new Error("Failed to issue SBT");
  }
};
