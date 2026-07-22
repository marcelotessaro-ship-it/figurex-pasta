import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { StickerMagnifier } from './StickerMagnifier';
import { Sticker, User, UserCollectionItem, AlbumCategory, StickerRarity } from '../types';
import {
  ShoppingBag,
  PlusCircle,
  BookOpen,
  Trophy,
  Search,
  Filter,
  Flame,
  CheckCircle2,
  DollarSign,
  Layers,
  Sparkles,
  ShieldCheck,
  Plus,
  X,
  Tag,
  AlertCircle,
  Clock,
  RotateCcw,
} from 'lucide-react';

interface CollectorDashboardProps {
  currentUser: User;
  stickers: Sticker[];
  userCollection: UserCollectionItem[];
  onBuySticker: (sticker: Sticker) => void;
  onCreateListing: (newSticker: Omit<Sticker, 'id' | 'createdAt' | 'likesCount'>) => void;
  onNavigateToAdmin: () => void;
  onAddToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, desc?: string) => void;
}

export const CollectorDashboard: React.FC<CollectorDashboardProps> = ({
  currentUser,
  stickers,
  userCollection,
  onBuySticker,
  onCreateListing,
  onNavigateToAdmin,
  onAddToast,
}) => {
  const [activeTab, setActiveTab] = useState<'market' | 'my-listings' | 'collection'>('market');
  const [selectedAlbumFilter, setSelectedAlbumFilter] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [rarityFilter, setRarityFilter] = useState<string>('Todas');

  // Modal for New Listing Form
  const [isNewListingModalOpen, setIsNewListingModalOpen] = useState(false);
  const [newStickerName, setNewStickerName] = useState('');
  const [newAlbum, setNewAlbum] = useState<AlbumCategory>('Copa do Mundo 2026');
  const [newNumber, setNewNumber] = useState<number>(10);
  const [newRarity, setNewRarity] = useState<StickerRarity>('Rara');
  const [newPrice, setNewPrice] = useState<number>(25.0);
  const [newDescription, setNewDescription] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  // Filtering Market Items
  const availableListings = stickers.filter((s) => s.status === 'available');

  const filteredMarketListings = availableListings.filter((s) => {
    const matchesAlbum = selectedAlbumFilter === 'Todos' || s.album === selectedAlbumFilter;
    const matchesRarity = rarityFilter === 'Todas' || s.rarity === rarityFilter;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.number.toString().includes(searchQuery);
    return matchesAlbum && matchesRarity && matchesSearch;
  });

  // User's own listings
  const myOwnListings = stickers.filter((s) => s.sellerId === currentUser.id);

  // Form submit for new listing
  const handleCreateListingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newStickerName.trim()) {
      onAddToast('warning', 'Atenção', 'Informe o nome da figurinha.');
      return;
    }

    const imageUrlToUse =
      newImageUrl.trim() ||
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=80';

    onCreateListing({
      number: newNumber,
      name: newStickerName,
      album: newAlbum,
      rarity: newRarity,
      price: Number(newPrice),
      sellerId: currentUser.id,
      sellerName: currentUser.name,
      sellerAvatar: currentUser.avatar,
      description: newDescription || 'Figurinha em excelente estado para colecionadores.',
      imageUrl: imageUrlToUse,
      status: 'pending_approval',
    });

    onAddToast(
      'success',
      'Anúncio Enviado!',
      'Sua figurinha foi enviada para moderação administrativa.'
    );

    // Reset Form
    setNewStickerName('');
    setNewPrice(25.0);
    setNewDescription('');
    setNewImageUrl('');
    setIsNewListingModalOpen(false);
  };

  const albumList: AlbumCategory[] = [
    'Copa do Mundo 2026',
    'Anime Legends',
    'Pop & Rock Superstars',
    'Lendas do Futebol',
    'E-Sports Champions',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* ADMIN SHORTCUT BANNER FOR ADMIN USER */}
      {currentUser.role === 'admin' && (
        <GlassCard variant="gradient" className="p-4 flex items-center justify-between border-amber-500/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30">
              <ShieldCheck className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Modo Administrador Ativo</h4>
              <p className="text-xs text-slate-300">
                Você tem permissão para acessar o Painel Administrativo do sistema.
              </p>
            </div>
          </div>
          <button
            onClick={onNavigateToAdmin}
            className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition-all shadow-lg shadow-rose-500/20 border border-white/20"
          >
            Abrir Painel Admin
          </button>
        </GlassCard>
      )}

      {/* DASHBOARD SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <GlassCard variant="hover" glowColor="magenta" className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Minha Coleção</span>
            <Trophy className="w-5 h-5 text-rose-400" />
          </div>
          <p className="text-3xl font-black text-white mt-2">{userCollection.length}</p>
          <p className="text-[11px] text-slate-300 mt-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-300" />
            Figurinhas Coladas
          </p>
        </GlassCard>

        <GlassCard variant="hover" glowColor="yellow" className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Anúncios Ativos</span>
            <Tag className="w-5 h-5 text-amber-300" />
          </div>
          <p className="text-3xl font-black text-white mt-2">{myOwnListings.length}</p>
          <p className="text-[11px] text-amber-300 mt-1">Anúncios na loja</p>
        </GlassCard>

        <GlassCard variant="hover" glowColor="green" className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Saldo Disponível</span>
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-black text-emerald-400 mt-2">R$ {currentUser.balance.toFixed(2)}</p>
          <p className="text-[11px] text-slate-300 mt-1">Carteira digital FigureX</p>
        </GlassCard>
      </div>

      {/* DASHBOARD TAB NAVIGATION BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-panel p-2 rounded-2xl border border-white/15">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('market')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'market'
                ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-lg border border-white/20'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-amber-300" />
            <span>Mercado de Figurinhas</span>
          </button>

          <button
            onClick={() => setActiveTab('my-listings')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'my-listings'
                ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-lg border border-white/20'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Tag className="w-4 h-4 text-rose-400" />
            <span>Meus Anúncios ({myOwnListings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('collection')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'collection'
                ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-lg border border-white/20'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Minha Coleção</span>
          </button>
        </div>

        {/* Action Button for New Listing */}
        <button
          onClick={() => setIsNewListingModalOpen(true)}
          className="glass-button-primary px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg"
        >
          <PlusCircle className="w-4 h-4 text-amber-300" />
          <span>Criar Novo Anúncio</span>
        </button>
      </div>

      {/* TAB 1: MARKETPLACE TAB */}
      {activeTab === 'market' && (
        <div className="space-y-6">
          {/* Filters & Search */}
          <GlassCard className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar figurinha por nome, vendedor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full glass-input pl-10 pr-4 py-2 rounded-xl text-xs"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={selectedAlbumFilter}
                onChange={(e) => setSelectedAlbumFilter(e.target.value)}
                className="glass-input px-3 py-2 rounded-xl text-xs bg-slate-900/90 text-white"
              >
                <option value="Todos">Todos os Álbuns</option>
                {albumList.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>

              <select
                value={rarityFilter}
                onChange={(e) => setRarityFilter(e.target.value)}
                className="glass-input px-3 py-2 rounded-xl text-xs bg-slate-900/90 text-white"
              >
                <option value="Todas">Todas as Raridades</option>
                <option value="Lendária">Lendária</option>
                <option value="Épica">Épica</option>
                <option value="Rara">Rara</option>
                <option value="Comum">Comum</option>
              </select>
            </div>
          </GlassCard>

          {/* Grid of Market Stickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMarketListings.map((sticker) => (
              <GlassCard
                key={sticker.id}
                variant="hover"
                className="flex flex-col justify-between p-5 space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
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
                    <span className="text-[11px] font-semibold text-slate-300 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                      Nº {sticker.number}
                    </span>
                  </div>

                  <StickerMagnifier
                    src={sticker.imageUrl}
                    alt={sticker.name}
                    className="aspect-square rounded-xl mb-3 border border-white/15 bg-slate-950"
                    zoomLevel={2.5}
                  />

                  <h4 className="font-bold text-white text-base leading-snug line-clamp-1">{sticker.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{sticker.album}</p>

                  <div className="mt-2 flex items-center gap-2 pt-2 border-t border-white/10">
                    <img
                      src={
                        sticker.sellerAvatar ||
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
                      }
                      alt={sticker.sellerName}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="text-[11px] text-slate-300 truncate">
                      Vendedor: {sticker.sellerName}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase font-semibold text-slate-400">Preço</p>
                    <p className="text-lg font-black text-emerald-400">R$ {sticker.price.toFixed(2)}</p>
                  </div>

                  <button
                    onClick={() => onBuySticker(sticker)}
                    className="glass-button-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md"
                  >
                    <span>Comprar</span>
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>

          {filteredMarketListings.length === 0 && (
            <GlassCard className="py-12 text-center text-slate-300 space-y-2">
              <p>Nenhum anúncio disponível com os filtros atuais.</p>
            </GlassCard>
          )}
        </div>
      )}

      {/* TAB 2: MY OWN LISTINGS */}
      {activeTab === 'my-listings' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Meus Anúncios Publicados</h3>
            <button
              onClick={() => setIsNewListingModalOpen(true)}
              className="glass-button-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Anunciar Figurinha
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myOwnListings.map((stk) => (
              <GlassCard key={stk.id} className="p-5 flex gap-4 items-center">
                <StickerMagnifier
                  src={stk.imageUrl}
                  alt={stk.name}
                  className="w-20 h-20 rounded-xl border border-white/20 shrink-0 bg-slate-950"
                  zoomLevel={2.5}
                  showBadge={false}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        stk.status === 'available'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : stk.status === 'pending_approval'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {stk.status === 'available'
                        ? 'Ativo'
                        : stk.status === 'pending_approval'
                        ? 'Pendente Moderação'
                        : 'Recusado/Vendido'}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-sm truncate">{stk.name}</h4>
                  <p className="text-xs text-slate-400">{stk.album}</p>
                  <p className="text-sm font-black text-emerald-400 mt-1">R$ {stk.price.toFixed(2)}</p>
                </div>
              </GlassCard>
            ))}

            {myOwnListings.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-300">
                <p className="text-sm">Você ainda não possui anúncios ativos.</p>
                <button
                  onClick={() => setIsNewListingModalOpen(true)}
                  className="mt-3 glass-button-primary px-5 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" /> Criar Primeiro Anúncio
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: MY ALBUM COLLECTION */}
      {activeTab === 'collection' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">Álbum Virtual Interativo</h3>
              <p className="text-xs text-slate-400">Visualize as figurinhas coladas na sua coleção oficial</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-300 font-bold">Álbum:</span>
              <select
                value={selectedAlbumFilter}
                onChange={(e) => setSelectedAlbumFilter(e.target.value)}
                className="glass-input px-3 py-2 rounded-xl text-xs bg-slate-900 text-white"
              >
                <option value="Todos">Todos os Álbuns</option>
                {albumList.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid of Album Slots (1 to 12 simulation) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((slotNum) => {
              const gluedItem = userCollection.find(
                (item) => item.stickerNumber === slotNum && item.isGlued
              );

              return (
                <GlassCard
                  key={slotNum}
                  variant={gluedItem ? 'gradient' : 'subtle'}
                  className={`aspect-[3/4] flex flex-col justify-between p-3 relative border ${
                    gluedItem ? 'border-amber-400/40' : 'border-dashed border-white/20'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                    <span>SLOT</span>
                    <span className="bg-white/10 px-1.5 py-0.5 rounded">#{slotNum}</span>
                  </div>

                  {gluedItem ? (
                    <div className="flex-1 my-2 flex flex-col items-center justify-center text-center">
                      <StickerMagnifier
                        src={gluedItem.imageUrl}
                        alt={gluedItem.stickerName}
                        className="w-full h-24 rounded-lg border border-white/20 mb-1 bg-slate-950"
                        zoomLevel={2.5}
                        showBadge={false}
                      />
                      <p className="text-[11px] font-bold text-white line-clamp-1">{gluedItem.stickerName}</p>
                      <span className="text-[9px] text-amber-300 font-bold uppercase">★ Colada</span>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40 hover:opacity-70 transition-opacity cursor-pointer">
                      <Sparkles className="w-8 h-8 text-slate-500 mb-1" />
                      <p className="text-[10px] text-slate-400 font-bold">FALTANTE</p>
                    </div>
                  )}
                </GlassCard>
              );
            })}
          </div>
        </div>
      )}

      {/* MODAL: NEW LISTING FORM */}
      {isNewListingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <GlassCard variant="gradient" className="w-full max-w-lg p-6 space-y-5 border border-white/30 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-amber-300" />
                <h3 className="text-lg font-extrabold text-white">Criar Anúncio de Figurinha</h3>
              </div>
              <button
                onClick={() => setIsNewListingModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateListingSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-200">Nome da Figurinha</label>
                <input
                  type="text"
                  placeholder="ex: Neymar Jr. Gold Holográfico"
                  value={newStickerName}
                  onChange={(e) => setNewStickerName(e.target.value)}
                  className="w-full glass-input px-3 py-2.5 rounded-xl text-xs mt-1"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-200">Álbum</label>
                  <select
                    value={newAlbum}
                    onChange={(e) => setNewAlbum(e.target.value as AlbumCategory)}
                    className="w-full glass-input px-3 py-2.5 rounded-xl text-xs mt-1 bg-slate-900 text-white"
                  >
                    {albumList.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-200">Número no Álbum</label>
                  <input
                    type="number"
                    min="1"
                    max="999"
                    value={newNumber}
                    onChange={(e) => setNewNumber(Number(e.target.value))}
                    className="w-full glass-input px-3 py-2.5 rounded-xl text-xs mt-1"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-200">Raridade</label>
                  <select
                    value={newRarity}
                    onChange={(e) => setNewRarity(e.target.value as StickerRarity)}
                    className="w-full glass-input px-3 py-2.5 rounded-xl text-xs mt-1 bg-slate-900 text-white"
                  >
                    <option value="Comum">Comum</option>
                    <option value="Rara">Rara</option>
                    <option value="Épica">Épica</option>
                    <option value="Lendária">Lendária</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-200">Preço Desejado (R$)</label>
                  <input
                    type="number"
                    step="0.50"
                    min="1"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full glass-input px-3 py-2.5 rounded-xl text-xs mt-1"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-200">URL da Imagem da Figurinha</label>
                <input
                  type="url"
                  placeholder="https://exemplo.com/minha-figurinha.jpg"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full glass-input px-3 py-2.5 rounded-xl text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-200">Descrição / Estado de Conservação</label>
                <textarea
                  rows={2}
                  placeholder="Ex: Figurinha novíssima tirada de pacote fechado."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full glass-input p-3 rounded-xl text-xs mt-1"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewListingModalOpen(false)}
                  className="glass-button-secondary px-4 py-2 rounded-xl text-xs font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="glass-button-primary px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Publicar Anúncio</span>
                </button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}
    </div>
  );
};
