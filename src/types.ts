export type UserRole = 'admin' | 'colecionador';

export type UserStatus = 'active' | 'blocked';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  status: UserStatus;
  balance: number;
  joinedDate: string;
  collectionCount: number;
  activeListingsCount: number;
}

export type StickerRarity = 'Lendária' | 'Épica' | 'Rara' | 'Comum';

export type AlbumCategory =
  | 'Copa do Mundo 2026'
  | 'Anime Legends'
  | 'Pop & Rock Superstars'
  | 'Lendas do Futebol'
  | 'E-Sports Champions';

export type ListingStatus = 'available' | 'pending_approval' | 'sold' | 'rejected';

export interface Sticker {
  id: string;
  number: number;
  name: string;
  album: AlbumCategory;
  rarity: StickerRarity;
  imageUrl: string;
  price: number;
  sellerId: string;
  sellerName: string;
  sellerAvatar?: string;
  description: string;
  status: ListingStatus;
  likesCount: number;
  featured?: boolean;
  createdAt: string;
  rejectionReason?: string;
}

export interface UserCollectionItem {
  stickerId: string;
  stickerNumber: number;
  stickerName: string;
  album: AlbumCategory;
  rarity: StickerRarity;
  imageUrl: string;
  acquiredDate: string;
  isGlued: boolean;
  duplicateCount: number;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  adminAllowed: boolean;
  collectorAllowed: boolean;
}

export interface PlatformStats {
  totalUsers: number;
  activeUsers: number;
  totalVolume: number;
  pendingApprovals: number;
  totalStickersCount: number;
  monthlyGrowthPercent: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

export interface PlatformSettings {
  siteName: string;
  commissionFeePercent: number;
  requireApprovalForListings: boolean;
  maintenanceMode: boolean;
  allowPublicRegistrations: boolean;
  maxActiveListingsPerUser: number;
}
