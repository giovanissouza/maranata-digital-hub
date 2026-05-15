import { motion } from "motion/react";
import logo from "@/assets/logo-maranata.jpg";

export function Hero() {
  return (
    <section id="top" className="hero-bg relative overflow-hidden">
      <div className="mx-auto flex min-h-screen max-w-8xl flex-col items-center justify-center gap-10 px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-10 rounded-[3rem] border border-white/20 bg-white/10 p-8 shadow-[0_45px_110px_rgba(15,23,42,0.18)] backdrop-blur-xl"
        >
          <motion.img
            src={logo}
            alt="Igreja Batista Maranata"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="h-48 w-48 rounded-full border-4 border-white object-cover shadow-2xl md:h-64 md:w-64"
          />
          <motion.div className="flex flex-col items-center gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="premium-pill"
            >
              Cultos · Família · Esperança
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.9 }}
              className="font-serif text-4xl font-bold leading-tight text-white drop-shadow-xl md:text-6xl lg:text-7xl"
            >
              Igreja Batista
              <br />
              <span className="italic text-blue-100">Maranata</span>
              <br />
              de Londrina
            </motion.h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-3xl text-base font-medium text-white/90 drop-shadow-lg md:text-xl"
          >
            Uma igreja bíblica, à moda antiga, com o objetivo de glorificar a Deus e edificar as famílias. Venha crescer em fé, comunidade e propósito.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="#horarios"
              className="inline-flex rounded-full border-2 border-white bg-white px-8 py-4 text-base font-bold text-primary shadow-lg transition hover:bg-blue-50"
            >
              Nossos Horários
            </a>
            <a
              href="#oracao"
              className="inline-flex rounded-full border-2 border-white bg-transparent px-8 py-4 text-base font-bold text-white transition hover:bg-white/15"
            >
              Pedido de Oração
            </a>
          </motion.div>
          <motion.div className="section-card-group w-full px-2 md:px-8">
            <div className="card-highlight text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">CULTOS</p>
              <h3 className="mt-4 text-xl font-bold text-white">Experiência transformadora</h3>
              <p className="mt-3 text-sm text-white/75">Encontros semanais com espírito vibrante e adoração genuína.</p>
            </div>
            <div className="card-highlight text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">FAMÍLIA</p>
              <h3 className="mt-4 text-xl font-bold text-white">Comunidade acolhedora</h3>
              <p className="mt-3 text-sm text-white/75">Ambiente seguro e afetuoso para todas as idades e histórias.</p>
            </div>
            <div className="card-highlight text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">MENSAGENS</p>
              <h3 className="mt-4 text-xl font-bold text-white">Palavra com profundidade</h3>
              <p className="mt-3 text-sm text-white/75">Estudos bíblicos e sermões que impactam o coração.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0c1f55] to-transparent opacity-80" />
    </section>
  );
}
