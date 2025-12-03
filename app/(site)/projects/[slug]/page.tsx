import { Gallery } from "@/components/Gallery";
import { sanityFetch, urlFor } from "@/lib/sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";

const PROJECT_QUERY = `*[_type == "project" && slug.current == $slug][0] {
  ...,
  category->{title},
  gallery[] {
    ...,
    asset->
  }
}`;

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = await sanityFetch<any>({
        query: PROJECT_QUERY,
        params: { slug },
        tags: [`project:${slug}`],
    });

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
                {project.coverImage && (
                    <Image
                        src={urlFor(project.coverImage).width(1920).url()}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                )}
                {/* Enhanced gradient overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
                    <div className="max-w-7xl mx-auto">
                        {/* Category badge with background for better visibility */}
                        <span className="inline-block text-xs font-semibold text-white bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-lg border border-white/20">
                            {project.category?.title}
                        </span>
                        {/* Title with strong text shadow for definition */}
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6"
                            style={{
                                textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 4px 16px rgba(0,0,0,0.6), 0 1px 2px rgba(0,0,0,0.9)'
                            }}>
                            {project.title}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Content & Gallery */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                {project.content && (
                    <div className="prose prose-lg dark:prose-invert max-w-3xl mx-auto mb-16">
                        <PortableText value={project.content} />
                    </div>
                )}

                {project.gallery && (
                    <Gallery images={project.gallery} layout={project.parameters?.layout || 'bento'} />
                )}
            </div>
        </main>
    );
}
