require("dotenv").config();
const { JsonRpcProvider, Wallet, Contract } = require("ethers");

// 환경 변수에서 값 로드
const provider = new JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/0vgJV1-aCZvr-8kxFYbZ4N7-Y-kdgNNJ"); // v6에서는 JsonRpcProvider 호출 방식 변경
const wallet = new Wallet(process.env.PRIVATE_KEY, provider); // v6에서 Wallet 사용법 동일

// 확인용 출력
console.log("Provider 연결 성공:", provider);
console.log("Wallet 주소:", wallet.address);

const sbtContract = new Contract(
  process.env.SBT_CONTRACT_ADDRESS,
  [
    "event SBTIssued(address indexed to, uint256 indexed tokenId, string ipfsUrl, uint8 sbtType)",
    "function issueSBT(address to, uint8 sbtType, string name, string studentId, string ipfsUrl) public",
    "function owner() public view returns (address)",
    "function balanceOf(address owner) public view returns (uint256)",
    "function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)",
    "function tokenURI(uint256 tokenId) public view returns (string)",
    "function ownerOf(uint256 tokenId) public view returns (address)", // 추가된 부분
    "function revokeSBT(uint256 tokenId) external",
  ],
  wallet
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
const getSBTDataWithoutIndex = async (userAddress) => {
  try {
    const totalTokens = await sbtContract._tokenIdCounter(); // 총 발행된 토큰 수
    console.log(`Total tokens minted: ${totalTokens.toString()}`);

    const sbtDetails = [];

    for (let tokenId = 0; tokenId < totalTokens; tokenId++) {
      try {
        // 소유자 확인
        const owner = await sbtContract.ownerOf(tokenId);
        if (owner.toLowerCase() === userAddress.toLowerCase()) {
          console.log(`Token ID ${tokenId} is owned by ${userAddress}`);

          // 토큰 URI 가져오기
          const tokenURI = await sbtContract.tokenURI(tokenId);
          console.log(`Token URI for Token ID ${tokenId}: ${tokenURI}`);

          // IPFS에서 메타데이터 가져오기
          const metadataResponse = await axios.get(`https://ipfs.io/ipfs/${tokenURI.replace("ipfs://", "")}`);
          const metadata = metadataResponse.data;

          sbtDetails.push({
            tokenId: tokenId.toString(),
            metadata,
          });
        }
      } catch (error) {
        console.log(`Token ID ${tokenId} does not exist or is not owned by ${userAddress}`);
      }
    }

    return sbtDetails;
  } catch (error) {
    console.error("Error fetching SBT data:", error);
    throw new Error("SBT 조회 중 오류 발생");
  }
};

// SBT 조회 함수
const getSBTData = async (userAddress) => {
  try {
    // 유저가 소유한 토큰 개수 조회
    const balance = await sbtContract.balanceOf(userAddress);
    console.log(`User ${userAddress} owns ${balance.toString()} tokens.`);

    const sbtDetails = [];

    // balance만큼 반복하며 각 토큰 ID 및 메타데이터 조회
    for (let index = 0; index < balance; index++) {
      const tokenId = await sbtContract.tokenOfOwnerByIndex(userAddress, index);
      console.log(`Token ID at index ${index}: ${tokenId.toString()}`);

      // tokenURI 조회
      const tokenURI = await sbtContract.tokenURI(tokenId);
      console.log(`Token URI for Token ID ${tokenId.toString()}: ${tokenURI}`);

      // IPFS에서 메타데이터 가져오기
      const metadataResponse = await axios.get(`https://ipfs.io/ipfs/${tokenURI.replace("ipfs://", "")}`);
      const metadata = metadataResponse.data;

      sbtDetails.push({
        tokenId: tokenId.toString(),
        metadata,
      });
    }

    return sbtDetails;
  } catch (error) {
    console.error("Error fetching SBT data:", error);
    throw new Error("SBT 조회 중 오류 발생");
  }
};

const deleteSBT = async (tokenId) => {
  try {
    console.log("삭제 요청된 Token ID:", tokenId);

    // 컨트랙트 소유자 확인
    const contractOwner = await sbtContract.owner();
    if (contractOwner.toLowerCase() !== wallet.address.toLowerCase()) {
      throw new Error("현재 계정이 컨트랙트 소유자가 아닙니다.");
    }

    // revokeSBT 메서드 호출
    const tx = await sbtContract.revokeSBT(tokenId);
    console.log(`Transaction submitted: ${tx.hash}`);

    // 트랜잭션 완료 대기
    const receipt = await tx.wait();
    console.log(`Transaction confirmed: ${receipt.transactionHash}`);
    return receipt.transactionHash;
  } catch (error) {
    console.error("SBT 삭제 중 오류 발생:", error);
    throw new Error("SBT 삭제 실패");
  }
};

const getSBTDataFromEvents = async (userAddress) => {
  try {
    console.log(`Fetching SBT data for user: ${userAddress}`);

    // SBTIssued 이벤트 필터 생성
    const filter = sbtContract.filters.SBTIssued(userAddress);

    // 이벤트 로그 가져오기
    const events = await sbtContract.queryFilter(filter);
    console.log(`Found ${events.length} SBTs for user ${userAddress}`);

    const sbtDetails = [];
    for (const event of events) {
      try {
        const { tokenId, ipfsUrl, sbtType } = event.args;

        console.log(`Processing Token ID: ${tokenId}, IPFS URL: ${ipfsUrl}`);

        // 컨트랙트 상태에서 토큰 유효성 검증
        const isValid = await sbtContract.ownerOf(tokenId).catch(() => null);
        if (!isValid || isValid.toLowerCase() !== userAddress.toLowerCase()) {
          console.warn(`Token ID ${tokenId} is no longer valid or not owned by ${userAddress}. Skipping.`);
          continue;
        }

        // IPFS 메타데이터 조회
        const metadataResponse = await fetch(`https://ipfs.io/ipfs/${ipfsUrl.replace("ipfs://", "")}`);
        const contentType = metadataResponse.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          console.warn(`Skipping Token ID ${tokenId} due to invalid content-type: ${contentType}`);
          continue;
        }

        const metadata = await metadataResponse.json();
        console.log(metadata);
        sbtDetails.push({
          tokenId: tokenId.toString(),
          sbtType: sbtType.toString(),
          metadata,
        });
      } catch (error) {
        console.error(`Error processing Token ID ${event.args?.tokenId}: ${error.message}`);
        continue;
      }
    }

    return sbtDetails;
  } catch (error) {
    console.error("Error fetching SBT data from events:", error);
    throw new Error("SBT 이벤트 로그 조회 중 오류 발생");
  }
};

module.exports = { mintSBT, deleteSBT,getSBTData,getSBTDataWithoutIndex ,getSBTDataFromEvents};
