async function checkEligibility() {
  const address = document.getElementById("walletAddress").value.trim();
  const resultDiv = document.getElementById("result");
  const loading = document.getElementById("loading");

  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    resultDiv.innerHTML = "❌ Invalid address format.";
    return;
  }

  resultDiv.innerHTML = "";
  loading.style.display = "block";

  try {
    const response = await fetch(`https://mondrop-backend.vercel.app/api/check?address=${address}`);
    const data = await response.json();
    loading.style.display = "none";

    if (data.error) {
      resultDiv.innerHTML = "❌ " + data.error;
    } else {
      resultDiv.innerHTML = `
        ✅ <strong>${data.eligibility}</strong><br/>
        Tier: ${data.tier}<br/>
        Estimated Tokens: ${data.tokens}<br/>
        Reason: ${data.reason}<br/>
        ${data.sybil ? "⚠️ Sybil Suspected" : "✔️ No Sybil activity detected"}
      `;
    }
  } catch (err) {
    loading.style.display = "none";
    resultDiv.innerHTML = "❌ Error fetching data.";
  }
}
