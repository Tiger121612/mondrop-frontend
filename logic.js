function displayEligibility(data) {
  const resultBox = document.getElementById("result");

  if (!data || !data.address) {
    resultBox.innerHTML = "<span style='color:red;'>Invalid response from server.</span>";
    return;
  }

  const {
    address, tier, isSybil, txCount, verifiedNFTs, sbtOwned,
    dappsUsed, uniqueTxns, activeDays, activeWeeks, activeMonths,
    ethTxns, createdAt, firstSeen, lastActive
  } = data;

  if (isSybil) {
    resultBox.innerHTML = `
      <h3>❌ Ineligible</h3>
      <p>This address has been flagged as a Sybil address.</p>
    `;
    return;
  }

  resultBox.innerHTML = `
    <h3>✅ Eligible - ${tier}</h3>
    <p><strong>Address:</strong> ${address}</p>
    <ul>
      <li><strong>Tx Count:</strong> ${txCount}</li>
      <li><strong>Verified NFTs:</strong> ${verifiedNFTs}</li>
      <li><strong>SBT Owned:</strong> ${sbtOwned ? "Yes" : "No"}</li>
      <li><strong>dApps Used:</strong> ${dappsUsed}</li>
      <li><strong>Unique Txns:</strong> ${uniqueTxns}</li>
      <li><strong>Active Days:</strong> ${activeDays}</li>
      <li><strong>Active Weeks:</strong> ${activeWeeks}</li>
      <li><strong>Active Months:</strong> ${activeMonths}</li>
      <li><strong>ETH Txns:</strong> ${ethTxns}</li>
      <li><strong>Account Created:</strong> ${createdAt}</li>
      <li><strong>First Seen:</strong> ${firstSeen}</li>
      <li><strong>Last Active:</strong> ${lastActive}</li>
    </ul>
  `;
}
