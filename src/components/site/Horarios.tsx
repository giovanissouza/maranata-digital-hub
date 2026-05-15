import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles } from "lucide-react";
import { motion } from "motion/react";

type Horario = {
  id: string;
  dia_semana: string;
  hora: string;
  nome_evento: string;
  descricao: string | null;
  destaque_ceia: boolean;
};

export function Horarios() {
  const [horarios, setHorarios] = useState<Horario[]>([]);
  useEffect(() => {
    supabase
      .from("horarios")
      .select("*")
      .order("ordem")
      .then(({ data }) => setHorarios((data as Horario[]) ?? []));
  }, []);

  return (
    <section id="horarios" className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <header className="mb-16 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">Reuniões</p>
          <h2 className="font-serif text-4xl text-primary md:text-5xl">Nossos Horários</h2>
          <div className="mx-auto mt-6 h-px w-12 bg-primary/40" />
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {horarios.map((h, i) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`relative rounded-lg border p-8 transition ${
                h.destaque_ceia
                  ? "border-[var(--gold)]/40 bg-gradient-to-br from-[var(--gold)]/10 to-transparent"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              {h.destaque_ceia && (
                <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--gold)]/15 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-[oklch(0.45_0.1_80)]">
                  <Sparkles className="h-3 w-3" />
                  Ceia · 1º Domingo
                </div>
              )}
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {h.dia_semana}
              </p>
              <p className="mt-3 font-serif text-5xl text-primary">{h.hora}</p>
              <h3 className="mt-4 text-lg font-medium text-foreground">{h.nome_evento}</h3>
              {h.descricao && (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.descricao}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
