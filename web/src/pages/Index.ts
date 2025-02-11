import { Home } from './Home'
import { SignUp } from './Auth/SignUp'


export interface PageComponent {
  component: React.ComponentType;
  path: string;
}

// ページコンポーネントをマッピング
export const pages = {
  Home,
  SignUp
} as const

// ルート設定
export const pageConfigs: PageComponent[] = [
  {
    component: pages.Home,
    path: '/',
  },
  {
    component: pages.SignUp,
    path: '/signup'
  }
]
