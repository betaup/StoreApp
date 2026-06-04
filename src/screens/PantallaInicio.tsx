import { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { obtenerProductos, obtenerCategorias } from '../api/productos';
import { Producto } from '../types/producto';
import { StackParams } from '../navigation/Navegacion';

type NavegacionTipo = NativeStackNavigationProp<StackParams>;

export default function PantallaInicio() {
    const navegacion = useNavigation<NavegacionTipo>();
    const [productos, setProductos] = useState<Producto[]>([]);
    const [categorias, setCategorias] = useState<string[]>([]);
    const [categoriaActiva, setCategoriaActiva] = useState('todas');
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    // sirve para simular red lenta y ver el spinner
    // useEffect(() => {
    //   setTimeout(() => {
    //     Promise.all([obtenerProductos(), obtenerCategorias()])
    //       .then(([datosProductos, datosCategorias]) => {
    //         setProductos(datosProductos);
    //         setCategorias(['todas', ...datosCategorias]);
    //       })
    //       .catch(() => setError('No se pudieron cargar los productos'))
    //       .finally(() => setCargando(false));
    //   }, 2000);
    // }, []);

    useEffect(() => {
        Promise.all([obtenerProductos(), obtenerCategorias()])
        .then(([datosProductos, datosCategorias]) => {
            setProductos(datosProductos);
            setCategorias(['todas', ...datosCategorias]);
        })
        .catch(() => setError('No se pudieron cargar los productos'))
        .finally(() => setCargando(false));
    }, []);

    const productosFiltrados = categoriaActiva === 'todas'
        ? productos
        : productos.filter((p) => p.category === categoriaActiva);

    if (cargando) {
        return (
        <View style={estilos.centrado}>
            <ActivityIndicator size="large" color="#0071CE" />
            <Text style={estilos.cargandoTexto}>Cargando productos...</Text>
        </View>
        );
    }

    if (error) {
        return (
        <View style={estilos.centrado}>
            <Text style={estilos.errorTexto}>{error}</Text>
        </View>
        );
    }

    return (
        <View style={estilos.contenedor}>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={estilos.filtroCont}
        >
            {categorias.map((cat) => (
            <TouchableOpacity
                key={cat}
                style={[estilos.filtroBoton, categoriaActiva === cat && estilos.filtroActivo]}
                onPress={() => setCategoriaActiva(cat)}
            >
                <Text
                style={[estilos.filtroTexto, categoriaActiva === cat && estilos.filtroTextoActivo]}
                numberOfLines={2}
                textBreakStrategy="simple"
                >
                {cat}
                </Text>
            </TouchableOpacity>
            ))}
        </ScrollView>

        <FlatList
            data={productosFiltrados}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <TouchableOpacity
                style={estilos.tarjeta}
                onPress={() => navegacion.getParent()?.navigate('Detalle', { id: item.id })}
            >
                <Image source={{ uri: item.image }} style={estilos.imagen} />
                <View style={estilos.info}>
                <Text style={estilos.titulo} numberOfLines={2}>{item.title}</Text>
                <Text style={estilos.precio}>${item.price}</Text>
                </View>
            </TouchableOpacity>
            )}
        />
        </View>
    );
}

const estilos = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    centrado: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
    },
    cargandoTexto: {
        marginTop: 10,
        color: '#0071CE',
        fontSize: 14,
    },
    errorTexto: {
        color: '#cc0000',
        fontSize: 14,
    },
    filtroCont: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        maxHeight: 47,
    },
    filtroBoton: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: '#fff',
        marginRight: 8,
        minWidth: 80,
        alignItems: 'center',
    },
    filtroActivo: {
        backgroundColor: '#0071CE',
    },
    filtroTexto: {
        fontSize: 13,
        color: '#444',
        textTransform: 'capitalize',
    },
    filtroTextoActivo: {
        color: '#fff',
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
        color: '#333333',
    },
    precio: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0071CE',
    },
});