function generateReport(data) {
  const {
    address, tier, isSybil, txCount, verifiedNFTs, sbtOwned, dappsUsed,
    uniqueTxns, activeDays, activeWeeks, activeMonths, ethTxns,
    createdAt, firstSeen, lastActive
  } = data;

  if (!data || !address) return "<p class='fail'>Invalid data format.</p>";

  const eligibility = isSybil
    ? `<p class="fail">🚫 Sybil Detected – Ineligible for Mondrop</p>`
    : `<p class="success">✅ Eligible! You are in <strong>${tier}</strong></p>`;

  const table = `
    <div class="result-box">
      ${eligibility}
      <p><strong>Wallet:</strong> ${address}</p>
      <ul>
        <li><strong>Total Txns:</strong> ${txCount}</li>
        <li><strong>Verified NFTs:</strong> ${verifiedNFTs}</li>
        <li><strong>SBT Owned:</strong> ${sbtOwned ? '✅ Yes' : '❌ No'}</li>
        <li><strong>dApps Used:</strong> ${dappsUsed}</li>
        <li><strong>Unique Txns:</strong> ${uniqueTxns}</li>
        <li><strong>Active Days:</strong> ${activeDays}</li>
        <li><strong>Active Weeks:</strong> ${activeWeeks}</li>
        <li><strong>Active Months:</strong> ${activeMonths}</li>
        <li><strong>Ethereum Txns:</strong> ${ethTxns}</li>
        <li><strong>Wallet Created:</strong> ${createdAt}</li>
        <li><strong>First Seen:</strong> ${firstSeen}</li>
        <li><strong>Last Active:</strong> ${lastActive}</li>
      </ul>
    </div>
  `;
  return table;
}
