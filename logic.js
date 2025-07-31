export function generateEligibilityHTML(data) {
  if (!data || !data.tier) {
    return `<p style="color: red;">Invalid data received from server.</p>`;
  }

  let html = `
    <h2>Eligibility Result</h2>
    <p><strong>Wallet:</strong> ${data.address}</p>
    <p><strong>Tier:</strong> ${data.tier}</p>
    <p><strong>Sybil Suspect:</strong> ${data.isSybil ? 'Yes ❌' : 'No ✅'}</p>
    <hr />
    <p><strong>Total Transactions:</strong> ${data.txCount}</p>
    <p><strong>Verified NFTs:</strong> ${data.verifiedNFTs}</p>
    <p><strong>Owns SBT NFT:</strong> ${data.sbtOwned ? '✅ Yes' : '❌ No'}</p>
    <p><strong>dApps Used:</strong> ${data.dappsUsed}</p>
    <p><strong>Unique Transactions:</strong> ${data.uniqueTxns}</p>
    <p><strong>Active Days:</strong> ${data.activeDays}</p>
    <p><strong>Active Weeks:</strong> ${data.activeWeeks}</p>
    <p><strong>Active Months:</strong> ${data.activeMonths}</p>
    <p><strong>Ethereum Txns:</strong> ${data.ethTxns}</p>
    <p><strong>Wallet Created At:</strong> ${data.createdAt}</p>
    <p><strong>First Seen:</strong> ${data.firstSeen}</p>
    <p><strong>Last Active:</strong> ${data.lastActive}</p>
  `;

  return html;
}
