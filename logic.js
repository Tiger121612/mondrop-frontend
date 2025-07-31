function formatEligibility(data) {
  if (!data || data.error) {
    return "❌ Error: Invalid response from server.";
  }

  if (data.isSybil) {
    return `🚫 Disqualified: Sybil behavior detected.
Reason: Suspicious funding patterns, short activity duration, or matching known Sybil cluster.`;
  }

  return `✅ Address: ${data.address}
🎖 Tier: ${data.tier}
📦 Total Transactions: ${data.txCount}
🎨 Verified NFTs: ${data.verifiedNFTs}
🔗 SBT Owned: ${data.sbtOwned ? "Yes" : "No"}
🧩 dApps Used: ${data.dappsUsed}
📍 Unique Txns: ${data.uniqueTxns}
📅 Active Days: ${data.activeDays}
🗓 Active Weeks: ${data.activeWeeks}
📆 Active Months: ${data.activeMonths}
🌐 ETH Mainnet Txns: ${data.ethTxns}

🧠 First Seen: ${data.firstSeen}
💡 Last Active: ${data.lastActive}
🎉 Created At: ${data.createdAt}

🌟 Eligibility: ✅ Congratulations! You are eligible for the ModDrop Airdrop.`;
}
