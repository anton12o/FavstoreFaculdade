import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { authApi, favoritesApi, setAuthUser } from '../services/api';
import toast from 'react-hot-toast';

const AppContext = createContext(null);

const STORAGE_KEY = 'favstore_user';

export function AppProvider({ children }) {
  const [user, setUser]               = useState(null);
  const [favorites, setFavorites]     = useState(() => new Set());
  const [allProducts, setAllProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);

  const favoritesRef = useRef(favorites);
  favoritesRef.current = favorites;

  useEffect(() => {
    setProductsLoading(true);
    fetch('https://fakestoreapi.com/products/category/jewelery')
      .then(r => r.json())
      .then(data => setAllProducts(data))
      .catch(() => toast.error('Erro ao carregar produtos'))
      .finally(() => setProductsLoading(false));
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed);
        setAuthUser(parsed);
        loadFavorites(parsed.id);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setAuthLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadFavorites = useCallback(async (userId) => {
    try {
      const { data } = await favoritesApi.list(userId);
      const ids = data.map(f => f.productId ?? f.id);
      setFavorites(new Set(ids));
    } catch { /* backend pode estar offline */ }
  }, []);

  const register = useCallback(async ({ name, email }) => {
    const { data } = await authApi.register({ name, email });
    setUser(data);
    setAuthUser(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    loadFavorites(data.id);
    return data;
  }, [loadFavorites]);

  const logout = useCallback(() => {
    setUser(null);
    setFavorites(new Set());
    setAuthUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const toggleFavorite = useCallback((product) => {
    const wasFav = favoritesRef.current.has(product.id);
    setFavorites((prev) => {
      if (prev.has(product.id)) {
        const s = new Set(prev);
        s.delete(product.id);
        return s;
      }
      return new Set([...prev, product.id]);
    });
    toast.success(wasFav ? 'Removido dos salvos' : 'Adicionado aos salvos!');
  }, []);

  return (
    <AppContext.Provider value={{
      user, authLoading,
      favorites,
      allProducts, productsLoading,
      register, logout,
      toggleFavorite,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
