import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

import { useAuth } from '../../contexts/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  username: {
    fontSize: 20,
    marginBottom: 40,
  },
});

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();

  function handleSignOut() {
    signOut();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.username}>{user?.name}</Text>
      <Button onPress={handleSignOut} title="Sign out" />
    </View>
  );
};

export default Dashboard;
