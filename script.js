document.getElementById("checkBtn").addEventListener("click", async () => {
  const address = document.getElementById("walletInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!address) {
    resultDiv.innerHTML = "⚠️ Please enter a wallet address.";
    return;
  }

  resultDiv.innerHTML = "⏳ Checking eligibility...";

  try {
    const response = await fetch(`https://mondrop-backend.vercel.app/api/check?address=${address}`);
    const data = await response.json();

    if (data.sybil) {
      resultDiv.innerHTML = `
        ❌ <b>Not eligible (Sybil Detected)</b><br/>
        <i>Reason:</i> ${data.sybilReason || "Suspicious behavior detected."}
      `;
    } else {
      resultDiv.innerHTML = `
        ✅ <b>${data.eligibility.tier} Eligible</b><br/>
        <b>Rewards:</b> ${data.tokens} MON<br/>
        <b>Bonus:</b> ${data.bonusReason || "No bonus"}<br/><br/>
        <b>📊 Stats:</b><br/>
        • Txns: ${data.stats.txCount}<br/>
        • NFTs: ${data.stats.nftCount}<br/>
        • DApps Used: ${data.stats.dappCount}<br/>
        • Active Days: ${data.stats.activeDays}<br/>
        • Weeks: ${data.stats.activeWeeks} | Months: ${data.stats.activeMonths}
      `;
    }
  } catch (err) {
    console.error(err);
    resultDiv.innerHTML = "❌ Error fetching data. Please try again later.";
  }
});
