export async function paymentCheckoutVerify(sessionId: string){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}//payments/checkout-verify`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sessionId)
    })
}