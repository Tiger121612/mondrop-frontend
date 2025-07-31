document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("wallet-form");
  const addressInput = document.getElementById("wallet-address");
  const resultDiv = document.getElementById("result");
  const errorDiv = document.getElementById("error-message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const address = addressInput.value.trim();

    // Clear old results
    resultDiv.innerHTML = "";
    errorDiv.textContent = "";

    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      errorDiv.textContent = "❌ Invalid wallet address format.";
      return;
    }

    try {
      const response = await fetch(`https://mondrop-backend.vercel.app/api/check?address=${address}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data from backend.");
      }

      const data = await response.json();

      if (data.error) {
        errorDiv.textContent = "❌ " + data.error;
        return;
      }

      displayResult(data);
    } catch (err) {
      console.error(err);
      errorDiv.textContent = "❌ Error fetching data.";
    }
  });

  function displayResult(data) {
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
      lastActive
    } = data;

    const reward = tier === "Tier 1 (OG)" ? "💰 Full Airdrop + Bonus"
                 : tier === "Tier 2 (Power)" ? "🪙 50% Airdrop"
                 : tier === "Tier 3 (Basic)" ? "🔸 20% Airdrop"
                 : "❌ Not Eligible";

    const sybilStatus = isSybil ? "⚠️ Sybil Detected (No Rewards)" : "✅ Clean Wallet";

    resultDiv.innerHTML = `
      <h3>🎯 Eligibility Result</h3>
      <p><strong>Tier:</strong> ${tier}</p>
      <p><strong>Reward:</strong> ${reward}</p>
      <p><strong>Sybil Check:</strong> ${sybilStatus}</p>
      <hr />
      <p><strong>📦 Total Transactions:</strong> ${txCount}</p>
      <p><strong>🎨 Verified NFTs:</strong> ${verifiedNFTs}</p>
      <p><strong>🔐 Owns SBT:</strong> ${sbtOwned ? "Yes" : "No"}</p>
      <p><strong>🧩 dApps Used:</strong> ${dappsUsed}</p>
      <p><strong>🔄 Unique Txns:</strong> ${uniqueTxns}</p>
      <p><strong>📅 Active Days:</strong> ${activeDays}</p>
      <p><strong>📆 Active Weeks:</strong> ${activeWeeks}</p>
      <p><strong>📆 Active Months:</strong> ${activeMonths}</p>
      <p><strong>🌐 Ethereum Txns:</strong> ${ethTxns}</p>
      <hr />
      <p><strong>📍 Wallet Created:</strong> ${createdAt}</p>
      <p><strong>🔍 First Seen:</strong> ${firstSeen}</p>
      <p><strong>🕓 Last Active:</strong> ${lastActive}</p>
    `;
  }
});
