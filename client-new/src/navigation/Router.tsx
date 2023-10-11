import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

export default function Router() {
    const [authData, setAuthData] = useState(false);

    return <NavigationContainer>
        {authData ? <AppStack /> : <AuthStack />}

    </NavigationContainer>
}