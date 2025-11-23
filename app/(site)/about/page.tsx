import Image from "next/image";

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-32 px-8 pb-16 bg-background text-foreground">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-12">
                    About <span className="text-primary">Maxxyz</span>
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-muted">
                        {/* Placeholder for portrait - user can replace via CMS later if we make this dynamic, 
                 but for now hardcoded structure is safer for "filling pages" request */}
                        <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-neutral-500">
                            <span>Portrait Placeholder</span>
                        </div>
                    </div>

                    <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                        <p>
                            Привет! Меня зовут <span className="text-foreground font-semibold">Максим Ковалев</span>, в цифровом мире я известен как <span className="text-accent">Maxxyz</span>.
                        </p>
                        <p>
                            Я профессиональный фотограф, специализирующийся на создании визуальных историй, где природа переплетается с городской эстетикой. Мой стиль — это <strong>"Тактильный Максимализм"</strong>: я стремлюсь передать не просто картинку, а текстуру, атмосферу и ощущение момента.
                        </p>
                        <p>
                            В каждой фотографии я ищу баланс между хаосом и порядком, светом и тенью. Для меня фотография — это способ остановить время и позволить зрителю прикоснуться к ускользающей красоте окружающего мира.
                        </p>
                        <p>
                            Я работаю в жанрах портретной, пейзажной и свадебной фотографии. Мои работы — это не просто снимки, это эмоциональные отпечатки, которые остаются с вами навсегда.
                        </p>

                        <div className="pt-6">
                            <h3 className="text-xl font-bold text-foreground mb-4">Мой подход</h3>
                            <ul className="space-y-2 list-disc list-inside">
                                <li>Внимание к деталям и текстурам</li>
                                <li>Естественный свет и глубокие цвета</li>
                                <li>Искренние эмоции в каждом кадре</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
