import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-32 px-8 pb-16 bg-background text-foreground">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">
                    Contact <span className="text-primary">Me</span>
                </h1>

                <p className="text-xl text-muted-foreground mb-12">
                    Готовы создать что-то уникальное? Свяжитесь со мной, чтобы обсудить ваш проект или съемку.
                </p>

                <div className="grid gap-12">
                    <div className="space-y-8">
                        <div className="flex flex-col space-y-2">
                            <span className="text-sm font-medium text-accent uppercase tracking-wider">Email</span>
                            <a href="mailto:max@maxxyz.ru" className="text-2xl md:text-3xl font-semibold hover:text-primary transition-colors">
                                max@maxxyz.ru
                            </a>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <span className="text-sm font-medium text-accent uppercase tracking-wider">Socials</span>
                            <div className="flex gap-6 text-lg">
                                <a href="#" className="hover:text-primary transition-colors">Instagram</a>
                                <a href="#" className="hover:text-primary transition-colors">Telegram</a>
                                <a href="#" className="hover:text-primary transition-colors">VK</a>
                                <a href="#" className="hover:text-primary transition-colors">35PHOTO</a>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <span className="text-sm font-medium text-accent uppercase tracking-wider">Location</span>
                            <p className="text-xl">Москва / Санкт-Петербург / Весь мир</p>
                        </div>
                    </div>

                    <form className="space-y-6 p-8 rounded-2xl bg-muted/30 border border-border">
                        <h3 className="text-2xl font-bold">Напишите мне</h3>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">Имя</label>
                                    <Input id="name" placeholder="Ваше имя" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                                    <Input id="email" type="email" placeholder="hello@example.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">Сообщение</label>
                                <textarea
                                    id="message"
                                    className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Расскажите о вашей идее..."
                                />
                            </div>
                        </div>
                        <Button className="w-full md:w-auto">Отправить сообщение</Button>
                    </form>
                </div>
            </div>
        </main>
    );
}
