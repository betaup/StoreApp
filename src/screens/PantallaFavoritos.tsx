import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useFavoritosStore } from '../store/FavoritosStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../navigation/Navegacion';

type NavegacionTipo = NativeStackNavigationProp<StackParams>;

export default function PantallaFavoritos() {
    const navegacion = useNavigation<NavegacionTipo>();
    const { favoritos } = useFavoritosStore();

    if (favoritos.length === 0) {
        return (
        <View style={estilos.centrado}>
            <Text style={estilos.vacio}>No tienes favoritos guardados</Text>
        </View>
        );
    }

    return (
        <FlatList
        data={favoritos}
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
    );
}

const estilos = StyleSheet.create({
    centrado: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    vacio: {
        fontSize: 16,
        color: '#888',
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
        color: '#0071CE',
    },
});