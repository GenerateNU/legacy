import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import { useAuth } from '../contexts/AuthContext';

export default function Router() {
    const {user} = useAuth();

    return <NavigationContainer>
        {user ? <AppStack /> : <AuthStack />}

    </NavigationContainer>
}