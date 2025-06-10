import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './Layout';
import HomePage from '@/components/pages/HomePage';
import MathWorldPage from '@/components/pages/MathWorldPage';
import ReadingLandPage from '@/components/pages/ReadingLandPage';
import LessonPage from '@/components/pages/LessonPage';
import MyRewardsPage from '@/components/pages/MyRewardsPage';
import SettingsPage from '@/components/pages/SettingsPage';
import NotFoundPage from '@/components/pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Layout />}>
<Route index element={<HomePage />} />
            <Route path="math" element={<MathWorldPage />} />
            <Route path="reading" element={<ReadingLandPage />} />
            <Route path="lesson/:id" element={<LessonPage />} />
            <Route path="rewards" element={<MyRewardsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className="z-[9999]"
          toastClassName="rounded-lg shadow-lg"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;