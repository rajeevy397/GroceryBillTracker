import * as React from 'react';
import { Button, View, Text, ActivityIndicator } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

export default function HomeScreen({ navigation }) {
  const [userInfo, setUserInfo] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      '139110344231-666c39mm829d5sthatk8gj529q3nf3mh.apps.googleusercontent.com',
    webClientId:
      '139110344231-obn13b0e1trmimlslps5rguutuotpram.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      handleSignWithGoogle(response);
    }
  }, [response]);

  const handleSignWithGoogle = async (response) => {
    const user = await AsyncStorage.getItem('@user');
    if (!user && response?.type === 'success') {
      await getUserInfo(response.authentication.accessToken);
    } else {
      setUserInfo(JSON.parse(user));
    }
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@user');
    setUserInfo(null);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{JSON.stringify(userInfo)}</Text>
      <Button
        title="Go to Billing Screen"
        onPress={() => navigation.navigate('BillingScreen')}
      />
      <Button title="Sign In With Google" onPress={() => promptAsync()} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
