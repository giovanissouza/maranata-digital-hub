import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ImagePlaceholder } from "./Placeholder";
import { motion } from "motion/react";

type Sobre = { texto_historia: string; url_imagem_principal: string | null };

export function SobreNos() {
  const [sobre, setSobre] = useState<Sobre | null>(null);
  useEffect(() => {
    supabase
      .from("sobre_nos")
      .select("texto_historia,url_imagem_principal")
      .limit(1)
      .maybeSingle()
      .then(({ data }) => setSobre(data as Sobre | null));
  }, []);

  return (
    <section id="sobre" className="bg-background">
      <div className="mx-auto grid max-w-8xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="aspect-[4/5] overflow-hidden rounded-[2rem] surface-card"
        >
          {sobre?.url_imagem_principal ? (
            <img
              src={sobre.url_imagem_principal}
              alt="Igreja Batista Maranata"
              className="h-full w-full object-cover"
            />
          ) : (
            <ImagePlaceholder label="Nossa Igreja" />
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-panel rounded-[2rem] p-8"
        >
          <p className="section-lead mb-3 text-xs uppercase tracking-[0.3em]">Sobre Nós</p>
          <h2 className="font-serif text-4xl text-primary md:text-5xl">Nossa História</h2>
          <div className="mt-6 h-px w-12 bg-primary/40" />
          <p className="mt-8 whitespace-pre-line text-base leading-relaxed text-foreground/80">
            {sobre?.texto_historia ?? "Carregando..."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
