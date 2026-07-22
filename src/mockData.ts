import {
  User,
  Sticker,
  UserCollectionItem,
  Permission,
  PlatformStats,
  PlatformSettings,
  NotificationItem,
} from './types';

// Initial Mock Users
export const INITIAL_USERS: User[] = [
  {
    id: 'usr-admin',
    name: 'Carlos Henrique (Admin)',
    email: 'admin@figurex.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'active',
    balance: 1450.0,
    joinedDate: '2025-01-10',
    collectionCount: 84,
    activeListingsCount: 12,
  },
  {
    id: 'usr-col-1',
    name: 'Mariana Silva',
    email: 'colecionador@figurex.com',
    role: 'colecionador',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    status: 'active',
    balance: 320.5,
    joinedDate: '2025-02-01',
    collectionCount: 42,
    activeListingsCount: 5,
  },
  {
    id: 'usr-col-2',
    name: 'Lucas Gabriel',
    email: 'lucas.gabriel@gmail.com',
    role: 'colecionador',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'active',
    balance: 85.0,
    joinedDate: '2025-02-15',
    collectionCount: 19,
    activeListingsCount: 3,
  },
  {
    id: 'usr-col-3',
    name: 'Beatriz Costa',
    email: 'beatriz.costa@hotmail.com',
    role: 'colecionador',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    status: 'blocked',
    balance: 0.0,
    joinedDate: '2025-03-01',
    collectionCount: 8,
    activeListingsCount: 0,
  },
  {
    id: 'usr-col-4',
    name: 'Rafael Oliveira',
    email: 'rafael.cards@yahoo.com',
    role: 'colecionador',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    status: 'active',
    balance: 510.0,
    joinedDate: '2025-03-12',
    collectionCount: 65,
    activeListingsCount: 8,
  },
];

