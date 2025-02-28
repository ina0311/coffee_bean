// データベースのモデルに対応する型定義
export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Auth {
  id: number;
  password_hash: string;
  last_login_at?: Date;
  refresh_token?: string;
  refresh_token_expires_at?: Date;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface Coffee {
  id: number;
  name: string;
  description: string;
  price: number;
  created_at: Date;
  updated_at: Date;
}

// APIのリクエスト/レスポンスの型定義
export interface ApiResponse<T> {
  data: T;
  message: string;
}

export interface SignUpParams {
  name: string;
  email: string;
  password: string;
}

export interface SignInParams {
  email: string;
  password: string;
} 