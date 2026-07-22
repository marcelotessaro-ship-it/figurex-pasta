import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { StickerMagnifier } from './StickerMagnifier';
import { Sticker, User } from '../types';
import {
  Sparkles,
  ShoppingBag,
  PlusCircle,
  Trophy,
  Search,
  Filter,
  CheckCircle2,
  Zap,
  Flame,
  ArrowRight,
  ChevronRight,
  Star,
  Users,
  ShieldCheck,
} from 'lucide-react';

interface LandingPageProps {
  stickers: Sticker[];
  currentUser: User | null;
  onNavigateToLogin: () => void;
  onNavigateToCollector: () => void;
  onSelectSticker: (sticker: Sticker) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  stickers,
  currentUser,
  onNavigateToLogin,
  onNavigateToCollector,
  onSelectSticker,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'Todos',
    'Copa do Mundo 2026',
    'Anime Legends',
    'Pop & Rock Superstars',
    'Lendas do Futebol',
    'E-Sports Champions',
  ];

  const availableStickers = stickers.filter((s) => s.status === 'available');

  const filteredStickers = availableStickers.filter((s) => {
    const matchesCategory = selectedCategory === 'Todos' || s.album === selectedCategory;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.album.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rarity.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative overflow-hidden pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-12 md:pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-rose-500/30 text-rose-300 text-xs font-bold tracking-wider uppercase shadow-lg animate-pulse">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>O Maior Marketplace de Figurinhas Colecionáveis</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none">
              Colecione, Troque e{' '}
              <span className="bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
                Negocie Figurinhas Raríssimas
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              A plataforma definitiva para colecionadores de álbuns físicos e virtuais.
              Troque repetidas, encontre raridades holográficas e complete sua coleção com segurança em
              design Glassmorphism de alta tecnologia.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => {
                  if (currentUser) onNavigateToCollector();
                  else onNavigateToLogin();
                }}
                className="w-full sm:w-auto glass-button-primary px-8 py-4 rounded-2xl text-base font-extrabold flex items-center justify-center gap-3 group shadow-2xl"
              >
                <ShoppingBag className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" />
                <span>Explorar Mercado</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  if (currentUser) onNavigateToCollector();
                  else onNavigateToLogin();
                }}
                className="w-full sm:w-auto glass-button-secondary px-8 py-4 rounded-2xl text-base font-bold flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-5 h-5 text-emerald-400" />
                <span>Anunciar Figurinha</span>
              </button>
            </div>

            {/* Quick Stats */}
            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-black text-white">12.5k+</p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Figurinhas Ativas</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-black text-amber-300">R$ 148k</p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Volume Negociado</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-black text-emerald-400">99.8%</p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Satisfação</p>
              </div>
            </div>
          </div>

          {/* Hero Right Floating Glass Card Mockup */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Glowing ambient background circle */}
            <div className="absolute -inset-4 bg-gradient-to-r from-rose-500/20 via-amber-400/20 to-emerald-500/20 rounded-full blur-3xl opacity-70 pointer-events-none" />

            <div className="relative w-full max-w-sm">
              {/* Primary Floating Card */}
              <GlassCard
                variant="gradient"
                glowColor="magenta"
                className="p-6 rounded-3xl border border-white/30 shadow-2xl transform hover:rotate-1 transition-all duration-500"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="glass-badge-magenta px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    ★ Raríssima Lendária
                  </span>
                  <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    #001 Gold
                  </span>
                </div>

                <StickerMagnifier
                  src={stickers[0]?.imageUrl || '/src/assets/images/gold_trophy_sticker_1784675411588.jpg'}
                  alt="Sticker Preview"
                  className="aspect-square rounded-2xl mb-4 border border-white/20 bg-slate-950"
                  zoomLevel={2.5}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-white text-xs font-bold pointer-events-none">
                    <span className="bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                      Copa do Mundo 2026
                    </span>
                    <span className="flex items-center gap-1 text-amber-300">
                      <Star className="w-3.5 h-3.5 fill-amber-300" />
                      4.9
                    </span>
                  </div>
                </StickerMagnifier>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white leading-snug">
                    {stickers[0]?.name || 'Troféu de Ouro Campeões'}
                  </h3>
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">Preço de Mercado</p>
                      <p className="text-2xl font-black text-emerald-400">R$ 185,00</p>
                    </div>

                    <button
                      onClick={() => {
                        if (currentUser) onNavigateToCollector();
                        else onNavigateToLogin();
                      }}
                      className="glass-button-primary px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
                    >
                      <span>Garantir</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </GlassCard>

              {/* Secondary Overlapping Glass Badge */}
              <div className="absolute -bottom-6 -left-6 glass-panel p-4 rounded-2xl border border-white/20 shadow-2xl backdrop-blur-2xl flex items-center gap-3 animate-bounce">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-300 border border-amber-400/30">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Última Venda</p>
                  <p className="text-[11px] text-emerald-400 font-semibold">Anúncio aprovado há 2m</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION ("COMO FUNCIONA") */}
      <section id="como-funciona" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Passo a Passo
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Como Funciona a FigureX</h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Compre, venda e organize suas figurinhas em poucos cliques no marketplace mais rápido do Brasil.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <GlassCard variant="hover" glowColor="magenta" className="p-8 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-300 shadow-lg">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <span className="text-xs font-black text-rose-400 uppercase tracking-widest">01. Comprar</span>
            <h3 className="text-xl font-bold text-white">Encontre Figurinhas Raríssimas</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Procure pelo número ou nome da figurinha que falta no seu álbum. Filtre por raridade, preço e coleções exclusivas.
            </p>
          </GlassCard>

          {/* Card 2 */}
          <GlassCard variant="hover" glowColor="yellow" className="p-8 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shadow-lg">
              <PlusCircle className="w-7 h-7" />
            </div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest">02. Vender</span>
            <h3 className="text-xl font-bold text-white">Anuncie Suas Repetidas</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Publique anúncios em segundos com fotos, preços customizados e raridade. Receba o valor direto na sua carteira.
            </p>
          </GlassCard>

          {/* Card 3 */}
          <GlassCard variant="hover" glowColor="green" className="p-8 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shadow-lg">
              <Trophy className="w-7 h-7" />
            </div>
            <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">03. Colecionar</span>
            <h3 className="text-xl font-bold text-white">Cole no Álbum Digital</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Acompanhe seu progresso de coleção em tempo real com álbum virtual interativo e conquiste distintivos de colecionador.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* FEATURED STICKERS & MARKETPLACE EXPLORER */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Mercado em Tempo Real
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-2">Figurinhas & Álbuns em Destaque</h2>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar figurinha, número ou álbum..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-sm placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-lg border border-white/20'
                  : 'glass-button-secondary text-slate-300 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sticker Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredStickers.map((sticker) => (
            <GlassCard
              key={sticker.id}
              variant="hover"
              className="flex flex-col justify-between group cursor-pointer p-5"
              onClick={() => {
                onSelectSticker(sticker);
                if (!currentUser) onNavigateToLogin();
                else onNavigateToCollector();
              }}
            >
              <div>
                {/* Rarity & Album Tag */}
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                      sticker.rarity === 'Lendária'
                        ? 'glass-badge-magenta'
                        : sticker.rarity === 'Épica'
                        ? 'glass-badge-yellow'
                        : 'glass-badge-green'
                    }`}
                  >
                    {sticker.rarity}
                  </span>
                  <span className="text-slate-400 text-[11px] font-semibold bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                    Nº {sticker.number}
                  </span>
                </div>

                {/* Image Frame with Lupa / Magnifier */}
                <StickerMagnifier
                  src={sticker.imageUrl}
                  alt={sticker.name}
                  className="aspect-square rounded-xl mb-4 border border-white/15 bg-slate-950/80"
                  zoomLevel={2.5}
                >
                  <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] text-rose-300 font-bold flex items-center gap-1 border border-white/10 pointer-events-none">
                    <Flame className="w-3 h-3 text-rose-400" />
                    {sticker.likesCount}
                  </div>
                </StickerMagnifier>

                <h4 className="font-bold text-white text-base leading-snug line-clamp-1 group-hover:text-amber-300 transition-colors">
                  {sticker.name}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-1">{sticker.album}</p>
              </div>

              {/* Price & Buy Action */}
              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Valor</p>
                  <p className="text-lg font-black text-emerald-400">R$ {sticker.price.toFixed(2)}</p>
                </div>

                <button className="glass-button-primary px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1">
                  <span>Comprar</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </GlassCard>
          ))}
        </div>

        {filteredStickers.length === 0 && (
          <GlassCard className="text-center py-12 space-y-3">
            <p className="text-slate-300 text-base">Nenhuma figurinha encontrada nesta categoria ou busca.</p>
            <button
              onClick={() => {
                setSelectedCategory('Todos');
                setSearchQuery('');
              }}
              className="glass-button-secondary px-4 py-2 rounded-xl text-xs font-bold"
            >
              Limpar Filtros
            </button>
          </GlassCard>
        )}
      </section>

      {/* FOOTER */}
      <footer className="mt-20 border-t border-white/10 pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span className="text-xl font-black text-white">FigureX</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              O marketplace de figurinhas colecionáveis mais moderno do ecossistema.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Navegação</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="hover:text-white cursor-pointer" onClick={() => onNavigateToLogin()}>
                Login de Colecionador
              </li>
              <li className="hover:text-white cursor-pointer" onClick={() => onNavigateToLogin()}>
                Acesso Administrativo
              </li>
              <li className="hover:text-white cursor-pointer">Mercado de Figurinhas</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Segurança</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" /> Transações Protegidas
              </li>
              <li className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Moderação de Anúncios
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Suporte</h4>
            <p className="text-xs text-slate-400">Atendimento 24/7 para colecionadores e vendedores.</p>
            <p className="text-xs text-amber-300 font-bold mt-2">suporte@figurex.com</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 FigureX Inc. Todos os direitos reservados.</p>
          <p className="mt-2 sm:mt-0">Design Glassmorphism com React & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
};
