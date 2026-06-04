import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import PantallaInicio from '../screens/PantallaInicio';
import PantallaDetalle from '../screens/PantallaDetalle';
import PantallaFavoritos from '../screens/PantallaFavoritos';

export type StackParams = {
    Inicio: undefined;
    Detalle: { id: number };
};

export type TabParams = {
    CatalogoTab: undefined;
    FavoritosTab: undefined;
};

const Stack = createNativeStackNavigator<StackParams>();
const Tab = createBottomTabNavigator<TabParams>();

function TabsNavegacion() {
    return (
        <Tab.Navigator
        screenOptions={{
            tabBarActiveTintColor: '#0071CE',
            tabBarInactiveTintColor: '#888',
            tabBarStyle: {
            backgroundColor: '#fff',
            borderTopColor: '#e0e0e0',
            },
            headerStyle: {
            backgroundColor: '#0071CE',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold',
            },
        }}
        >
        <Tab.Screen
            name="CatalogoTab"
            component={PantallaInicio}
            options={{
            title: 'Catalogo',
            headerShown: true,
            tabBarIcon: ({ color, size, focused }) => (
                <Ionicons
                name={focused ? 'storefront' : 'storefront-outline'}
                size={size}
                color={color}
                />
            ),
            }}
        />
        <Tab.Screen
            name="FavoritosTab"
            component={PantallaFavoritos}
            options={{
            title: 'Favoritos',
            tabBarIcon: ({ color, size, focused }) => (
                <Ionicons
                name={focused ? 'star' : 'star-outline'}
                size={size}
                color={color}
                />
            ),
            }}
        />
        </Tab.Navigator>
    );
}

export default function Navegacion() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                name="Inicio"
                component={TabsNavegacion}
                options={{ headerShown: false }}
                />
                <Stack.Screen
                name="Detalle"
                component={PantallaDetalle}
                options={{
                    title: 'Detalle del producto',
                    headerStyle: {
                    backgroundColor: '#0071CE',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                    fontWeight: 'bold',
                    },
                }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}