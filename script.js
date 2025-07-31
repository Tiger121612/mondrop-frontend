import { generateEligibilityHTML } from './logic.js';

document.addEventListener('DOMContentLoaded', () => {
  const checkBtn = document.getElementById('checkBtn');
  const walletInput = document.getElementById('walletInput');
  const resultDiv = document.getElementById('result');

  checkBtn.addEventListener('click', async () => {
    const address = walletInput.value.trim();

    if (!address || !address.startsWith('0x') || address.length !== 42) {
      resultDiv.innerHTML = `<p style="color:red;">Please enter a valid wallet address.</p>`;
      return;
    }

    resultDiv.innerHTML = "⏳ Fetching data...";

    try {
      const res = await fetch(`https://mondrop-backend.vercel.app/api/check?address=${address}`);
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();

      resultDiv.innerHTML = generateEligibilityHTML(data);
    } catch (err) {
      console.error(err);
      resultDiv.innerHTML = `<p style="color:red;">❌ Error fetching data. Please try again.</p>`;
    }
  });
});
