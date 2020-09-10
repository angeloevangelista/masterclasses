import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import * as authService from '../services/auth';
import api from '../services/api';

interface User {
  name: string;
  email: string;
}

export interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
      const storagedToken = await AsyncStorage.getItem('@RNAuth:token');

      setLoading(false);
      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        api.defaults.headers.Authorization = `Beare ${storagedToken}`;
      }
    }

    loadStoragedData();
  }, []);

  async function signIn() {
    const response = await authService.signIn();

    setUser(response.user);

    api.defaults.headers.Authorization = `Beare ${response.token}`;

    AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
    AsyncStorage.setItem('@RNAuth:token', response.token);
  }

  async function signOut() {
    await Promise.all([
      AsyncStorage.removeItem('@RNAuth:user'),
      AsyncStorage.removeItem('@RNAuth:token'),
    ]);

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
