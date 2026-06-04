import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { obtenerProductoPorId } from '../api/productos';
import { Producto } from '../types/producto';
import { StackParams } from '../navigation/Navegacion';
import { useFavoritosStore } from '../store/FavoritosStore';

type Props = NativeStackScreenProps<StackParams, 'Detalle'>;

export default function PantallaDetalle({ route }: Props) {
    const { id } = route.params;
    const [producto, setProducto] = useState<Producto | null>(null);
    const { agregarFavorito, quitarFavorito, esFavorito } = useFavoritosStore();
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        obtenerProductoPorId(id)
        .then((datos) => setProducto(datos))
        .catch(() => setError('No se pudo cargar el producto'))
        .finally(() => setCargando(false));
    }, [id]);

    if (cargando) {
        return (
        <View style={estilos.centrado}>
            <ActivityIndicator size="large" />
        </View>
        );
    }

    if (error || !producto) {
        return (
        <View style={estilos.centrado}>
            <Text>{error || 'Producto no encontrado'}</Text>
        </View>
        );
    }

    const yaEsFavorito = esFavorito(producto.id);

    return (
        <ScrollView contentContainerStyle={estilos.contenedor}>
        <Image source={{ uri: producto.image }} style={estilos.imagen} />
        <Text style={estilos.categoria}>{producto.category}</Text>
        <Text style={estilos.titulo}>{producto.title}</Text>
        <Text style={estilos.precio}>${producto.price}</Text>
        <Text style={estilos.descripcion}>{producto.description}</Text>

        <TouchableOpacity
            style={[estilos.boton, yaEsFavorito && estilos.botonActivo]}
            onPress={() => yaEsFavorito ? quitarFavorito(producto.id) : agregarFavorito(producto)}
        >
            <Text style={estilos.botonTexto}>
                {yaEsFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            </Text>
        </TouchableOpacity>
        </ScrollView>
    );
}

const estilos = StyleSheet.create({
    centrado: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contenedor: {
        padding: 16,
        alignItems: 'center',
    },
    imagen: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 16,
    },
    categoria: {
        fontSize: 12,
        color: '#888',
        textTransform: 'capitalize',
        marginBottom: 4,
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    precio: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0071CE',
        marginBottom: 12,
    },
    descripcion: {
        fontSize: 14,
        color: '#444',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 24,
    },
    boton: {
        backgroundColor: '#0071CE',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
    },
    botonTexto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    botonActivo: {
        backgroundColor: '#FFC220',
    },
});