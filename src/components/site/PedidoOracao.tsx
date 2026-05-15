import { useState } from "react";
import { Send } from "lucide-react";

const WHATSAPP_NUMBER = "5511999999999"; // editar conforme necessário

export function PedidoOracao() {
  const [nome, setNome] = useState("");
  const [pedido, setPedido] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `*Pedido de Oração*%0A%0ANome: ${encodeURIComponent(nome)}%0A%0A${encodeURIComponent(pedido)}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <footer id="oracao" className="bg-primary/5">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="surface-card p-10">
          <header className="mb-12 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary/80">Contato</p>
            <h2 className="font-serif text-4xl font-bold text-primary md:text-5xl">Pedido de Oração</h2>
            <div className="mx-auto mt-6 h-px w-16 bg-primary/30" />
            <p className="mt-6 text-muted-foreground">
              Envie o seu pedido e nossa equipe pastoral orará por você.
            </p>
          </header>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              required
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full rounded-[1.5rem] border border-primary/20 bg-white px-5 py-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <textarea
              required
              placeholder="Escreva seu pedido de oração..."
              value={pedido}
              onChange={(e) => setPedido(e.target.value)}
              rows={5}
              className="w-full rounded-[1.5rem] border border-primary/20 bg-white px-5 py-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold uppercase tracking-widest text-white shadow-lg transition hover:bg-blue-600"
            >
              <Send className="h-4 w-4" />
              Enviar via WhatsApp
            </button>
          </form>
          <div className="mt-20 border-t border-primary/20 pt-8 text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
            © {new Date().getFullYear()} Igreja Batista Maranata
          </div>
        </div>
      </div>
    </footer>
  );
}
