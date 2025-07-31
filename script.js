document.getElementById("checkBtn").addEventListener("click", async () => {
  const address = document.getElementById("walletInput").value.trim();
  const resultDiv = document.getElementById("result");
  resultDiv.classList.remove("hidden");
  resultDiv.textContent = "⏳ Checking eligibility...";

  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    resultDiv.textContent = "❌ Invalid wallet address format.";
    return;
  }

  try {
    const res = await fetch(`https://mondrop-backend.vercel.app/api/check?address=${address}`);
    const data = await res.json();

    const output = formatEligibility(data);
    resultDiv.textContent = output;
  } catch (err) {
    resultDiv.textContent = "❌ Error fetching data. Please try again.";
    console.error("Fetch error:", err);
  }
});
