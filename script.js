document.getElementById("checkBtn").addEventListener("click", async () => {
  const address = document.getElementById("walletAddress").value.trim();
  const resultBox = document.getElementById("result");

  resultBox.innerHTML = "Checking...";

  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    resultBox.innerHTML = "<span style='color:red;'>Invalid address format.</span>";
    return;
  }

  try {
    const response = await fetch(`https://mondrop-backend.vercel.app/api/check?address=${address}`);
    if (!response.ok) throw new Error("API response not ok");

    const data = await response.json();
    displayEligibility(data);
  } catch (err) {
    console.error("Error fetching:", err);
    resultBox.innerHTML = "<span style='color:red;'>Error fetching data. Please try again.</span>";
  }
});
