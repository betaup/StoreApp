import { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { obtenerProductos } from '../api/productos';
import { Producto } from '../types/producto';
import { StackParams } from '../navigation/Navegacion';

type NavegacionTipo = NativeStackNavigationProp<StackParams>;

export default function PantallaInicio() {
    const navegacion = useNavigation<NavegacionTipo>();
    const [productos, setProductos] = useState<Producto[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        obtenerProductos()
        .then((datos) => setProductos(datos))
        .catch(() => setError('No se pudieron cargar los productos'))
        .finally(() => setCargando(false));
    }, []);

    if (cargando) {
        return (
        <View style={estilos.centrado}>
            <ActivityIndicator size="large" />
        </View>
        );
    }

    if (error) {
        return (
        <View style={estilos.centrado}>
            <Text>{error}</Text>
        </View>
        );
    }

    return (
        <FlatList
        data={productos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <TouchableOpacity
            style={estilos.tarjeta}
            onPress={() => navegacion.navigate('Detalle', { id: item.id })}
            >
            <Image source={{ uri: item.image }} style={estilos.imagen} />
            <View style={estilos.info}>
                <Text style={estilos.titulo} numberOfLines={2}>{item.title}</Text>
                <Text style={estilos.precio}>${item.price}</Text>
            </View>
            </TouchableOpacity>
        )}
        />
    );
}

const estilos = StyleSheet.create({
    centrado: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tarjeta: {
        flexDirection: 'row',
        padding: 12,
        marginVertical: 6,
        marginHorizontal: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2, 
    },
    imagen: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    info: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 14,
        marginBottom: 4,
    },
    precio: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2a9d8f',
    },
});