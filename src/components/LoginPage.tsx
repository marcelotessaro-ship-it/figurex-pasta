import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { User } from '../types';
import {
  Sparkles,
  ShieldCheck,
  UserCheck,
  Lock,
  Mail,
  ArrowRight,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
  Info,
} from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string, pass: string) => boolean;
  onNavigateToRegister?: () => void;
  onNavigateToLanding: () => void;
  users: User[];
  onAddToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, desc?: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLogin,
  onNavigateToLanding,
  onAddToast,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simple real-time field validation states
  const isEmailValid = email.length > 3 && email.includes('@');
  const isPasswordValid = password.length >= 6;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!isEmailValid) {
      setErrorMessage('Por favor, informe um e-mail válido.');
      return;
    }

    if (!isPasswordValid) {
      setErrorMessage('A senha deve conter no mínimo 6 caracteres.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const success = onLogin(email, password);
      setIsSubmitting(false);

      if (!success) {
        setErrorMessage('Credenciais inválidas ou usuário bloqueado. Tente a conta de demonstração.');
        onAddToast('error', 'Falha no Login', 'Verifique o e-mail e a senha informados.');
      } else {
        onAddToast('success', 'Login Realizado!', 'Seja bem-vindo de volta à FigureX.');
      }
    }, 400);
  };

  // Demo Fill Shortcut Actions (only fills inputs as required)
  const handleFillAdminDemo = () => {
    setEmail('admin@figurex.com');
    setPassword('123456');
    setErrorMessage('');
    onAddToast(
      'info',
      'Campos Preenchidos',
      'Usuário e senha de Administrador inseridos no formulário.'
    );
  };

  const handleFillCollectorDemo = () => {
    setEmail('colecionador@figurex.com');
    setPassword('123456');
    setErrorMessage('');
    onAddToast(
      'info',
      'Campos Preenchidos',
      'Usuário e senha de Colecionador inseridos no formulário.'
    );
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center px-4 py-12 relative">
      <div className="w-full max-w-md space-y-6">
        {/* Top Header branding */}
        <div className="text-center space-y-2">
          <div
            onClick={onNavigateToLanding}
            className="inline-flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 via-amber-400 to-emerald-400 p-[2px] shadow-xl shadow-rose-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-amber-300" />
              </div>
            </div>
            <span className="text-3xl font-black tracking-tight bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
              FigureX
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Acesse sua Conta</h2>
          <p className="text-xs text-slate-300">Entre para negociar e gerenciar sua coleção de figurinhas</p>
        </div>

        {/* MAIN GLASS LOGIN CARD */}
        <GlassCard variant="gradient" glowColor="magenta" className="p-8 space-y-6 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL FIELD */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200 flex justify-between">
                <span>E-mail ou Usuário</span>
                {email && (
                  <span className={isEmailValid ? 'text-emerald-400 flex items-center gap-1' : 'text-rose-400'}>
                    {isEmailValid ? <Check className="w-3 h-3" /> : 'Inválido'}
                  </span>
                )}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="ex: usuario@figurex.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full glass-input pl-10 pr-4 py-3 rounded-xl text-sm ${
                    email.length > 0
                      ? isEmailValid
                        ? 'border-emerald-500/60 focus:border-emerald-400'
                        : 'border-rose-500/60 focus:border-rose-400'
                      : ''
                  }`}
                  required
                />
              </div>
            </div>

            {/* PASSWORD FIELD */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-200">Senha</label>
                <button
                  type="button"
                  onClick={() =>
                    onAddToast(
                      'info',
                      'Recuperação de Senha',
                      'Nas contas de demonstração, a senha padrão é 123456.'
                    )
                  }
                  className="text-xs text-amber-300 hover:underline font-semibold"
                >
                  Esqueci minha senha
                </button>
              </div>

              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full glass-input pl-10 pr-10 py-3 rounded-xl text-sm ${
                    password.length > 0
                      ? isPasswordValid
                        ? 'border-emerald-500/60 focus:border-emerald-400'
                        : 'border-rose-500/60 focus:border-rose-400'
                      : ''
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* ERROR MESSAGE ALERT */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* SUBMIT BUTTON WITH GRADIENT */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full glass-button-primary py-3.5 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 group shadow-xl"
            >
              {isSubmitting ? (
                <span>Verificando...</span>
              ) : (
                <>
                  <span>Entrar</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* CREATE ACCOUNT LINK */}
          <div className="text-center pt-2 border-t border-white/10">
            <p className="text-xs text-slate-300">
              Ainda não possui uma conta?{' '}
              <button
                type="button"
                onClick={() =>
                  onAddToast(
                    'info',
                    'Acesso Imediato',
                    'Utilize o atalho "Entrar como Colecionador" abaixo para testar instantaneamente!'
                  )
                }
                className="text-amber-300 font-bold hover:underline"
              >
                Criar conta
              </button>
            </p>
          </div>
        </GlassCard>

        {/* DEMO QUICK ACCESS CARD - DEMONSTRATION SHORTCUTS */}
        <GlassCard variant="subtle" className="p-6 space-y-4 border border-amber-500/30">
          <div className="flex items-center gap-2 text-amber-300">
            <Info className="w-4 h-4 shrink-0" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Acesso Rápido (Demo)</h3>
          </div>

          <p className="text-[11px] text-slate-300 leading-relaxed">
            Clique nos botões abaixo para preencher automaticamente as credenciais de teste no formulário acima:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* ADMIN DEMO SHORTCUT */}
            <button
              type="button"
              onClick={handleFillAdminDemo}
              className="px-3 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-200 text-xs font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>Administrador</span>
            </button>

            {/* COLLECTOR DEMO SHORTCUT */}
            <button
              type="button"
              onClick={handleFillCollectorDemo}
              className="px-3 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 text-xs font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>Colecionador</span>
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
