export async function checkEligibility(address) {
  const endpoint = `https://mondrop-backend.vercel.app/api/check?address=${address}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error('Network error');
    }

    const data = await response.json();

    if (!data || !data.address) {
      throw new Error('Invalid response from backend');
    }

    const {
      tier,
      isSybil,
      txCount,
      verifiedNFTs,
      sbtOwned,
      dappsUsed,
      uniqueTxns,
      activeDays,
      activeWeeks,
      activeMonths,
      ethTxns,
      createdAt,
      firstSeen,
      lastActive,
    } = data;

    // Rewards Calculation
    const totalSupply = 1000000000;
    const airdropPool = 0.075 * totalSupply;
    const leaderboardBonus = 100000;

    let baseReward = 0;
    let bonusReason = "";

    if (tier === "Tier 1 (OG)") baseReward = 100;
    else if (tier === "Tier 2 (Power User)") baseReward = 50;
    else if (tier === "Tier 3 (Basic User)") baseReward = 20;

    if (txCount > 1000) {
      baseReward += 15;
      bonusReason += "High activity bonus. ";
    }

    if (ethTxns >= 5) {
      baseReward += 10;
      bonusReason += "Cross-chain bonus. ";
    }

    if (verifiedNFTs > 10) {
      baseReward += 10;
      bonusReason += "NFT collector bonus. ";
    }

    if (sbtOwned) {
      baseReward += 5;
      bonusReason += "SBT holder bonus. ";
    }

    if (dappsUsed > 10) {
      baseReward += 10;
      bonusReason += "dApp explorer bonus. ";
    }

    // Sybil penalty
    if (isSybil) {
      baseReward = 0;
      bonusReason = "Disqualified due to Sybil-like behavior.";
    }

    return {
      address: data.address,
      tier,
      isSybil,
      txCount,
      verifiedNFTs,
      sbtOwned,
      dappsUsed,
      uniqueTxns,
      activeDays,
      activeWeeks,
      activeMonths,
      ethTxns,
      createdAt,
      firstSeen,
      lastActive,
      reward: baseReward,
      bonusReason,
    };
  } catch (error) {
    console.error("Eligibility Check Failed:", error);
    throw error;
  }
}
