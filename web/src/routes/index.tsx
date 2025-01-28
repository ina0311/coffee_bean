import { pageConfigs } from '../pages/Index'
import { RouteObject } from 'react-router-dom'

// ルートの型定義
export const routes: RouteObject[] = pageConfigs.map(({ component: Component, path }) => ({
  path,
  element: <Component />,
}))