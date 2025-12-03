import { BentoGrid, BentoGridItem } from "@/components/BentoGrid";
import { sanityFetch, urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";

const PROJECTS_QUERY = `*[_type == "project"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  coverImage,
  category->{title},
  publishedAt
}`;

const SETTINGS_QUERY = `*[_type == "settings"][0] {
  siteTitle,
  seo
}`;

export default async function Home() {
  const [projects, settings] = await Promise.all([
    sanityFetch<any[]>({ query: PROJECTS_QUERY, tags: ['project'] }),
    sanityFetch<any>({ query: SETTINGS_QUERY, tags: ['settings'] })
  ]);

  return (
    <main className="min-h-screen pt-32 px-8 pb-8 bg-background text-foreground">
      <header className="mb-12 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
          {settings?.siteTitle || 'Maxxyz Portfolio'}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          {settings?.seo?.description || 'Visual stories captured through the lens of tactile maximalism.'}
        </p>
      </header>

      <BentoGrid className="max-w-7xl mx-auto">
        {projects.map((project, i) => (
          <BentoGridItem
            key={project._id}
            colSpan={i === 0 || i === 3 ? 2 : 1}
            rowSpan={i === 0 || i === 3 ? 2 : 1}
            className={i === 0 || i === 3 ? "md:col-span-2 md:row-span-2" : ""}
          >
            <Link href={`/projects/${project.slug.current}`} className="group relative block w-full h-full min-h-[200px] rounded-xl overflow-hidden">
              {project.coverImage && (
                <Image
                  src={urlFor(project.coverImage).width(800).url()}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={i < 4}
                />
              )}
              {/* Enhanced gradient overlay for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10 group-hover:from-black/100 transition-all duration-300" />

              <div className="absolute bottom-0 left-0 p-6 w-full">
                {/* Category with background badge for better visibility */}
                <span className="inline-block text-xs font-semibold text-white bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full uppercase tracking-widest mb-3 shadow-lg border border-white/20">
                  {project.category?.title}
                </span>

                {/* Title with strong text shadow for definition */}
                <h2 className="text-2xl md:text-3xl font-bold text-white group-hover:text-accent transition-colors duration-300"
                  style={{
                    textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 4px 16px rgba(0,0,0,0.6), 0 1px 2px rgba(0,0,0,0.9)'
                  }}>
                  {project.title}
                </h2>
              </div>
            </Link>
          </BentoGridItem>
        ))}
      </BentoGrid>
    </main>
  );
}
