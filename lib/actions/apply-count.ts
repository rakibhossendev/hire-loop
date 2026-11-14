export async function countApply(query = ""): Promise<{count: number}>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/application/count`);

    return response.json();
} 