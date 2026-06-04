import { useEffect } from 'react';
import Navegacion from './src/navigation/Navegacion';
import { useFavoritosStore } from './src/store/FavoritosStore';

export default function App() {
  const cargarFavoritos = useFavoritosStore((state) => state.cargarFavoritos);

  useEffect(() => {
    cargarFavoritos();
  }, []);

  return <Navegacion />;
}