// Initial Stickers
export const INITIAL_STICKERS: Sticker[] = [
  {
    id: 'stk-101',
    number: 1,
    name: 'Troféu de Ouro Campeões 2026',
    album: 'Copa do Mundo 2026',
    rarity: 'Lendária',
    imageUrl: '/src/assets/images/gold_trophy_sticker_1784675411588.jpg',
    price: 185.0,
    sellerId: 'usr-admin',
    sellerName: 'Carlos Henrique (Admin)',
    sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    description: 'Figurinha holográfica brilhante e edição limitada do troféu oficial.',
    status: 'available',
    likesCount: 142,
    featured: true,
    createdAt: '2026-06-10',
  },
  {
    id: 'stk-102',
    number: 7,
    name: 'Hero Cybernetic Neon (Saitama Style)',
    album: 'Anime Legends',
    rarity: 'Lendária',
    imageUrl: '/src/assets/images/cyber_hero_sticker_1784675422570.jpg',
    price: 240.0,
    sellerId: 'usr-col-1',
    sellerName: 'Mariana Silva',
    sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    description: 'Card ultra raro de herói cybernetic neon com detalhes metalizados.',
    status: 'available',
    likesCount: 98,
    featured: true,
    createdAt: '2026-06-12',
  },
  {
    id: 'stk-103',
    number: 99,
    name: 'Dragão Flamejante Mítico',
    album: 'Anime Legends',
    rarity: 'Épica',
    imageUrl: '/src/assets/images/mythic_dragon_sticker_1784675434830.jpg',
    price: 120.0,
    sellerId: 'usr-col-4',
    sellerName: 'Rafael Oliveira',
    sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    description: 'Dragão lendário com aura cintilante dourada para colar no álbum Anime.',
    status: 'available',
    likesCount: 76,
    featured: true,
    createdAt: '2026-06-15',
  },
  {
    id: 'stk-104',
    number: 10,
    name: 'Craque nº 10 - Vinicius Jr. Gold Edition',
    album: 'Lendas do Futebol',
    rarity: 'Lendária',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=500&auto=format&fit=crop&q=80',
    price: 150.0,
    sellerId: 'usr-col-1',
    sellerName: 'Mariana Silva',
    description: 'Edição dourada com autógrafo impresso em verniz reservado.',
    status: 'available',
    likesCount: 112,
    featured: true,
    createdAt: '2026-06-18',
  },
  {
    id: 'stk-105',
    number: 45,
    name: 'Estrela Pop Holográfica Live Tour',
    album: 'Pop & Rock Superstars',
    rarity: 'Rara',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80',
    price: 45.0,
    sellerId: 'usr-col-2',
    sellerName: 'Lucas Gabriel',
    description: 'Figurinha com efeito holográfico de show em estádio.',
    status: 'available',
    likesCount: 34,
    featured: false,
    createdAt: '2026-06-20',
  },
  {
    id: 'stk-106',
    number: 12,
    name: 'Cyber Samurai Pro Gamer',
    album: 'E-Sports Champions',
    rarity: 'Épica',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=80',
    price: 88.0,
    sellerId: 'usr-col-4',
    sellerName: 'Rafael Oliveira',
    description: 'Figurinha do MVP da final mundial de E-Sports.',
    status: 'available',
    likesCount: 52,
    featured: false,
    createdAt: '2026-06-21',
  },
  {
    id: 'stk-107',
    number: 22,
    name: 'Mascote Oficial Foxy 2026',
    album: 'Copa do Mundo 2026',
    rarity: 'Comum',
    imageUrl: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=500&auto=format&fit=crop&q=80',
    price: 12.5,
    sellerId: 'usr-col-2',
    sellerName: 'Lucas Gabriel',
    description: 'Figurinha comum do mascote animado da competição.',
    status: 'available',
    likesCount: 19,
    featured: false,
    createdAt: '2026-06-22',
  },
  {
    id: 'stk-108',
    number: 88,
    name: 'Goleiro Paredão Imparável',
    album: 'Lendas do Futebol',
    rarity: 'Rara',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&auto=format&fit=crop&q=80',
    price: 38.0,
    sellerId: 'usr-admin',
    sellerName: 'Carlos Henrique (Admin)',
    description: 'Incrível defesa no minuto final da grande decisão.',
    status: 'available',
    likesCount: 41,
    featured: false,
    createdAt: '2026-06-23',
  },
  {
    id: 'stk-109',
    number: 30,
    name: 'Banda Vintage Rock Legend (Edição Anos 80)',
    album: 'Pop & Rock Superstars',
    rarity: 'Comum',
    imageUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=500&auto=format&fit=crop&q=80',
    price: 15.0,
    sellerId: 'usr-col-1',
    sellerName: 'Mariana Silva',
    description: 'Série clássicos do Rock n Roll nacional e internacional.',
    status: 'pending_approval',
    likesCount: 8,
    createdAt: '2026-07-01',
  },
  {
    id: 'stk-110',
    number: 5,
    name: 'Guerreira Mecha Cosmic Valkyrie',
    album: 'Anime Legends',
    rarity: 'Lendária',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80',
    price: 210.0,
    sellerId: 'usr-col-4',
    sellerName: 'Rafael Oliveira',
    description: 'Figurinha ultra-raríssima com textura acrílica 3D.',
    status: 'pending_approval',
    likesCount: 14,
    createdAt: '2026-07-02',
  },
];

// Initial Collection Items for Mariana (colecionador@figurex.com)
export const INITIAL_USER_COLLECTION: UserCollectionItem[] = [
  {
    stickerId: 'stk-101',
    stickerNumber: 1,
    stickerName: 'Troféu de Ouro Campeões 2026',
    album: 'Copa do Mundo 2026',
    rarity: 'Lendária',
    imageUrl: '/src/assets/images/gold_trophy_sticker_1784675411588.jpg',
    acquiredDate: '2026-06-11',
    isGlued: true,
    duplicateCount: 0,
  },
  {
    stickerId: 'stk-102',
    stickerNumber: 7,
    stickerName: 'Hero Cybernetic Neon (Saitama Style)',
    album: 'Anime Legends',
    rarity: 'Lendária',
    imageUrl: '/src/assets/images/cyber_hero_sticker_1784675422570.jpg',
    acquiredDate: '2026-06-13',
    isGlued: true,
    duplicateCount: 2,
  },
  {
    stickerId: 'stk-107',
    stickerNumber: 22,
    stickerName: 'Mascote Oficial Foxy 2026',
    album: 'Copa do Mundo 2026',
    rarity: 'Comum',
    imageUrl: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=500&auto=format&fit=crop&q=80',
    acquiredDate: '2026-06-15',
    isGlued: true,
    duplicateCount: 1,
  },
];

