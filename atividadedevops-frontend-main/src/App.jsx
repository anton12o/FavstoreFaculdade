import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import ShopPage from './pages/ShopPage';
import FavoritesPage from './pages/FavoritesPage';

function StoreLayout({ children }) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/shop" replace />} />
          <Route path="/shop" element={<StoreLayout><ShopPage /></StoreLayout>} />
          <Route path="/favorites" element={<StoreLayout><FavoritesPage /></StoreLayout>} />
          <Route path="*" element={<Navigate to="/shop" replace />} />
        </Routes>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#FFFFFF',
              color: '#1A1917',
              border: '0.5px solid #E8E6E1',
              borderRadius: '4px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13px',
            },
          }}
        />
      </BrowserRouter>
    </AppProvider>
  );
}