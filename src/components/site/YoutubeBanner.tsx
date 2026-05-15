import { Youtube } from "lucide-react";
import { motion } from "motion/react";

export function YoutubeBanner() {
  return (
    <section className="bg-primary text-primary-foreground">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto flex max-w-5xl flex-col items-center px-6 py-20 text-center"
      >
        <Youtube className="mb-6 h-12 w-12" strokeWidth={1.2} />
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary-foreground/70">
          Online
        </p>
        <h2 className="font-serif text-4xl md:text-5xl">Assista ao Vivo</h2>
        <p className="mt-5 max-w-xl text-primary-foreground/80">
          Acompanhe nossos cultos e mensagens diretamente pelo nosso canal oficial no YouTube.
        </p>
        <a
          href="https://www.youtube.com/@igrejabatistamaranata"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary-foreground px-8 py-3 text-sm font-medium uppercase tracking-widest text-primary transition hover:bg-primary-foreground/90"
        >
          <Youtube className="h-4 w-4" />
          Acessar Canal
        </a>
      </motion.div>
    </section>
  );
}
