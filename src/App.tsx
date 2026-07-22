import React, { useState, useEffect } from 'react';
import {
  User,
  Sticker,
  UserCollectionItem,
  Permission,
  PlatformSettings,
  UserRole,
  UserStatus,
  ListingStatus,
} from './types';
import {
  getStoredUsers,
  saveStoredUsers,
  getStoredStickers,
  saveStoredStickers,
  getStoredUserCollection,
  saveStoredUserCollection,
  getStoredPermissions,
  saveStoredPermissions,
  getStoredSettings,
  saveStoredSettings,
  getStoredCurrentUser,
  saveStoredCurrentUser,
} from './mockData';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { CollectorDashboard } from './components/CollectorDashboard';
import { AdminPanel } from './components/AdminPanel';
import { ToastContainer, ToastMessage } from './components/Toast';
import { GlassCard } from './components/GlassCard';
import { Wallet, Plus, X, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [users, setUsers] = useState<User[]>(getStoredUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(getStoredCurrentUser);
  const [stickers, setStickers] = useState<Sticker[]>(getStoredStickers);
  const [userCollection, setUserCollection] =
    useState<UserCollectionItem[]>(getStoredUserCollection);
  const [permissions, setPermissions] = useState<Permission[]>(getStoredPermissions);
  const [settings, setSettings] = useState<PlatformSettings>(getStoredSettings);

  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'collector' | 'admin'>(
    currentUser ? (currentUser.role === 'admin' ? 'collector' : 'collector') : 'landing'
  );

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState<number>(50.0);

  // Sync states to local storage
  useEffect(() => {
    saveStoredUsers(users);
  }, [users]);

  useEffect(() => {
    saveStoredStickers(stickers);
  }, [stickers]);

  useEffect(() => {
    saveStoredUserCollection(userCollection);
  }, [userCollection]);

  useEffect(() => {
    saveStoredPermissions(permissions);
  }, [permissions]);

  useEffect(() => {
    saveStoredSettings(settings);
  }, [settings]);

  useEffect(() => {
    saveStoredCurrentUser(currentUser);
  }, [currentUser]);

  // Toast Helper
  const addToast = (
    type: 'success' | 'error' | 'info' | 'warning',
    title: string,
    description?: string
  ) => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random()}`,
      type,
      title,
      description,
    };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auth Handlers
  const handleLogin = (email: string, pass: string): boolean => {
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.status === 'active'
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      setCurrentView('collector');
      return true;
    }

    // Fallback demo user check if password matches 123456
    if (pass === '123456') {
      if (email.toLowerCase().includes('admin')) {
        const adminUser = users.find((u) => u.role === 'admin') || users[0];
        setCurrentUser(adminUser);
        setCurrentView('collector');
        return true;
      } else {
        const collectorUser = users.find((u) => u.role === 'colecionador') || users[1];
        setCurrentUser(collectorUser);
        setCurrentView('collector');
        return true;
      }
    }

    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('landing');
    addToast('info', 'Sessão Encerrada', 'Você saiu da sua conta.');
  };

  // Buy Sticker Handler
  const handleBuySticker = (sticker: Sticker) => {
    if (!currentUser) {
      setCurrentView('login');
      addToast('info', 'Login Necessário', 'Faça login para realizar compras no marketplace.');
      return;
    }

    if (currentUser.balance < sticker.price) {
      addToast(
        'warning',
        'Saldo Insuficiente',
        `Você precisa de mais R$ ${(sticker.price - currentUser.balance).toFixed(2)} para esta compra.`
      );
      setIsDepositModalOpen(true);
      return;
    }

    // Deduct balance from buyer
    const updatedBuyerBalance = currentUser.balance - sticker.price;
    const updatedBuyer = { ...currentUser, balance: updatedBuyerBalance };

    // Update currentUser and users array
    setCurrentUser(updatedBuyer);
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updatedBuyer : u)));

    // Add sticker to User Collection
    const newItem: UserCollectionItem = {
      stickerId: sticker.id,
      stickerNumber: sticker.number,
      stickerName: sticker.name,
      album: sticker.album,
      rarity: sticker.rarity,
      imageUrl: sticker.imageUrl,
      acquiredDate: new Date().toISOString().split('T')[0],
      isGlued: true,
      duplicateCount: 0,
    };

    setUserCollection((prev) => [...prev, newItem]);

    // Mark sticker status
    setStickers((prev) =>
      prev.map((s) => (s.id === sticker.id ? { ...s, status: 'sold' as ListingStatus } : s))
    );

    addToast(
      'success',
      'Compra Concluída!',
      `"${sticker.name}" foi colada na sua coleção! Saldo restante: R$ ${updatedBuyerBalance.toFixed(2)}`
    );
  };

  // Create Listing Handler
  const handleCreateListing = (
    newStickerData: Omit<Sticker, 'id' | 'createdAt' | 'likesCount'>
  ) => {
    const newSticker: Sticker = {
      ...newStickerData,
      id: `stk-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      likesCount: 0,
    };

    setStickers((prev) => [newSticker, ...prev]);
  };

  // Admin Actions
  const handleUpdateUserStatus = (userId: string, newStatus: UserStatus) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
    );
  };

  const handleUpdateUserRole = (userId: string, newRole: UserRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );

    if (currentUser && currentUser.id === userId) {
      setCurrentUser({ ...currentUser, role: newRole });
    }
  };

  const handleUpdateStickerStatus = (
    stickerId: string,
    newStatus: ListingStatus,
    reason?: string
  ) => {
    setStickers((prev) =>
      prev.map((s) =>
        s.id === stickerId ? { ...s, status: newStatus, rejectionReason: reason } : s
      )
    );
  };

  const handleToggleStickerFeatured = (stickerId: string) => {
    setStickers((prev) =>
      prev.map((s) => (s.id === stickerId ? { ...s, featured: !s.featured } : s))
    );
  };

  // Deposit balance
  const handleConfirmDeposit = () => {
    if (!currentUser) return;
    const newBal = currentUser.balance + Number(depositAmount);
    const updatedUser = { ...currentUser, balance: newBal };

    setCurrentUser(updatedUser);
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updatedUser : u)));
    setIsDepositModalOpen(false);

    addToast(
      'success',
      'Recarga Efetuada!',
      `Foram adicionados R$ ${Number(depositAmount).toFixed(2)} à sua carteira.`
    );
  };

  return (
    <div className="min-h-screen flex flex-col relative text-slate-100">
      {/* Dynamic Ambient Glass Glowing Lights */}
      <div className="bg-ambient-orb-1" />
      <div className="bg-ambient-orb-2" />
      <div className="bg-ambient-orb-3" />

      {/* Global Navigation Header */}
      <Navbar
        currentUser={currentUser}
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        onLogout={handleLogout}
        onOpenDepositModal={() => setIsDepositModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            stickers={stickers}
            currentUser={currentUser}
            onNavigateToLogin={() => setCurrentView('login')}
            onNavigateToCollector={() => setCurrentView('collector')}
            onSelectSticker={(s) => handleBuySticker(s)}
          />
        )}

        {currentView === 'login' && (
          <LoginPage
            onLogin={handleLogin}
            onNavigateToLanding={() => setCurrentView('landing')}
            users={users}
            onAddToast={addToast}
          />
        )}

        {currentView === 'collector' && currentUser && (
          <CollectorDashboard
            currentUser={currentUser}
            stickers={stickers}
            userCollection={userCollection}
            onBuySticker={handleBuySticker}
            onCreateListing={handleCreateListing}
            onNavigateToAdmin={() => setCurrentView('admin')}
            onAddToast={addToast}
          />
        )}

        {currentView === 'admin' && currentUser && currentUser.role === 'admin' && (
          <AdminPanel
            currentUser={currentUser}
            users={users}
            stickers={stickers}
            permissions={permissions}
            settings={settings}
            onUpdateUserStatus={handleUpdateUserStatus}
            onUpdateUserRole={handleUpdateUserRole}
            onUpdateStickerStatus={handleUpdateStickerStatus}
            onToggleStickerFeatured={handleToggleStickerFeatured}
            onSavePermissions={(p) => setPermissions(p)}
            onSaveSettings={(s) => setSettings(s)}
            onNavigateToCollector={() => setCurrentView('collector')}
            onAddToast={addToast}
          />
        )}
      </main>

      {/* Toast Notifications Overlay */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* WALLET DEPOSIT RECHARGE MODAL */}
      {isDepositModalOpen && currentUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <GlassCard variant="gradient" className="w-full max-w-sm p-6 space-y-5 border border-emerald-500/40 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-extrabold text-white">Recarregar Saldo</h3>
              </div>
              <button
                onClick={() => setIsDepositModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Escolha o valor que deseja adicionar instantaneamente à sua carteira FigureX:
            </p>

            <div className="grid grid-cols-3 gap-2">
              {[20, 50, 100].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setDepositAmount(val)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    depositAmount === val
                      ? 'bg-emerald-500/30 text-emerald-200 border-emerald-400'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  R$ {val},00
                </button>
              ))}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-200">Outro Valor (R$)</label>
              <input
                type="number"
                min="10"
                step="5"
                value={depositAmount}
                onChange={(e) => setDepositAmount(Number(e.target.value))}
                className="w-full glass-input px-3 py-2.5 rounded-xl text-xs mt-1"
              />
            </div>

            <button
              onClick={handleConfirmDeposit}
              className="w-full glass-button-primary py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirmar Recarga de R$ {depositAmount.toFixed(2)}</span>
            </button>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
