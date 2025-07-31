document.getElementById('checkButton').addEventListener('click', async () => {
  const address = document.getElementById('walletAddress').value.trim();
  const resultBox = document.getElementById('result');
  const nftBadgeBox = document.getElementById('nftBadge');
  const leaderboardBox = document.getElementById('leaderboard');

  resultBox.innerHTML = "Checking eligibility...";
  nftBadgeBox.innerHTML = "";
  leaderboardBox.innerHTML = "";

  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    resultBox.innerHTML = "❌ Invalid wallet address.";
    return;
  }

  try {
    const response = await fetch(`/api/check?address=${address}`);
    const data = await response.json();

    if (data.sybil) {
      resultBox.innerHTML = `
        ❌ <strong>Ineligible</strong> — Sybil address detected.<br><br>
        Reason: ${data.sybilReason}
      `;
      return;
    }

    resultBox.innerHTML = `
      ✅ <strong>${data.eligibility.tier} Eligible</strong><br>
      • Total Transactions: ${data.metrics.totalTxns}<br>
      • Unique Transactions: ${data.metrics.uniqueTxns}<br>
      • Verified NFTs: ${data.metrics.verifiedNFTs}<br>
      • SBT Owned: ${data.metrics.hasSBT ? 'Yes' : 'No'}<br>
      • dApps Used: ${data.metrics.dappsUsed}<br>
      • Active Days: ${data.metrics.activeDays}<br>
      • Active Weeks: ${data.metrics.activeWeeks}<br>
      • Active Months: ${data.metrics.activeMonths}<br>
      • Mainnet Txns: ${data.metrics.mainnetTxns}<br><br>
      🪙 <strong>Total Airdrop:</strong> ${data.reward.tokens} MON ($${data.reward.usd})
    `;

    nftBadgeBox.innerHTML = data.eligible
      ? `<br>🏅 NFT Badge Claimed: ${data.nftClaimed ? '✅ Claimed' : '🔘 Not Claimed'}`
      : '';

    leaderboardBox.innerHTML = `
      🏆 <strong>Leaderboard Rank:</strong> ${data.rank ? `#${data.rank}` : 'Not in Top 100'}
    `;

  } catch (err) {
    console.error(err);
    resultBox.innerHTML = "⚠️ Error checking eligibility. Please try again.";
  }
});
