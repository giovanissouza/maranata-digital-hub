import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Bem-vindo!");
        navigate({ to: "/admin" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
        toast.success("Conta criada! Verifique seu email.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero-bg flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-10 shadow-xl">
        <Link to="/" className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          ← Voltar
        </Link>
        <h1 className="mt-6 font-serif text-3xl text-primary">Painel Administrativo</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "signin" ? "Entre para gerenciar o site" : "Criar conta de administrador"}
        </p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-4 py-3 outline-none focus:border-primary"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-4 py-3 outline-none focus:border-primary"
          />
          <button
            disabled={loading}
            className="w-full rounded-md bg-primary px-6 py-3 text-sm font-medium uppercase tracking-widest text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60"
          >
            {loading ? "Aguarde..." : mode === "signin" ? "Entrar" : "Criar Conta"}
          </button>
        </form>
        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-6 w-full text-center text-xs uppercase tracking-widest text-muted-foreground hover:text-primary"
        >
          {mode === "signin" ? "Criar uma conta" : "Já tenho conta · Entrar"}
        </button>
      </div>
    </div>
  );
}
