import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { AvisosCarousel } from "@/components/site/AvisosCarousel";
import { Horarios } from "@/components/site/Horarios";
import { SobreNos } from "@/components/site/SobreNos";
import { CardsGrid } from "@/components/site/CardsGrid";
import { YoutubeBanner } from "@/components/site/YoutubeBanner";
import { PedidoOracao } from "@/components/site/PedidoOracao";
import { TopNav } from "@/components/site/TopNav";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main>
      <TopNav />
      <Hero />
      <AvisosCarousel />
      <Horarios />
      <SobreNos />
      <CardsGrid table="ministerios" id="ministerios" eyebrow="Comunhão" title="Ministérios" />
      <CardsGrid table="estrutura" id="estrutura" eyebrow="Acolhimento" title="Nossa Estrutura" />
      <YoutubeBanner />
      <PedidoOracao />
    </main>
  );
}
