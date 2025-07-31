async function checkEligibility() {
  const address = document.getElementById("walletInput").value.trim();
  const resultBox = document.getElementById("result");
  resultBox.innerHTML = "";

  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    resultBox.innerHTML = "<p class='fail'>❌ Please enter a valid wallet address.</p>";
    return;
  }

  try {
    const res = await fetch(`https://mondrop-backend.vercel.app/api/check?address=${address}`);
    if (!res.ok) throw new Error("API Error");
    const data = await res.json();

    const html = generateReport(data);
    resultBox.innerHTML = html;
  } catch (err) {
    console.error(err);
    resultBox.innerHTML = "<p class='fail'>⚠️ Error fetching data. Please try again.</p>";
  }
}
