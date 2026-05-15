import { motion } from "motion/react";
import logo from "@/assets/logo-maranata.jpg";

export function Hero() {
  return (
    <section className="hero-bg relative overflow-hidden">
      <div className="mx-auto flex min-h-[90vh] max-w-5xl flex-col items-center justify-center px-6 py-24 text-center">
        <motion.img
          src={logo}
          alt="Igreja Batista Maranata"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10 h-32 w-32 rounded-full object-cover shadow-xl ring-1 ring-primary/10 md:h-40 md:w-40"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground"
        >
          Bem-vindo
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="font-serif text-3xl font-medium leading-[1.15] text-primary md:text-5xl lg:text-6xl"
        >
          Uma igreja bíblica,
          <br />
          <span className="italic text-primary/80">à moda antiga</span>,
          <br />
          com o objetivo de glorificar a Deus
          <br />e edificar as famílias.
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-12 h-px w-16 bg-primary/40"
        />
      </div>
    </section>
  );
}
