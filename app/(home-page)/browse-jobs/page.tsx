import { browseJobs } from "@/lib/actions/browse-jobs";

export default async function BrowseJobs({searchParams,}:{searchParams: Promise<{ [key: string]: string | string [] | undefined }>}){
    const query = new URLSearchParams(await searchParams as Record<string, string>).toString();
    const getJobs = await browseJobs(query);

    console.log(getJobs)
    return (
        <section>
            <h1 className="text-2xl font-bold">Browse Jobs rendered</h1>
        </section>
    )
}