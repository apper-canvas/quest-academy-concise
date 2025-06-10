import HomePage from '@/components/pages/HomePage';
import MathWorldPage from '@/components/pages/MathWorldPage';
import ReadingLandPage from '@/components/pages/ReadingLandPage';
import MyRewardsPage from '@/components/pages/MyRewardsPage';
import SettingsPage from '@/components/pages/SettingsPage';

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: 'Home',
component: HomePage
  },
  math: {
    id: 'math',
    label: 'Math World',
    path: '/math',
    icon: 'Calculator',
component: MathWorldPage
  },
  reading: {
    id: 'reading',
    label: 'Reading Land',
    path: '/reading',
    icon: 'BookOpen',
component: ReadingLandPage
  },
  rewards: {
    id: 'rewards',
    label: 'My Rewards',
    path: '/rewards',
    icon: 'Trophy',
component: MyRewardsPage
  },
  settings: {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: 'Settings',
component: SettingsPage
  }
};

export const routeArray = Object.values(routes);