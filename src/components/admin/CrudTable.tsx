import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { uploadImage } from "@/lib/storage";
import { toast } from "sonner";
import { Trash2, Plus, Upload, Loader2 } from "lucide-react";

type Field = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "checkbox" | "number";
  placeholder?: string;
};

type Row = Record<string, unknown> & { id: string };

export function CrudTable({
  table,
  title,
  fields,
  hasImage = true,
  orderBy = "ordem",
}: {
  table: "avisos" | "horarios" | "ministerios" | "estrutura";
  title: string;
  fields: Field[];
  hasImage?: boolean;
  orderBy?: string;
}) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from(table).select("*").order(orderBy);
    if (error) toast.error(error.message);
    setRows((data as Row[]) ?? []);
    setLoading(false);
  };
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  const addNew = async () => {
    const blank: Record<string, unknown> = { ordem: rows.length };
    for (const f of fields) {
      blank[f.key] = f.type === "checkbox" ? false : "";
    }
    if (hasImage) blank.url_imagem = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from(table) as any).insert(blank);
    if (error) return toast.error(error.message);
    toast.success("Adicionado");
    load();
  };

  const update = async (id: string, patch: Record<string, unknown>) => {
    setRows((r) => r.map((x) => (x.id === id ? { ...x, ...patch } : x)));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from(table) as any).update(patch).eq("id", id);
    if (error) toast.error(error.message);
  };

  const remove = async (id: string) => {
    if (!confirm("Excluir este item?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Excluído");
    load();
  };

  const onUpload = async (id: string, file: File) => {
    setUploadingId(id);
    try {
      const url = await uploadImage(file, table);
      await update(id, { url_imagem: url });
      toast.success("Imagem enviada");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erro no upload");
    } finally {
      setUploadingId(null);
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <header className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-2xl text-primary">{title}</h2>
        <button
          onClick={addNew}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-xs font-medium uppercase tracking-widest text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-3.5 w-3.5" /> Novo
        </button>
      </header>
      {loading ? (
        <p className="text-sm text-muted-foreground">Carregando...</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhum item ainda.</p>
      ) : (
        <div className="space-y-6">
          {rows.map((row) => (
            <div key={row.id} className="rounded-md border border-border bg-background p-5">
              <div className="grid gap-4 md:grid-cols-2">
                {fields.map((f) => (
                  <div
                    key={f.key}
                    className={f.type === "textarea" ? "md:col-span-2" : ""}
                  >
                    <label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                      {f.label}
                    </label>
                    {f.type === "textarea" ? (
                      <textarea
                        rows={3}
                        value={(row[f.key] as string) ?? ""}
                        onBlur={(e) => update(row.id, { [f.key]: e.target.value })}
                        onChange={(e) =>
                          setRows((r) =>
                            r.map((x) => (x.id === row.id ? { ...x, [f.key]: e.target.value } : x)),
                          )
                        }
                        className="mt-1 w-full rounded border border-border bg-card px-3 py-2 text-sm"
                      />
                    ) : f.type === "checkbox" ? (
                      <div className="mt-2">
                        <input
                          type="checkbox"
                          checked={Boolean(row[f.key])}
                          onChange={(e) => update(row.id, { [f.key]: e.target.checked })}
                          className="h-4 w-4 accent-[var(--color-primary)]"
                        />
                      </div>
                    ) : (
                      <input
                        type={f.type ?? "text"}
                        value={(row[f.key] as string) ?? ""}
                        placeholder={f.placeholder}
                        onBlur={(e) => update(row.id, { [f.key]: e.target.value })}
                        onChange={(e) =>
                          setRows((r) =>
                            r.map((x) => (x.id === row.id ? { ...x, [f.key]: e.target.value } : x)),
                          )
                        }
                        className="mt-1 w-full rounded border border-border bg-card px-3 py-2 text-sm"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between gap-4 border-t border-border pt-4">
                {hasImage && (
                  <div className="flex items-center gap-3">
                    {row.url_imagem ? (
                      <img
                        src={row.url_imagem as string}
                        alt=""
                        className="h-14 w-14 rounded object-cover"
                      />
                    ) : (
                      <div className="h-14 w-14 rounded bg-muted" />
                    )}
                    <input
                      ref={(el) => {
                        fileRefs.current[row.id] = el;
                      }}
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) onUpload(row.id, file);
                        e.target.value = "";
                      }}
                    />
                    <button
                      onClick={() => fileRefs.current[row.id]?.click()}
                      disabled={uploadingId === row.id}
                      className="inline-flex items-center gap-1.5 rounded border border-border px-3 py-1.5 text-xs hover:bg-accent"
                    >
                      {uploadingId === row.id ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Upload className="h-3 w-3" />
                      )}
                      Enviar imagem
                    </button>
                    {Boolean(row.url_imagem) && (
                      <button
                        onClick={() => update(row.id, { url_imagem: null })}
                        className="text-xs text-muted-foreground hover:text-destructive"
                      >
                        remover
                      </button>
                    )}
                  </div>
                )}
                <button
                  onClick={() => remove(row.id)}
                  className="inline-flex items-center gap-1.5 rounded border border-destructive/30 px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-3 w-3" /> Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
