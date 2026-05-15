import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ImagePlaceholder } from "./Placeholder";
import { motion } from "motion/react";

type Item = { id: string; nome: string; descricao: string; url_imagem: string | null };

export function CardsGrid({
  table,
  eyebrow,
  title,
  id,
}: {
  table: "ministerios" | "estrutura";
  eyebrow: string;
  title: string;
  id: string;
}) {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    supabase
      .from(table)
      .select("id,nome,descricao,url_imagem")
      .order("ordem")
      .then(({ data }) => setItems((data as Item[]) ?? []));
  }, [table]);

  return (
    <section id={id} className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <header className="mb-16 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">{eyebrow}</p>
          <h2 className="font-serif text-4xl text-primary md:text-5xl">{title}</h2>
          <div className="mx-auto mt-6 h-px w-12 bg-primary/40" />
        </header>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.article
              key={it.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group overflow-hidden rounded-md border border-border bg-card transition hover:border-primary/30 hover:shadow-lg"
            >
              <div className="aspect-[4/3] overflow-hidden">
                {it.url_imagem ? (
                  <img
                    src={it.url_imagem}
                    alt={it.nome}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <ImagePlaceholder />
                )}
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl text-primary">{it.nome}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.descricao}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
