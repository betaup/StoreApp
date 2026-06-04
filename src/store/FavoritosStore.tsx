import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Producto } from '../types/producto';

const CLAVE_STORAGE = 'favoritos';

interface FavoritosStore {
    favoritos: Producto[];
        cargarFavoritos: () => Promise<void>;
        agregarFavorito: (producto: Producto) => Promise<void>;
        quitarFavorito: (id: number) => Promise<void>;
        esFavorito: (id: number) => boolean;
    }

    export const useFavoritosStore = create<FavoritosStore>((set, get) => ({
        favoritos: [],

        // Lee los favoritos guardados al abrir la app
        cargarFavoritos: async () => {
            const datos = await AsyncStorage.getItem(CLAVE_STORAGE);
            if (datos) {
                set({ favoritos: JSON.parse(datos) });
            }
        },

        agregarFavorito: async (producto) => {
            const nuevos = [...get().favoritos, producto];
            set({ favoritos: nuevos });
            await AsyncStorage.setItem(CLAVE_STORAGE, JSON.stringify(nuevos));
        },

        quitarFavorito: async (id) => {
            const nuevos = get().favoritos.filter((p) => p.id !== id);
            set({ favoritos: nuevos });
            await AsyncStorage.setItem(CLAVE_STORAGE, JSON.stringify(nuevos));
        },

        // Revisa si un producto ya esta en favoritos
        esFavorito: (id) => {
            return get().favoritos.some((p) => p.id === id);
        },
}));