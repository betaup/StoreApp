import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PantallaInicio from '../screens/PantallaInicio';
import PantallaDetalle from '../screens/PantallaDetalle';
import PantallaFavoritos from '../screens/PantallaFavoritos';

// Tipos para los params de cada pantalla del stack
export type StackParams = {
    Inicio: undefined;
    Detalle: { id: number };
};

const Stack = createNativeStackNavigator<StackParams>();
const Tab = createBottomTabNavigator();

// Las tabs solo manejan el stack principal y favoritos
function Tabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Catalogo" component={StackInicio} options={{ headerShown: false }} />
            <Tab.Screen name="Favoritos" component={PantallaFavoritos} />
        </Tab.Navigator>
    );
}

// Stack separado para poder navegar a Detalle desde Inicio
function StackInicio() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Inicio" component={PantallaInicio} />
            <Stack.Screen name="Detalle" component={PantallaDetalle} />
        </Stack.Navigator>
    );
}

export default function Navegacion() {
    return (
        <NavigationContainer>
        <Tabs />
        </NavigationContainer>
    );
}