const { ehters } = require("ethers");

const provider = new ehters.providers.JsonRpcProvider(
  "https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID"
);
const wallet = new ehters.Wallet("your-private-key", provider);

const sbtAddress = "YOUR_SBT_CONTRACT_ADDRESS";
const sbtABI = ["function mint(address to, uint256 tokenId) public"];

const sbtContract = new ehters.Contract(sbtAddress, sbtABI, wallet);

async function mintSBT(recipentAddress, tokenId) {
  try {
    const tx = await sbtContract.mint(recipentAddress, tokenId);
    await tx.wait();
    console.log(`SBT 발행 성공: ${recipentAddress}에 토큰 ID ${tokenId} 발행`);
  } catch (error) {
    console.error("SBT 발행 실패:", error);
  }
}

const klipAddress = "KLIP_WALLET_ADDRESS_RECEIVED_FROM_API";
mintSBT(klipAddress, 1);
