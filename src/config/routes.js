import Home from '../pages/Home';
import MathWorld from '../pages/MathWorld';
import ReadingLand from '../pages/ReadingLand';
import MyRewards from '../pages/MyRewards';
import Settings from '../pages/Settings';

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: 'Home',
    component: Home
  },
  math: {
    id: 'math',
    label: 'Math World',
    path: '/math',
    icon: 'Calculator',
    component: MathWorld
  },
  reading: {
    id: 'reading',
    label: 'Reading Land',
    path: '/reading',
    icon: 'BookOpen',
    component: ReadingLand
  },
  rewards: {
    id: 'rewards',
    label: 'My Rewards',
    path: '/rewards',
    icon: 'Trophy',
    component: MyRewards
  },
  settings: {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: 'Settings',
    component: Settings
  }
};

export const routeArray = Object.values(routes);