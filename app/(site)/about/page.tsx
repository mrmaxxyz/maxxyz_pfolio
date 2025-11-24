import { sanityFetch, urlFor } from "@/lib/sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";

const ABOUT_PAGE_QUERY = `*[_type == "page" && slug.current == "about"][0] {
  title,
  content,
  profileImage
}`;

export default async function AboutPage() {
    const page = await sanityFetch<any>({
        query: ABOUT_PAGE_QUERY,
        tags: ['page:about']
    });

    // Fallback content if page not found
    if (!page) {
        return (
            <main className="min-h-screen pt-32 px-8 pb-16 bg-background text-foreground">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-12">
                        About <span className="text-primary">Maxxyz</span>
                    </h1>
                    <p className="text-muted-foreground">
                        Страница "Обо мне" еще не настроена. Зайдите в админку Sanity Studio и создайте страницу с slug "about".
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen pt-32 px-8 pb-16 bg-background text-foreground">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-12">
                    {page.title}
                </h1>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {page.profileImage && (
                        <div className="flex-shrink-0">
                            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
                                <Image
                                    src={urlFor(page.profileImage).width(400).url()}
                                    alt="Profile"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    )}

                    <div className="prose prose-lg dark:prose-invert max-w-none flex-1">
                        <PortableText value={page.content} />
                    </div>
                </div>
            </div>
        </main>
    );
}
