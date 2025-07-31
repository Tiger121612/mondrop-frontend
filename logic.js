export async function checkEligibility(address) {
  try {
    const res = await fetch(`https://mondrop-backend.vercel.app/api/check?address=${address}`);
    
    if (!res.ok) {
      throw new Error("Server returned error status");
    }

    const data = await res.json();

    return {
      success: true,
      data
    };
  } catch (error) {
    console.error("Eligibility Check Error:", error);
    return {
      success: false,
      message: "Error fetching eligibility data. Please check the address and try again."
    };
  }
}
