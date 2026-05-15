import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CrudTable } from "@/components/admin/CrudTable";
import { uploadImage } from "@/lib/storage";
import { toast } from "sonner";
import { LogOut, ExternalLink, Upload, Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

const TABS = [
  { id: "avisos", label: "Avisos" },
  { id: "horarios", label: "Horários" },
  { id: "ministerios", label: "Ministérios" },
  { id: "estrutura", label: "Estrutura" },
  { id: "sobre", label: "Sobre Nós" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function AdminPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<TabId>("avisos");

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate({ to: "/login" });
    });
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate({ to: "/login" });
      else setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Painel</p>
            <h1 className="font-serif text-2xl text-primary">Maranata · Admin</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-xs uppercase tracking-widest hover:bg-accent"
            >
              <ExternalLink className="h-3 w-3" /> Ver site
            </Link>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                navigate({ to: "/login" });
              }}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-xs uppercase tracking-widest text-primary-foreground hover:bg-primary/90"
            >
              <LogOut className="h-3 w-3" /> Sair
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-6 overflow-x-auto px-6 pb-3 text-sm">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative pb-2 transition ${
                tab === t.id
                  ? "text-primary after:absolute after:-bottom-px after:left-0 after:h-px after:w-full after:bg-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {tab === "avisos" && (
          <CrudTable
            table="avisos"
            title="Avisos"
            fields={[
              { key: "titulo", label: "Título" },
              { key: "resumo", label: "Resumo" },
              { key: "texto_completo", label: "Texto completo", type: "textarea" },
              { key: "ordem", label: "Ordem", type: "number" },
            ]}
          />
        )}
        {tab === "horarios" && (
          <CrudTable
            table="horarios"
            title="Horários"
            hasImage={false}
            fields={[
              { key: "dia_semana", label: "Dia da semana", placeholder: "Domingo" },
              { key: "hora", label: "Hora", placeholder: "19:30" },
              { key: "nome_evento", label: "Nome do evento" },
              { key: "descricao", label: "Descrição", type: "textarea" },
              { key: "destaque_ceia", label: "Destacar Ceia (1º Domingo)", type: "checkbox" },
              { key: "ordem", label: "Ordem", type: "number" },
            ]}
          />
        )}
        {tab === "ministerios" && (
          <CrudTable
            table="ministerios"
            title="Ministérios"
            fields={[
              { key: "nome", label: "Nome" },
              { key: "descricao", label: "Descrição", type: "textarea" },
              { key: "ordem", label: "Ordem", type: "number" },
            ]}
          />
        )}
        {tab === "estrutura" && (
          <CrudTable
            table="estrutura"
            title="Estrutura"
            fields={[
              { key: "nome", label: "Nome" },
              { key: "descricao", label: "Descrição", type: "textarea" },
              { key: "ordem", label: "Ordem", type: "number" },
            ]}
          />
        )}
        {tab === "sobre" && <SobreEditor />}
      </main>
    </div>
  );
}

function SobreEditor() {
  const [id, setId] = useState<string | null>(null);
  const [texto, setTexto] = useState("");
  const [imagem, setImagem] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    supabase
      .from("sobre_nos")
      .select("*")
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setId(data.id);
          setTexto(data.texto_historia);
          setImagem(data.url_imagem_principal);
        }
      });
  }, []);

  const save = async () => {
    setSaving(true);
    const payload = {
      texto_historia: texto,
      url_imagem_principal: imagem,
      atualizado_em: new Date().toISOString(),
    };
    const { error } = id
      ? await supabase.from("sobre_nos").update(payload).eq("id", id)
      : await supabase
          .from("sobre_nos")
          .insert(payload)
          .select()
          .single()
          .then((r) => {
            if (r.data) setId(r.data.id);
            return r;
          });
    if (error) toast.error(error.message);
    else toast.success("Salvo");
    setSaving(false);
  };

  const onUpload = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadImage(file, "sobre_nos");
      setImagem(url);
      toast.success("Imagem carregada — clique em Salvar");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erro");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="font-serif text-2xl text-primary">Sobre Nós</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-[200px_1fr]">
        <div>
          {imagem ? (
            <img src={imagem} alt="" className="aspect-[4/5] w-full rounded object-cover" />
          ) : (
            <div className="aspect-[4/5] w-full rounded bg-muted" />
          )}
          <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded border border-border px-3 py-2 text-xs hover:bg-accent">
            {uploading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Upload className="h-3 w-3" />}
            Enviar foto
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onUpload(f);
                e.target.value = "";
              }}
            />
          </label>
        </div>
        <div>
          <label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
            Texto da história
          </label>
          <textarea
            rows={14}
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-sm leading-relaxed"
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={save}
          disabled={saving}
          className="rounded-md bg-primary px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
        >
          {saving ? "Salvando..." : "Salvar alterações"}
        </button>
      </div>
    </div>
  );
}
