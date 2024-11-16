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

async function getTokenBalance(address, contractAddress) {
  const contract = new ehters.Contract(contractAddress, sbtABI, provider);

  const balance = await contract.balanceOf(address);
  console.log(`주소 ${address}의 토큰 수: ${balance.toString()}`);

  const tokenIds = [];
  for (let i = 0; i < balance; i++) {
    const tokenId = await contract.tokenOfOwnerByIndex(address, i);
    tokenIds.push(tokenId.toString());
  }
  console.log("토큰 ID 목록:", tokenIds);
}

const klipAddress = "KLIP_WALLET_ADDRESS_RECEIVED_FROM_API";
mintSBT(klipAddress, 1);
