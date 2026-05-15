import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ImagePlaceholder } from "./Placeholder";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type Aviso = {
  id: string;
  titulo: string;
  resumo: string;
  texto_completo: string | null;
  url_imagem: string | null;
};

export function AvisosCarousel() {
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    supabase
      .from("avisos")
      .select("id,titulo,resumo,texto_completo,url_imagem")
      .order("ordem")
      .order("criado_em", { ascending: false })
      .then(({ data }) => setAvisos((data as Aviso[]) ?? []));
  }, []);

  useEffect(() => {
    if (avisos.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % avisos.length), 6000);
    return () => clearInterval(t);
  }, [avisos.length]);

  if (avisos.length === 0) return null;
  const aviso = avisos[idx];

  return (
    <section className="border-y border-border/60 bg-background">
      <div className="mx-auto max-w-8xl px-6 py-16">
        <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Avisos
        </p>
        <div className="surface-card p-8">
          <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
            <div className="aspect-[4/3] overflow-hidden rounded-[1.5rem]">
              {aviso.url_imagem ? (
                <img src={aviso.url_imagem} alt={aviso.titulo} className="h-full w-full object-cover" />
              ) : (
                <ImagePlaceholder label="Aviso" />
              )}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={aviso.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="font-serif text-3xl text-primary md:text-4xl">{aviso.titulo}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{aviso.resumo}</p>
                {aviso.texto_completo && (
                  <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-foreground/80">
                    {aviso.texto_completo}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {avisos.length > 1 && (
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={() => setIdx((i) => (i - 1 + avisos.length) % avisos.length)}
              className="rounded-full border border-border p-2 transition hover:bg-accent"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {avisos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`h-1.5 transition-all ${i === idx ? "w-8 bg-primary" : "w-2 bg-border"}`}
                  aria-label={`Ir para aviso ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setIdx((i) => (i + 1) % avisos.length)}
              className="rounded-full border border-border p-2 transition hover:bg-accent"
              aria-label="Próximo"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
