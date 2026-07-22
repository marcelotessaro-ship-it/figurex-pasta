import React, { useState } from 'react';
import { User } from '../types';
import {
  Sparkles,
  ShieldCheck,
  User as UserIcon,
  LogOut,
  Wallet,
  Menu,
  X,
  Layers,
  ShoppingBag,
  HelpCircle,
  ChevronDown,
  LayoutDashboard,
} from 'lucide-react';

interface NavbarProps {
  currentUser: User | null;
  currentView: 'landing' | 'login' | 'collector' | 'admin';
  onNavigate: (view: 'landing' | 'login' | 'collector' | 'admin') => void;
  onLogout: () => void;
  onOpenDepositModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  currentView,
  onNavigate,
  onLogout,
  onOpenDepositModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/60 border-b border-white/10 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 via-amber-400 to-emerald-400 p-[2px] shadow-lg shadow-rose-500/20 group-hover:shadow-emerald-400/30 transition-all duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
              FigureX
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-lg">
          <button
            onClick={() => onNavigate('landing')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              currentView === 'landing'
                ? 'bg-gradient-to-r from-rose-500/30 to-emerald-500/30 text-white border border-white/20 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-rose-400" />
              Início
            </span>
          </button>

          <button
            onClick={() => {
              if (currentUser) {
                onNavigate('collector');
              } else {
                onNavigate('landing');
              }
            }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              currentView === 'collector'
                ? 'bg-gradient-to-r from-rose-500/30 to-emerald-500/30 text-white border border-white/20 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              Mercado
            </span>
          </button>

          <a
            href="#como-funciona"
            className="px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            Como Funciona
          </a>
        </nav>

        {/* Top Right Action Controls */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-3">
              {/* ADMIN PANEL BUTTON - VISIBLE ONLY IF USER IS ADMIN */}
              {currentUser.role === 'admin' && (
                <button
                  onClick={() => onNavigate('admin')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 border shadow-lg ${
                    currentView === 'admin'
                      ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-emerald-500 text-slate-950 border-amber-300 shadow-amber-500/30'
                      : 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border-rose-500/40 hover:border-rose-400'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-amber-300 animate-pulse" />
                  <span className="hidden sm:inline">Painel Administrativo</span>
                  <span className="sm:hidden">Admin</span>
                </button>
              )}

              {/* User Balance Chip */}
              <div
                onClick={onOpenDepositModal}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold hover:bg-emerald-500/20 cursor-pointer transition-all"
                title="Clique para recarregar saldo"
              >
                <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                <span>R$ {currentUser.balance.toFixed(2)}</span>
              </div>

              {/* User Profile Dropdown Button */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/15 hover:bg-white/10 transition-all"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-xl object-cover ring-2 ring-rose-500/50"
                  />
                  <span className="hidden md:inline-block text-xs font-semibold text-white max-w-[100px] truncate">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 glass-panel rounded-2xl p-2 border border-white/20 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-2 border-b border-white/10 mb-1">
                      <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{currentUser.email}</p>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                            currentUser.role === 'admin'
                              ? 'bg-rose-500/30 text-rose-300 border border-rose-500/40'
                              : 'bg-amber-500/30 text-amber-300 border border-amber-500/40'
                          }`}
                        >
                          {currentUser.role === 'admin' ? 'Administrador' : 'Colecionador'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onNavigate('collector');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:text-white hover:bg-white/10 rounded-xl flex items-center gap-2 transition-colors"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-amber-300" />
                      Painel do Colecionador
                    </button>

                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => {
                          onNavigate('admin');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-rose-300 hover:text-rose-100 hover:bg-rose-500/20 rounded-xl flex items-center gap-2 transition-colors"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                        Painel Administrativo
                      </button>
                    )}

                    <div className="border-t border-white/10 my-1" />

                    <button
                      onClick={() => {
                        onLogout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/20 rounded-xl flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* PUBLIC USER LOGIN BUTTON TOP RIGHT */
            <button
              onClick={() => onNavigate('login')}
              className="px-5 py-2.5 rounded-2xl text-sm font-bold flex items-center gap-2 group shadow-lg text-white border border-white/30 transition-all hover:opacity-90 shadow-pink-500/30"
              style={{ backgroundColor: '#ff1493' }}
            >
              <UserIcon className="w-4 h-4 group-hover:scale-110 transition-transform text-white" />
              <span>Entrar</span>
            </button>
          )}

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-2xl bg-white/10 text-slate-200 hover:text-white hover:bg-white/20 transition-all border border-white/10"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/10 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-3">
          <button
            onClick={() => {
              onNavigate('landing');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/10 flex items-center gap-2"
          >
            <Layers className="w-4 h-4 text-rose-400" />
            Início
          </button>

          <button
            onClick={() => {
              if (currentUser) onNavigate('collector');
              else onNavigate('login');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/10 flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4 text-amber-300" />
            Mercado de Figurinhas
          </button>

          {currentUser && currentUser.role === 'admin' && (
            <button
              onClick={() => {
                onNavigate('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-rose-300 bg-rose-500/20 border border-rose-500/30 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              Painel Administrativo
            </button>
          )}

          {!currentUser && (
            <button
              onClick={() => {
                onNavigate('login');
                setMobileMenuOpen(false);
              }}
              className="w-full glass-button-primary py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 mt-2"
            >
              <UserIcon className="w-4 h-4" />
              Entrar na Conta
            </button>
          )}
        </div>
      )}
    </header>
  );
};
