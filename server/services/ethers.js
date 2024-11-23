require("dotenv").config();
const { JsonRpcProvider, Wallet, Contract } = require("ethers");

// 환경 변수에서 값 로드
const provider = new JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/0vgJV1-aCZvr-8kxFYbZ4N7-Y-kdgNNJ"); // v6에서는 JsonRpcProvider 호출 방식 변경
const wallet = new Wallet(process.env.PRIVATE_KEY, provider); // v6에서 Wallet 사용법 동일

// 확인용 출력
console.log("Provider 연결 성공:", provider);
console.log("Wallet 주소:", wallet.address);

// SBT 스마트 컨트랙트 설정
const sbtContract = new Contract(
  process.env.SBT_CONTRACT_ADDRESS, // 컨트랙트 주소
  [
    "function issueSBT(address to, uint8 sbtType, string name, string studentId, string ipfsUrl) public",
    "function owner() public view returns (address)"
  ], // SBT mint ABI
  wallet // v6에서 signer를 Contract의 세 번째 인자로 직접 전달
);

const { isAddress } = require("ethers");

const mintSBT = async (recipientAddress, sbtType, name, studentId, ipfsUrl) => {
  try {
    console.log("Minting SBT with the following details:");
    console.log(`Recipient Address: ${recipientAddress}`);
    console.log(`SBT Type: ${sbtType}`);
    console.log(`Name: ${name}`);
    console.log(`Student ID: ${studentId}`);
    console.log(`IPFS URL: ${ipfsUrl}`);

    // 소유자 확인
    const contractOwner = await sbtContract.owner();
    console.log("Contract Owner:", contractOwner);
    console.log("Caller Address:", wallet.address);

    if (contractOwner.toLowerCase() !== wallet.address.toLowerCase()) {
      throw new Error("Caller is not the owner of the contract");
    }

    // SBT 발급
    const tx = await sbtContract.issueSBT(
      recipientAddress,
      sbtType,
      name,
      studentId,
      ipfsUrl
    );
    console.log(`Transaction submitted. Hash: ${tx.hash}`);

    const receipt = await tx.wait();
    console.log(`Transaction confirmed. Receipt Hash: ${receipt.transactionHash}`);
    return receipt.transactionHash;
  } catch (error) {
    console.error("Error minting SBT:", error);
    throw new Error("SBT 발급 중 오류 발생");
  }
};


// CommonJS 방식으로 함수 내보내기
module.exports = { mintSBT };
