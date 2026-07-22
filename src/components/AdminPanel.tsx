import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import {
  User,
  Sticker,
  Permission,
  PlatformSettings,
  UserRole,
  UserStatus,
  ListingStatus,
} from '../types';
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Settings,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  UserX,
  UserCheck,
  Edit2,
  Trash2,
  Star,
  ChevronRight,
  ArrowLeft,
  Lock,
  Unlock,
  AlertTriangle,
  Layers,
  Sparkles,
  BarChart3,
  Check,
  Save,
  Tag,
} from 'lucide-react';

interface AdminPanelProps {
  currentUser: User;
  users: User[];
  stickers: Sticker[];
  permissions: Permission[];
  settings: PlatformSettings;
  onUpdateUserStatus: (userId: string, newStatus: UserStatus) => void;
  onUpdateUserRole: (userId: string, newRole: UserRole) => void;
  onUpdateStickerStatus: (stickerId: string, newStatus: ListingStatus, reason?: string) => void;
  onToggleStickerFeatured: (stickerId: string) => void;
  onSavePermissions: (updatedPermissions: Permission[]) => void;
  onSaveSettings: (updatedSettings: PlatformSettings) => void;
  onNavigateToCollector: () => void;
  onAddToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, desc?: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  currentUser,
  users,
  stickers,
  permissions,
  settings,
  onUpdateUserStatus,
  onUpdateUserRole,
  onUpdateStickerStatus,
  onToggleStickerFeatured,
  onSavePermissions,
  onSaveSettings,
  onNavigateToCollector,
  onAddToast,
}) => {
  const [adminTab, setAdminTab] = useState<
    'dashboard' | 'users' | 'moderation' | 'permissions' | 'settings'
  >('dashboard');

  // User Management State
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<'all' | 'admin' | 'colecionador'>('all');

  // Moderation State
  const [moderationSearch, setModerationSearch] = useState('');
  const [rejectionModalSticker, setRejectionModalSticker] = useState<Sticker | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  // Local state for editable Permissions & Settings
  const [localPermissions, setLocalPermissions] = useState<Permission[]>(permissions);
  const [localSettings, setLocalSettings] = useState<PlatformSettings>(settings);

  // Filter Users
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = userRoleFilter === 'all' || u.role === userRoleFilter;
    return matchesSearch && matchesRole;
  });

  // Filter Stickers for Moderation
  const pendingStickers = stickers.filter((s) => s.status === 'pending_approval');
  const allModeratedStickers = stickers.filter((s) =>
    s.name.toLowerCase().includes(moderationSearch.toLowerCase())
  );

  // Stats
  const totalVolume = stickers.reduce((acc, s) => acc + s.price, 0);

  const handleSavePermissionsSubmit = () => {
    onSavePermissions(localPermissions);
    onAddToast('success', 'Permissões Salvas', 'A matriz de acesso dos perfis foi atualizada.');
  };

  const handleSaveSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(localSettings);
    onAddToast('success', 'Configurações Atualizadas', 'As diretrizes da plataforma foram aplicadas.');
  };

  const handleRejectionConfirm = () => {
    if (!rejectionModalSticker) return;
    onUpdateStickerStatus(rejectionModalSticker.id, 'rejected', rejectionReason || 'Anúncio recusado.');
    onAddToast('info', 'Anúncio Recusado', `O anúncio "${rejectionModalSticker.name}" foi recusado.`);
    setRejectionModalSticker(null);
    setRejectionReason('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* ADMIN HEADER BANNER */}
      <GlassCard variant="gradient" className="p-6 border-rose-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-300 shadow-xl shrink-0">
            <ShieldCheck className="w-6 h-6 text-amber-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-white">Painel Administrativo FigureX</h2>
              <span className="glass-badge-magenta text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full">
                Controle Total
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Gerencie usuários, aprove anúncios no controle de tráfego e configure permissões
            </p>
          </div>
        </div>

        <button
          onClick={onNavigateToCollector}
          className="glass-button-secondary px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-white/20 hover:bg-white/20 transition-all self-start sm:self-auto"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400" />
          <span>Voltar para o Marketplace</span>
        </button>
      </GlassCard>

      {/* SIDEBAR NAVIGATION & MAIN CONTENT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* SIDEBAR NAVIGATION (3 COLS) */}
        <div className="lg:col-span-3 space-y-2">
          <GlassCard className="p-3 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 py-1 block">
              Módulos do Sistema
            </span>

            <button
              onClick={() => setAdminTab('dashboard')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition-all ${
                adminTab === 'dashboard'
                  ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-lg'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4 text-amber-300" />
                <span>Dashboard</span>
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setAdminTab('users')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition-all ${
                adminTab === 'users'
                  ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-lg'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-rose-400" />
                <span>Gestão de Usuários</span>
              </span>
              <span className="bg-white/10 text-white px-2 py-0.5 rounded-md text-[10px]">
                {users.length}
              </span>
            </button>

            <button
              onClick={() => setAdminTab('moderation')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition-all ${
                adminTab === 'moderation'
                  ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-lg'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Controle de Tráfego</span>
              </span>
              {pendingStickers.length > 0 ? (
                <span className="bg-rose-500 text-white px-2 py-0.5 rounded-full text-[10px] font-black animate-pulse">
                  {pendingStickers.length}
                </span>
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-500" />
              )}
            </button>

            <button
              onClick={() => setAdminTab('permissions')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition-all ${
                adminTab === 'permissions'
                  ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-lg'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Perfis de Acesso</span>
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setAdminTab('settings')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition-all ${
                adminTab === 'settings'
                  ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-lg'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Settings className="w-4 h-4 text-amber-300" />
                <span>Configurações</span>
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </GlassCard>
        </div>

        {/* MAIN ADMIN CONTENT AREA (9 COLS) */}
        <div className="lg:col-span-9 space-y-6">
          {/* SECTION 1: ADMIN DASHBOARD METRICS */}
          {adminTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <GlassCard variant="hover" glowColor="magenta" className="p-4">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Usuários Ativos</span>
                  <p className="text-2xl font-black text-white mt-1">
                    {users.filter((u) => u.status === 'active').length}
                  </p>
                  <p className="text-[10px] text-emerald-400 mt-0.5 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +12% este mês
                  </p>
                </GlassCard>

                <GlassCard variant="hover" glowColor="yellow" className="p-4">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Volume Total</span>
                  <p className="text-2xl font-black text-amber-300 mt-1">
                    R$ {totalVolume.toFixed(2)}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Em figurinhas ativas</p>
                </GlassCard>

                <GlassCard variant="hover" glowColor="green" className="p-4">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Figurinhas Ativas</span>
                  <p className="text-2xl font-black text-emerald-400 mt-1">
                    {stickers.filter((s) => s.status === 'available').length}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Disponíveis no mercado</p>
                </GlassCard>

                <GlassCard variant="hover" className="p-4">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Moderação Pendente</span>
                  <p className="text-2xl font-black text-rose-400 mt-1">{pendingStickers.length}</p>
                  <p className="text-[10px] text-rose-300 mt-0.5">Aguardando aprovação</p>
                </GlassCard>
              </div>

              {/* Simulated Sales & Traffic Visual Chart */}
              <GlassCard className="p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-amber-300" />
                    <h3 className="text-base font-bold text-white">
                      Volume de Transações & Vendas (Últimos 7 dias)
                    </h3>
                  </div>
                  <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    Crescimento Contínuo
                  </span>
                </div>

                {/* Simulated Visual Bar Chart */}
                <div className="h-44 flex items-end justify-between gap-2 pt-6 px-2">
                  {[
                    { day: 'Seg', val: 40 },
                    { day: 'Ter', val: 65 },
                    { day: 'Qua', val: 50 },
                    { day: 'Qui', val: 85 },
                    { day: 'Sex', val: 95 },
                    { day: 'Sáb', val: 120 },
                    { day: 'Dom', val: 110 },
                  ].map((item) => (
                    <div key={item.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <div
                        className="w-full bg-gradient-to-t from-rose-500 via-amber-400 to-emerald-400 rounded-t-lg transition-all duration-500 hover:brightness-125"
                        style={{ height: `${(item.val / 120) * 100}%` }}
                      />
                      <span className="text-[10px] text-slate-400 font-semibold">{item.day}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          )}

          {/* SECTION 2: USER MANAGEMENT */}
          {adminTab === 'users' && (
            <GlassCard className="p-6 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Gestão de Colecionadores e Administradores</h3>
                  <p className="text-xs text-slate-300">
                    Bloqueie/desbloqueie usuários e altere perfis de acesso
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative w-60">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Buscar por nome ou e-mail..."
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      className="w-full glass-input pl-9 pr-3 py-2 rounded-xl text-xs"
                    />
                  </div>

                  <select
                    value={userRoleFilter}
                    onChange={(e) => setUserRoleFilter(e.target.value as any)}
                    className="glass-input px-3 py-2 rounded-xl text-xs bg-slate-900 text-white"
                  >
                    <option value="all">Todos os Cargos</option>
                    <option value="admin">Administradores</option>
                    <option value="colecionador">Colecionadores</option>
                  </select>
                </div>
              </div>

              {/* Users Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-slate-400 border-b border-white/10 uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-2">Usuário</th>
                      <th className="py-3 px-2">Cargo</th>
                      <th className="py-3 px-2">Status</th>
                      <th className="py-3 px-2">Coleção / Anúncios</th>
                      <th className="py-3 px-2">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={u.avatar}
                              alt={u.name}
                              className="w-8 h-8 rounded-full object-cover border border-white/20"
                            />
                            <div>
                              <p className="font-bold text-white">{u.name}</p>
                              <p className="text-[10px] text-slate-400">{u.email}</p>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-2">
                          <button
                            onClick={() => {
                              const newRole = u.role === 'admin' ? 'colecionador' : 'admin';
                              onUpdateUserRole(u.id, newRole);
                              onAddToast(
                                'info',
                                'Perfil Alterado',
                                `${u.name} agora é ${newRole === 'admin' ? 'Administrador' : 'Colecionador'}.`
                              );
                            }}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-transform hover:scale-105 ${
                              u.role === 'admin'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            }`}
                          >
                            {u.role === 'admin' ? 'Administrador' : 'Colecionador'}
                          </button>
                        </td>

                        <td className="py-3 px-2">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              u.status === 'active'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : 'bg-rose-500/30 text-rose-300 border border-rose-500/50'
                            }`}
                          >
                            {u.status === 'active' ? 'Ativo' : 'Bloqueado'}
                          </span>
                        </td>

                        <td className="py-3 px-2 text-slate-300">
                          {u.collectionCount} fig. / {u.activeListingsCount} anúncios
                        </td>

                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            {u.status === 'active' ? (
                              <button
                                onClick={() => {
                                  onUpdateUserStatus(u.id, 'blocked');
                                  onAddToast('warning', 'Usuário Bloqueado', `${u.name} foi suspenso.`);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 font-bold text-[10px] flex items-center gap-1"
                              >
                                <Lock className="w-3 h-3" /> Bloquear
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  onUpdateUserStatus(u.id, 'active');
                                  onAddToast('success', 'Usuário Desbloqueado', `${u.name} agora está ativo.`);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 font-bold text-[10px] flex items-center gap-1"
                              >
                                <Unlock className="w-3 h-3" /> Desbloquear
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          )}

          {/* SECTION 3: TRAFFIC & ADVERTISEMENT MODERATION */}
          {adminTab === 'moderation' && (
            <GlassCard className="p-6 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Controle de Tráfego & Moderação de Anúncios</h3>
                  <p className="text-xs text-slate-300">
                    Aprove ou recuse os anúncios de figurinhas submetidos pelos colecionadores
                  </p>
                </div>

                <div className="relative w-60">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Filtrar por nome do anúncio..."
                    value={moderationSearch}
                    onChange={(e) => setModerationSearch(e.target.value)}
                    className="w-full glass-input pl-9 pr-3 py-2 rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Pending Moderation Section */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase text-amber-300 tracking-wider flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Pendentes de Aprovação ({pendingStickers.length})</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pendingStickers.map((stk) => (
                    <GlassCard key={stk.id} variant="subtle" className="p-4 flex gap-4 border-amber-500/30">
                      <img
                        src={stk.imageUrl}
                        alt={stk.name}
                        className="w-24 h-24 rounded-xl object-cover border border-white/20 shrink-0"
                      />

                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start">
                          <h5 className="font-bold text-white text-sm line-clamp-1">{stk.name}</h5>
                          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">
                            Nº {stk.number}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{stk.album}</p>
                        <p className="text-xs text-slate-300">Anunciado por: {stk.sellerName}</p>
                        <p className="text-sm font-black text-emerald-400">R$ {stk.price.toFixed(2)}</p>

                        <div className="pt-2 flex items-center gap-2">
                          <button
                            onClick={() => {
                              onUpdateStickerStatus(stk.id, 'available');
                              onAddToast(
                                'success',
                                'Anúncio Aprovado!',
                                `"${stk.name}" agora está disponível no mercado.`
                              );
                            }}
                            className="flex-1 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1 border border-emerald-500/30"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Aprovar
                          </button>

                          <button
                            onClick={() => setRejectionModalSticker(stk)}
                            className="flex-1 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 font-bold text-xs flex items-center justify-center gap-1 border border-rose-500/30"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Recusar
                          </button>
                        </div>
                      </div>
                    </GlassCard>
                  ))}

                  {pendingStickers.length === 0 && (
                    <div className="col-span-full py-8 text-center text-slate-400 text-xs bg-white/5 rounded-2xl border border-white/10">
                      Nenhum anúncio pendente de moderação no momento.
                    </div>
                  )}
                </div>
              </div>

              {/* All Moderated Listings List */}
              <div className="pt-6 border-t border-white/10 space-y-3">
                <h4 className="text-xs font-black uppercase text-slate-300 tracking-wider">
                  Todos os Anúncios Cadastrados ({allModeratedStickers.length})
                </h4>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="text-slate-400 border-b border-white/10 uppercase text-[10px]">
                      <tr>
                        <th className="py-2.5 px-2">Figurinha</th>
                        <th className="py-2.5 px-2">Álbum</th>
                        <th className="py-2.5 px-2">Preço</th>
                        <th className="py-2.5 px-2">Status</th>
                        <th className="py-2.5 px-2">Destaque Landing</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {allModeratedStickers.map((stk) => (
                        <tr key={stk.id} className="hover:bg-white/5">
                          <td className="py-2.5 px-2 font-bold text-white">{stk.name}</td>
                          <td className="py-2.5 px-2 text-slate-300">{stk.album}</td>
                          <td className="py-2.5 px-2 text-emerald-400 font-black">
                            R$ {stk.price.toFixed(2)}
                          </td>
                          <td className="py-2.5 px-2">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                stk.status === 'available'
                                  ? 'bg-emerald-500/20 text-emerald-300'
                                  : stk.status === 'pending_approval'
                                  ? 'bg-amber-500/20 text-amber-300'
                                  : 'bg-rose-500/20 text-rose-300'
                              }`}
                            >
                              {stk.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-2">
                            <button
                              onClick={() => {
                                onToggleStickerFeatured(stk.id);
                                onAddToast('info', 'Destaque Atualizado', `Status de destaque alterado.`);
                              }}
                              className={`p-1.5 rounded-lg border transition-all ${
                                stk.featured
                                  ? 'bg-amber-500/30 text-amber-300 border-amber-400'
                                  : 'bg-white/5 text-slate-400 border-white/10'
                              }`}
                            >
                              <Star className={`w-3.5 h-3.5 ${stk.featured ? 'fill-amber-300' : ''}`} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </GlassCard>
          )}

          {/* SECTION 4: ACCESS PERMISSIONS MATRIX */}
          {adminTab === 'permissions' && (
            <GlassCard className="p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Matriz de Perfis de Acesso & Permissões</h3>
                  <p className="text-xs text-slate-300">
                    Defina quais funcionalidades estão autorizadas para Colecionadores e Administradores
                  </p>
                </div>

                <button
                  onClick={handleSavePermissionsSubmit}
                  className="glass-button-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" /> Salvar Permissões
                </button>
              </div>

              <div className="space-y-4">
                {localPermissions.map((perm, idx) => (
                  <div
                    key={perm.id}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <h4 className="font-bold text-white text-sm">{perm.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{perm.description}</p>
                    </div>

                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-200">
                        <input
                          type="checkbox"
                          checked={perm.adminAllowed}
                          onChange={(e) => {
                            const updated = [...localPermissions];
                            updated[idx].adminAllowed = e.target.checked;
                            setLocalPermissions(updated);
                          }}
                          className="w-4 h-4 accent-rose-500 rounded"
                        />
                        <span>Admin</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-200">
                        <input
                          type="checkbox"
                          checked={perm.collectorAllowed}
                          onChange={(e) => {
                            const updated = [...localPermissions];
                            updated[idx].collectorAllowed = e.target.checked;
                            setLocalPermissions(updated);
                          }}
                          className="w-4 h-4 accent-amber-400 rounded"
                        />
                        <span>Colecionador</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {/* SECTION 5: GENERAL PLATFORM SETTINGS */}
          {adminTab === 'settings' && (
            <GlassCard className="p-6 space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold text-white">Configurações Gerais da Plataforma</h3>
                <p className="text-xs text-slate-300">Ajuste parâmetros operacionais do FigureX</p>
              </div>

              <form onSubmit={handleSaveSettingsSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-200">Nome da Plataforma</label>
                    <input
                      type="text"
                      value={localSettings.siteName}
                      onChange={(e) =>
                        setLocalSettings({ ...localSettings, siteName: e.target.value })
                      }
                      className="w-full glass-input px-3 py-2.5 rounded-xl text-xs mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-200">
                      Taxa de Comissão de Venda (%)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={localSettings.commissionFeePercent}
                      onChange={(e) =>
                        setLocalSettings({
                          ...localSettings,
                          commissionFeePercent: Number(e.target.value),
                        })
                      }
                      className="w-full glass-input px-3 py-2.5 rounded-xl text-xs mt-1"
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localSettings.requireApprovalForListings}
                      onChange={(e) =>
                        setLocalSettings({
                          ...localSettings,
                          requireApprovalForListings: e.target.checked,
                        })
                      }
                      className="w-4 h-4 accent-rose-500 rounded"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">
                        Exigir Aprovação Prévia de Moderação para Anúncios
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Se ativado, anúncios só aparecem no marketplace após aprovação de um admin.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localSettings.maintenanceMode}
                      onChange={(e) =>
                        setLocalSettings({
                          ...localSettings,
                          maintenanceMode: e.target.checked,
                        })
                      }
                      className="w-4 h-4 accent-amber-400 rounded"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">Ativar Modo de Manutenção</p>
                      <p className="text-[11px] text-slate-400">
                        Bloqueia novas transações temporariamente para manutenção do sistema.
                      </p>
                    </div>
                  </label>
                </div>

                <button
                  type="submit"
                  className="glass-button-primary px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Salvar Configurações
                </button>
              </form>
            </GlassCard>
          )}
        </div>
      </div>

      {/* REJECTION MODAL */}
      {rejectionModalSticker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <GlassCard className="w-full max-w-md p-6 space-y-4 border border-rose-500/40">
            <h3 className="text-base font-bold text-white">Recusar Anúncio</h3>
            <p className="text-xs text-slate-300">
              Informe a justificativa para a recusa de "{rejectionModalSticker.name}":
            </p>

            <textarea
              rows={3}
              placeholder="Ex: Foto de baixa qualidade ou item duplicado..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full glass-input p-3 rounded-xl text-xs"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRejectionModalSticker(null)}
                className="glass-button-secondary px-4 py-2 rounded-xl text-xs font-bold"
              >
                Cancelar
              </button>
              <button
                onClick={handleRejectionConfirm}
                className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-xl text-xs font-bold"
              >
                Confirmar Recusa
              </button>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};
