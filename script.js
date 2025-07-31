document.getElementById("checkBtn").addEventListener("click", async () => {
  const address = document.getElementById("walletInput").value.trim();

  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    alert("Please enter a valid wallet address");
    return;
  }

  try {
    const res = await fetch(`https://mondrop-backend.vercel.app/api/check?address=${address}`);
    const data = await res.json();

    if (data.error) {
      alert("Error: " + data.error);
      return;
    }

    showResults(data);
  } catch (err) {
    console.error(err);
    alert("Error fetching data");
  }
});

function showResults(data) {
  document.getElementById("result").classList.remove("hidden");

  document.getElementById("tier").textContent = data.tier;
  document.getElementById("sybil").textContent = data.isSybil ? "❌ Yes (Disqualified)" : "✅ No (Eligible)";
  document.getElementById("txCount").textContent = data.txCount;
  document.getElementById("nfts").textContent = data.verifiedNFTs;
  document.getElementById("sbt").textContent = data.sbtOwned ? "✅ Yes" : "❌ No";
  document.getElementById("dapps").textContent = data.dappsUsed;
  document.getElementById("uniqueTxns").textContent = data.uniqueTxns;
  document.getElementById("activeDays").textContent = data.activeDays;
  document.getElementById("activeWeeks").textContent = data.activeWeeks;
  document.getElementById("activeMonths").textContent = data.activeMonths;
  document.getElementById("ethTxns").textContent = data.ethTxns;
}
