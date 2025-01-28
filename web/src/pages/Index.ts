import { Home } from './Home'


export interface PageComponent {
  component: React.ComponentType;
  path: string;
}

// ページコンポーネントをマッピング
export const pages = {
  Home,
} as const

// ルート設定
export const pageConfigs: PageComponent[] = [
  {
    component: pages.Home,
    path: '/',
  },
]
