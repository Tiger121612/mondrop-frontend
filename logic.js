export async function fetchEligibility(address) {
  try {
    const response = await fetch(`https://mondrop-backend.vercel.app/api/check?address=${address}`);
    if (!response.ok) throw new Error("Network error");
    const data = await response.json();
    return data;
  } catch (err) {
    return { error: "API request failed. Try again later." };
  }
}
