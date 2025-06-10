import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './Layout';
import Home from './pages/Home';
import MathWorld from './pages/MathWorld';
import ReadingLand from './pages/ReadingLand';
import Lesson from './pages/Lesson';
import MyRewards from './pages/MyRewards';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="math" element={<MathWorld />} />
            <Route path="reading" element={<ReadingLand />} />
            <Route path="lesson/:id" element={<Lesson />} />
            <Route path="rewards" element={<MyRewards />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
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