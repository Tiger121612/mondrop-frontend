import { parseEligibility } from './logic.js';

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('checkBtn');
  const input = document.getElementById('walletInput');
  const resultDiv = document.getElementById('result');

  button.addEventListener('click', async () => {
    const address = input.value.trim();
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      resultDiv.textContent = '❌ Invalid wallet address.';
      return;
    }

    resultDiv.textContent = '⏳ Checking eligibility...';

    try {
      const res = await fetch(`https://mondrop-backend.vercel.app/api/check?address=${address}`);
      if (!res.ok) throw new Error('API failed');
      const data = await res.json();

      const message = parseEligibility(data);
      resultDiv.textContent = message;
    } catch (err) {
      console.error('Fetch error:', err);
      resultDiv.textContent = '❌ Error fetching data. Please try again.';
    }
  });
});
