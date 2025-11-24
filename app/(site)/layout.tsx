import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/Navbar";
import { sanityFetch } from "@/lib/sanity";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maxxyz Portfolio",
  description: "Professional Photography Portfolio",
};

const SETTINGS_QUERY = `*[_type == "settings"][0] {
  headingColor,
  siteTitle,
  navigation
}`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await sanityFetch<any>({
    query: SETTINGS_QUERY,
    tags: ['settings']
  });

  const headingColor = settings?.headingColor || 'foreground';

  // Map heading color to CSS variable
  const headingColorMap: Record<string, string> = {
    'primary': 'var(--color-primary)',
    'accent': 'var(--color-accent)',
    'foreground': 'var(--color-foreground)',
  };

  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          // @ts-ignore - CSS variable
          '--heading-color': headingColorMap[headingColor] || headingColorMap.foreground
        }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar
            siteTitle={settings?.siteTitle || 'Maxxyz'}
            navigation={settings?.navigation || [
              { label: 'Портфолио', link: '/' },
              { label: 'Обо мне', link: '/about' },
              { label: 'Контакты', link: '/contact' }
            ]}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