// Initial Permissions Matrix
export const INITIAL_PERMISSIONS: Permission[] = [
  {
    id: 'perm-1',
    name: 'Anunciar Figurinhas no Marketplace',
    description: 'Permite criar anúncios e vender figurinhas.',
    adminAllowed: true,
    collectorAllowed: true,
  },
  {
    id: 'perm-2',
    name: 'Comprar Figurinhas',
    description: 'Permite realizar transações financeiras e adquirir colecionáveis.',
    adminAllowed: true,
    collectorAllowed: true,
  },
  {
    id: 'perm-3',
    name: 'Moderar e Aprovar Anúncios',
    description: 'Permite aprovar, recusar ou remover anúncios de figurinhas.',
    adminAllowed: true,
    collectorAllowed: false,
  },
  {
    id: 'perm-4',
    name: 'Gerenciar Usuários (Bloquear / Editar)',
    description: 'Acesso total para suspender ou alterar cargos de usuários.',
    adminAllowed: true,
    collectorAllowed: false,
  },
  {
    id: 'perm-5',
    name: 'Acessar Relatórios do Sistema e Financeiros',
    description: 'Visualizar volumes de vendas, lucros e gráfico de tráfego.',
    adminAllowed: true,
    collectorAllowed: false,
  },
  {
    id: 'perm-6',
    name: 'Alterar Configurações e Taxas da Plataforma',
    description: 'Editar comissão por venda e regras de funcionamento.',
    adminAllowed: true,
    collectorAllowed: false,
  },
];

// Initial Platform Settings
export const INITIAL_SETTINGS: PlatformSettings = {
  siteName: 'FigureX Marketplace',
  commissionFeePercent: 5.0,
  requireApprovalForListings: true,
  maintenanceMode: false,
  allowPublicRegistrations: true,
  maxActiveListingsPerUser: 25,
};

// Storage keys
const STORAGE_KEYS = {
  USERS: 'figurex_users_v1',
  STICKERS: 'figurex_stickers_v1',
  COLLECTION: 'figurex_collection_v1',
  PERMISSIONS: 'figurex_permissions_v1',
  SETTINGS: 'figurex_settings_v1',
  CURRENT_USER: 'figurex_current_user_v1',
};

// Helper Functions for LocalStorage State
export function getStoredUsers(): User[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : INITIAL_USERS;
  } catch {
    return INITIAL_USERS;
  }
}

export function saveStoredUsers(users: User[]): void {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

export function getStoredStickers(): Sticker[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.STICKERS);
    return data ? JSON.parse(data) : INITIAL_STICKERS;
  } catch {
    return INITIAL_STICKERS;
  }
}

export function saveStoredStickers(stickers: Sticker[]): void {
  localStorage.setItem(STORAGE_KEYS.STICKERS, JSON.stringify(stickers));
}

export function getStoredUserCollection(): UserCollectionItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.COLLECTION);
    return data ? JSON.parse(data) : INITIAL_USER_COLLECTION;
  } catch {
    return INITIAL_USER_COLLECTION;
  }
}

export function saveStoredUserCollection(collection: UserCollectionItem[]): void {
  localStorage.setItem(STORAGE_KEYS.COLLECTION, JSON.stringify(collection));
}

export function getStoredPermissions(): Permission[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PERMISSIONS);
    return data ? JSON.parse(data) : INITIAL_PERMISSIONS;
  } catch {
    return INITIAL_PERMISSIONS;
  }
}

export function saveStoredPermissions(perms: Permission[]): void {
  localStorage.setItem(STORAGE_KEYS.PERMISSIONS, JSON.stringify(perms));
}

export function getStoredSettings(): PlatformSettings {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : INITIAL_SETTINGS;
  } catch {
    return INITIAL_SETTINGS;
  }
}

export function saveStoredSettings(settings: PlatformSettings): void {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
}

export function getStoredCurrentUser(): User | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function saveStoredCurrentUser(user: User | null): void {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
}
