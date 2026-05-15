import { Youtube } from "lucide-react";
import { motion } from "motion/react";

export function YoutubeBanner() {
  return (
    <section className="bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto flex max-w-7xl flex-col items-center rounded-[2rem] border border-white/15 bg-white/10 px-6 py-20 text-center shadow-[0_30px_80px_rgba(15,23,42,0.18)] backdrop-blur-xl"
      >
        <Youtube className="mb-6 h-14 w-14 text-white" strokeWidth={1.4} />
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-white/70">
          Online
        </p>
        <h2 className="font-serif text-4xl font-bold md:text-5xl">Assista ao Vivo</h2>
        <p className="mt-5 max-w-2xl text-sm leading-8 text-white/80 md:text-base">
          Acompanhe nossos cultos e mensagens diretamente pelo nosso canal oficial no YouTube e fortaleça sua caminhada de fé.
        </p>
        <a
          href="https://www.youtube.com/@igrejabatistamaranata"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-widest text-primary transition hover:bg-white/90"
        >
          <Youtube className="h-5 w-5 text-primary" />
          Acessar Canal
        </a>
      </motion.div>
    </section>
  );
}
