import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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

// El tab solo vive en la pantalla de inicio
function TabsNavegacion() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="CatalogoTab"
                component={PantallaInicio}
                options={{ title: 'Catalogo', headerShown: true }}
            />
            <Tab.Screen
                name="FavoritosTab"
                component={PantallaFavoritos}
                options={{ title: 'Favoritos' }}
            />
        </Tab.Navigator>
    );
}

// El stack envuelve todo, incluyendo los tabs
export default function Navegacion() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* La pantalla principal contiene los tabs */}
                <Stack.Screen
                name="Inicio"
                component={TabsNavegacion}
                options={{ headerShown: false }}
                />
                {/* Detalle vive fuera de los tabs para ocupar toda la pantalla */}
                <Stack.Screen
                name="Detalle"
                component={PantallaDetalle}
                options={{ title: 'Detalle del producto' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}