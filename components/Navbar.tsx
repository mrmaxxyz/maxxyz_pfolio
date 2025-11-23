import Link from "next/link";
import { sanityFetch } from "@/lib/sanity";
import { ThemeToggle } from "./theme-toggle";

const SETTINGS_QUERY = `*[_type == "settings"][0] {
  siteTitle,
  navigation
}`;

export async function Navbar() {
    const settings = await sanityFetch<any>({ query: SETTINGS_QUERY, tags: ['settings'] });

    // Extract short brand name (first word or part before "|")
    const fullTitle = settings?.siteTitle || 'Maxxyz';
    const shortName = fullTitle.split('|')[0].trim().split(' ')[0];

    // Fallback navigation if not set in CMS
    const navigation = settings?.navigation || [
        { label: 'Портфолио', link: '/' },
        { label: 'Обо мне', link: '/about' },
        { label: 'Контакты', link: '/contact' }
    ];

    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md bg-background/80 backdrop-blur-md border border-border rounded-full px-6 py-3 shadow-lg flex items-center justify-between">
            <Link href="/" className="font-bold text-lg tracking-tight hover:text-primary transition-colors">
                {shortName}
            </Link>
            <div className="flex items-center gap-6 text-sm font-medium">
                {navigation.map((item: any, i: number) => (
                    <Link key={i} href={item.link} className="hover:text-primary transition-colors">
                        {item.label}
                    </Link>
                ))}
            </div>
            <ThemeToggle />
        </nav>
    );
}
