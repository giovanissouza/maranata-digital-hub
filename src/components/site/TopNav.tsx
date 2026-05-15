import logo from "@/assets/logo-maranata.jpg";

const navItems = [
  { href: "#top", label: "Início" },
  { href: "#horarios", label: "Horários" },
  { href: "#sobre", label: "Sobre" },
  { href: "#ministerios", label: "Ministérios" },
  { href: "#estrutura", label: "Estrutura" },
  { href: "#oracao", label: "Oração" },
];

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-primary/15 bg-white/95 backdrop-blur-2xl shadow-[0_25px_80px_rgba(15,23,42,0.12)]">
      <div className="mx-auto flex w-full max-w-8xl items-center justify-between gap-4 px-6 py-4">
        <a
          href="#top"
          className="flex items-center gap-3 rounded-full border border-primary bg-primary px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:shadow-lg"
        >
          <img src={logo} alt="Logo Maranata" className="h-11 w-11 rounded-full border-2 border-white object-cover" />
          <span className="hidden sm:inline">Igreja Batista Maranata</span>
        </a>

        <nav className="flex flex-1 items-center justify-center gap-3 overflow-x-auto text-sm font-semibold text-primary">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full border border-primary/20 bg-primary/8 px-5 py-3 text-primary transition hover:border-primary hover:bg-primary/15 hover:text-primary/90"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#oracao"
          className="hidden rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-600 md:inline-flex"
        >
          Pedido de Oração
        </a>
      </div>
    </header>
  );
}
