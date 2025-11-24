import { sanityFetch, urlFor } from "@/lib/sanity";
import { PortableText } from "next-sanity";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const CONTACT_PAGE_QUERY = `*[_type == "page" && slug.current == "contact"][0] {
  title,
  content,
  contactInfo,
  cta,
  faq,
  featuredProjects[]-> {
    _id,
    title,
    slug,
    coverImage,
    description
  }
}`;

export default async function ContactPage() {
    const page = await sanityFetch<any>({
        query: CONTACT_PAGE_QUERY,
        tags: ['page:contact']
    });

    // Fallback if page not found
    if (!page) {
        return (
            <main className="min-h-screen pt-32 px-8 pb-16 bg-background text-foreground">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">
                        Contact <span className="text-primary">Me</span>
                    </h1>
                    <p className="text-muted-foreground">
                        Страница "Контакты" еще не настроена. Зайдите в админку Sanity Studio и создайте страницу с slug "contact".
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen pt-32 px-8 pb-16 bg-background text-foreground">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">
                    {page.title}
                </h1>

                {page.content && (
                    <div className="prose prose-lg dark:prose-invert mb-12">
                        <PortableText value={page.content} />
                    </div>
                )}

                <div className="grid gap-8">
                    {page.contactInfo && (
                        <div className="space-y-8">
                            {page.contactInfo.email && (
                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                        <Mail size={24} />
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <span className="text-sm font-medium text-accent uppercase tracking-wider">Почта</span>
                                        <a href={`mailto:${page.contactInfo.email}`} className="text-2xl md:text-3xl font-semibold hover:text-primary transition-colors">
                                            {page.contactInfo.email}
                                        </a>
                                    </div>
                                </div>
                            )}

                            {page.contactInfo.phone && (
                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                        <Phone size={24} />
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <span className="text-sm font-medium text-accent uppercase tracking-wider">Телефон</span>
                                        <a href={`tel:${page.contactInfo.phone}`} className="text-xl hover:text-primary transition-colors">
                                            {page.contactInfo.phone}
                                        </a>
                                    </div>
                                </div>
                            )}

                            {page.contactInfo.location && (
                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                        <MapPin size={24} />
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <span className="text-sm font-medium text-accent uppercase tracking-wider">Локация</span>
                                        <p className="text-xl">{page.contactInfo.location}</p>
                                    </div>
                                </div>
                            )}

                            {page.contactInfo.socials && page.contactInfo.socials.length > 0 && (
                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                        <Send size={24} />
                                    </div>
                                    <div className="flex flex-col space-y-3">
                                        <span className="text-sm font-medium text-accent uppercase tracking-wider">Соцсети</span>
                                        <div className="flex flex-wrap gap-3">
                                            {page.contactInfo.socials.map((social: any, i: number) => (
                                                <a
                                                    key={i}
                                                    href={social.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-4 py-2 rounded-full border border-border hover:bg-primary hover:text-white hover:border-primary transition-all text-lg font-medium"
                                                >
                                                    {social.platform}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* CTA Section */}
                {page.cta && page.cta.text && page.cta.url && (
                    <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                        <div className="text-center space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold">Готовы начать?</h2>
                            <p className="text-muted-foreground max-w-md mx-auto">
                                Свяжитесь со мной, чтобы обсудить ваш проект и получить индивидуальное предложение
                            </p>
                            <a
                                href={page.cta.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full hover:bg-primary/90 transition-all font-semibold text-lg group"
                            >
                                {page.cta.text}
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                            </a>
                        </div>
                    </div>
                )}

                {/* FAQ Section */}
                {page.faq && page.faq.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-8">Частые вопросы</h2>
                        <div className="space-y-4">
                            {page.faq.map((item: any, i: number) => (
                                <details key={i} className="group p-6 rounded-xl border border-border bg-muted/30 hover:bg-muted/50 transition-colors">
                                    <summary className="cursor-pointer list-none flex justify-between items-center font-semibold text-lg">
                                        {item.question}
                                        <span className="ml-4 text-primary group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <p className="mt-4 text-muted-foreground leading-relaxed">{item.answer}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                )}

                {/* Featured Projects */}
                {page.featuredProjects && page.featuredProjects.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-8">Избранные работы</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {page.featuredProjects.map((project: any) => (
                                <Link
                                    key={project._id}
                                    href={`/projects/${project.slug.current}`}
                                    className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-muted"
                                >
                                    {project.coverImage && (
                                        <Image
                                            src={urlFor(project.coverImage).width(800).url()}
                                            alt={project.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity">
                                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                            {project.description && (
                                                <p className="text-sm text-white/80 line-clamp-2">{project.description}</p>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
