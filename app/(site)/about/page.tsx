import { sanityFetch, urlFor } from "@/lib/sanity";
import Image from "next/image";

const ABOUT_PAGE_QUERY = `*[_type == "page" && slug.current == "about"][0] {
  title,
  heroTitle,
  heroSubtitle,
  heroBackground,
  bioTitle,
  bioContent,
  profileImage,
  clients[] {
    companyName,
    logo
  }
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
        <main className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                {page.heroBackground && (
                    <>
                        <div className="absolute inset-0 z-0">
                            <Image
                                src={urlFor(page.heroBackground).width(1920).url()}
                                alt="Hero Background"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div className="absolute inset-0 bg-black/60 z-0"></div>
                    </>
                )}

                {/* Hero Content */}
                <div className="relative z-10 text-center px-8 max-w-3xl mx-auto">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-white">
                        {page.heroTitle || page.title}
                    </h1>
                    {page.heroSubtitle && (
                        <p className="text-base md:text-lg text-gray-200 max-w-xl mx-auto">
                            {page.heroSubtitle}
                        </p>
                    )}
                </div>
            </section>

            {/* Bio Section */}
            <section className="py-20 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        {/* Profile Image */}
                        {page.profileImage && (
                            <div className="flex-shrink-0 mx-auto md:mx-0">
                                <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src={urlFor(page.profileImage).width(500).url()}
                                        alt="Profile"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Bio Content */}
                        <div className="flex-1">
                            {page.bioTitle && (
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                                    {page.bioTitle}
                                </h2>
                            )}
                            {page.bioContent && (
                                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed whitespace-pre-line">
                                    {page.bioContent}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Clients Section */}
            {page.clients && page.clients.length > 0 && (
                <section className="py-20 px-8 bg-muted/30">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-12 text-center">
                            Мои клиенты
                        </h2>

                        {/* Logo Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
                            {page.clients.map((client: any, index: number) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-center p-6 bg-background/50 rounded-lg hover:bg-background transition-colors duration-300"
                                >
                                    {client.logo && (
                                        <div className="relative w-full h-20">
                                            <Image
                                                src={urlFor(client.logo).width(300).url()}
                                                alt={client.companyName || 'Client logo'}
                                                fill
                                                className="object-contain filter brightness-90 hover:brightness-100 transition-all duration-300"
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
