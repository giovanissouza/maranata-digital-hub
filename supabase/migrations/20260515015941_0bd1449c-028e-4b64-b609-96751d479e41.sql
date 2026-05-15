
-- AVISOS
CREATE TABLE public.avisos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  resumo TEXT NOT NULL,
  texto_completo TEXT,
  url_imagem TEXT,
  ordem INT NOT NULL DEFAULT 0,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.avisos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Avisos public read" ON public.avisos FOR SELECT USING (true);
CREATE POLICY "Avisos auth insert" ON public.avisos FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Avisos auth update" ON public.avisos FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Avisos auth delete" ON public.avisos FOR DELETE TO authenticated USING (true);

-- HORARIOS
CREATE TABLE public.horarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dia_semana TEXT NOT NULL,
  hora TEXT NOT NULL,
  nome_evento TEXT NOT NULL,
  descricao TEXT,
  destaque_ceia BOOLEAN NOT NULL DEFAULT false,
  ordem INT NOT NULL DEFAULT 0,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.horarios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Horarios public read" ON public.horarios FOR SELECT USING (true);
CREATE POLICY "Horarios auth insert" ON public.horarios FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Horarios auth update" ON public.horarios FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Horarios auth delete" ON public.horarios FOR DELETE TO authenticated USING (true);

-- MINISTERIOS
CREATE TABLE public.ministerios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  descricao TEXT NOT NULL,
  url_imagem TEXT,
  ordem INT NOT NULL DEFAULT 0,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.ministerios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Ministerios public read" ON public.ministerios FOR SELECT USING (true);
CREATE POLICY "Ministerios auth insert" ON public.ministerios FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Ministerios auth update" ON public.ministerios FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Ministerios auth delete" ON public.ministerios FOR DELETE TO authenticated USING (true);

-- ESTRUTURA
CREATE TABLE public.estrutura (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  descricao TEXT NOT NULL,
  url_imagem TEXT,
  ordem INT NOT NULL DEFAULT 0,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.estrutura ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Estrutura public read" ON public.estrutura FOR SELECT USING (true);
CREATE POLICY "Estrutura auth insert" ON public.estrutura FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Estrutura auth update" ON public.estrutura FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Estrutura auth delete" ON public.estrutura FOR DELETE TO authenticated USING (true);

-- SOBRE NOS (singleton)
CREATE TABLE public.sobre_nos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  texto_historia TEXT NOT NULL,
  url_imagem_principal TEXT,
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.sobre_nos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Sobre public read" ON public.sobre_nos FOR SELECT USING (true);
CREATE POLICY "Sobre auth insert" ON public.sobre_nos FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Sobre auth update" ON public.sobre_nos FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Sobre auth delete" ON public.sobre_nos FOR DELETE TO authenticated USING (true);

-- Storage bucket público
INSERT INTO storage.buckets (id, name, public) VALUES ('church-media', 'church-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Church media public read" ON storage.objects FOR SELECT USING (bucket_id = 'church-media');
CREATE POLICY "Church media auth insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'church-media');
CREATE POLICY "Church media auth update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'church-media');
CREATE POLICY "Church media auth delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'church-media');

-- Seeds iniciais
INSERT INTO public.horarios (dia_semana, hora, nome_evento, descricao, destaque_ceia, ordem) VALUES
  ('Domingo', '09:00', 'Escola Bíblica Dominical', 'Estudo bíblico para todas as idades', false, 1),
  ('Domingo', '19:30', 'Culto da Noite', 'Culto de adoração e pregação da Palavra', true, 2),
  ('Quarta-feira', '19:30', 'Culto de Oração e Estudo', 'Estudo bíblico e oração no meio da semana', false, 3),
  ('Sábado', '19:30', 'Culto Jovem', 'Culto especial dedicado aos jovens', false, 4);

INSERT INTO public.ministerios (nome, descricao, ordem) VALUES
  ('Evangelismo', 'Levando a mensagem do Evangelho a todas as pessoas, em obediência à Grande Comissão.', 1),
  ('Berçário', 'Cuidado amoroso e seguro para os menorzinhos durante os cultos.', 2),
  ('Crianças', 'Ensino bíblico adaptado para a infância, formando corações para Cristo desde cedo.', 3),
  ('Juniores', 'Discipulado dedicado aos pré-adolescentes, firmando-os na Palavra.', 4),
  ('Jovens', 'Comunhão, estudo bíblico e culto jovem aos sábados às 19:30.', 5),
  ('Casais', 'Edificação de famílias segundo os princípios bíblicos do casamento.', 6);

INSERT INTO public.estrutura (nome, descricao, ordem) VALUES
  ('Lactário com Trocador', 'Espaço reservado e confortável para mães cuidarem dos seus bebês.', 1),
  ('Banheiros', 'Banheiros amplos, limpos e acessíveis para toda a família.', 2),
  ('Salinhas Infantis', 'Ambientes preparados especialmente para o ensino bíblico das crianças.', 3);

INSERT INTO public.sobre_nos (texto_historia) VALUES
  ('A Igreja Batista Maranata é uma comunidade bíblica comprometida com a sã doutrina e com a edificação das famílias. Há anos pregamos a Palavra de Deus à moda antiga, sem modismos, com reverência e amor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
