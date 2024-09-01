type User = {
  id: string;
  createdAt?: Date;
  name: string;
  email: string;
  avatarUrl?: string;
  onboarded?: boolean;
};

type Chat = {
  id: string;
  createdAt: Date;
};

type UserInChat = {
  user: User;
  chat: Chat;
};

type Message = {
  id: string;
  chatId: string;
  content: string;
  timestamp: Date;
  profile: Partial<Profile>;
};

type Post = {
  id: string;
  createdAt: Date;
  content?: string;
  poster: Partial<Profile>;
  likeCount?: number;
  commentCount?: number;
  mediaUrl?: string;
};

type Profile = {
  userId: string;
  createdAt?: Date | null;
  displayName?: string | null;
  email?: string | null;
  avatarUrl?: string | null;
  avatarColor?: string | null;
  phone?: string | null;
  country?: string | null;
  language?: string | null;
  mentor: boolean;
  mentee: boolean;
  partner: boolean;
  age?: number | null;
  gender?: string | null;
  intro?: string | null;
  role?: string | null;
};

type Like = {
  likerId: string;
  likeeId: string;
  createdAt: Date;
};

type UserLikesPost = {
  userId: string;
  postId: string;
  createdAt: Date;
};

type Comment = {
  id: string;
  postId: string;
  content: string;
  createdAt: Date;
  profile: Partial<Profile>;
  likeCount: number;
};
