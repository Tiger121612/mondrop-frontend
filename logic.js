export function parseEligibility(data) {
  if (!data) return '❌ Invalid or empty data.';

  let lines = [];
  lines.push(`📍 Address: ${data.address}`);
  lines.push(`🏆 Tier: ${data.tier}`);
  lines.push(`🚫 Sybil: ${data.isSybil ? 'Yes ❌' : 'No ✅'}`);
  lines.push(`📊 Txns: ${data.txCount}`);
  lines.push(`🎨 NFTs: ${data.verifiedNFTs}`);
  lines.push(`🔗 Soulbound NFT: ${data.sbtOwned ? '✅' : '❌'}`);
  lines.push(`🧩 DApps Used: ${data.dappsUsed}`);
  lines.push(`🧠 Unique Txns: ${data.uniqueTxns}`);
  lines.push(`📅 Active Days: ${data.activeDays}`);
  lines.push(`📆 Active Weeks: ${data.activeWeeks}`);
  lines.push(`📈 Active Months: ${data.activeMonths}`);
  lines.push(`🌐 Ethereum Txns: ${data.ethTxns}`);
  lines.push(`📌 Created At: ${data.createdAt}`);
  lines.push(`📍 First Seen: ${data.firstSeen}`);
  lines.push(`🕒 Last Active: ${data.lastActive}`);

  return lines.join('\n');
}
