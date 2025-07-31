import { getTxnCount, getNFTs, getDappsUsed, getActivityStats, getMainnetTxns, detectSybil } from './monadFetcher';

export default async function checkEligibility(address) {
  const [totalTxns, uniqueTxns] = await getTxnCount(address);
  const verifiedNFTs = await getNFTs(address);
  const dappsUsed = await getDappsUsed(address);
  const { activeDays, activeWeeks, activeMonths } = await getActivityStats(address);
  const mainnetTxns = await getMainnetTxns(address);
  const hasSBT = verifiedNFTs.some(nft => nft.type === "SBT");

  const sybilResult = detectSybil({
    totalTxns,
    activeDays,
    accountAge: await getAccountAge(address),
    clusterFunder: await isClusterFunded(address),
  });

  if (sybilResult.sybil) {
    return {
      sybil: true,
      sybilReason: sybilResult.reason,
    };
  }

  let tier = "Not Eligible";
  let tokens = 0;

  if (
    totalTxns >= 500 &&
    verifiedNFTs.length >= 5 &&
    hasSBT &&
    dappsUsed >= 10 &&
    uniqueTxns >= 50 &&
    activeDays >= 40 &&
    activeWeeks >= 4 &&
    activeMonths >= 3 &&
    mainnetTxns >= 3
  ) {
    tier = "OG User";
    tokens = 3000;
  } else if (
    totalTxns >= 250 &&
    verifiedNFTs.length >= 2 &&
    dappsUsed >= 5
  ) {
    tier = "Power User";
    tokens = 1500;
  } else if (
    totalTxns >= 50 &&
    verifiedNFTs.length >= 1 &&
    activeDays >= 10
  ) {
    tier = "Basic User";
    tokens = 600;
  }

  const usd = tokens * 8;
  const rank = await getRank(address); // From leaderboard module
  const nftClaimed = await hasClaimedNFT(address); // Check claim status

  return {
    sybil: false,
    eligibility: { tier },
    metrics: {
      totalTxns,
      uniqueTxns,
      verifiedNFTs: verifiedNFTs.length,
      hasSBT,
      dappsUsed,
      activeDays,
      activeWeeks,
      activeMonths,
      mainnetTxns,
    },
    reward: { tokens, usd },
    nftClaimed,
    rank,
    eligible: tier !== "Not Eligible",
  };
}
