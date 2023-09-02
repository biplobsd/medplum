import { getDisplayString, LoginAuthenticationResponse, MedplumClient, ProfileResource } from '@medplum/core';
import { polyfillMedplumWebAPIs } from '@medplum/expo-medplum-polyfills';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const medplum = new MedplumClient({
  // Enter your Medplum connection details here
  // See MedplumClient docs for more details
  baseUrl: 'http://localhost:8103',
  // ------------------------------------------------------------------------------
  // If you are testing this out with your physical Android / iOS device and not an emulator,
  // you will need to put your computer's local IP address here, for example:
  // baseUrl: 'http://192.168.x.x:8103'
  // Metro will usually emit this address in the line: 'Metro waiting on exp://192.168.1.216:8081'
  // but you will need to change the protocol to 'http://' and the port to 8103 (the Medplum server's default) or whatever port your server is using
  // ------------------------------------------------------------------------------
  // clientId: 'MY_CLIENT_ID',
  // projectId: 'MY_PROJECT_ID',
});

// This is a module to get the Medplum client working on React Native by polyfilling a few Web APIs that are missing from the React Native runtime
// On web, this is a no-op
polyfillMedplumWebAPIs(medplum);

export default function App(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState<ProfileResource | undefined>(undefined);

  function startLogin(): void {
    medplum.startLogin({ email, password }).then(handleAuthResponse).catch(console.error);
  }

  function handleAuthResponse(response: LoginAuthenticationResponse): void {
    if (response.code) {
      handleCode(response.code);
    }
    if (response.memberships) {
      // TODO: Handle multiple memberships
      // In a real app, you would present a list of memberships to the user
      // For this example, just use the first membership
      medplum
        .post('auth/profile', {
          login: response.login,
          profile: response.memberships[0].id,
        })
        .then(handleAuthResponse)
        .catch(console.error);
    }
  }

  function handleCode(code: string): void {
    medplum.processCode(code).then(setProfile).catch(console.error);
  }

  function signOut(): void {
    setProfile(undefined);
    medplum.signOut().catch(console.error);
    sessionStorage.clear();
  }

  return (
    <View style={styles.container}>
      <Text>Medplum React Native Example</Text>
      {!profile ? (
        <>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#003f5c"
              onChangeText={(email) => setEmail(email)}
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>
          <Button onPress={startLogin} title="Sign in" />
        </>
      ) : (
        <>
          <Text>Logged in as {getDisplayString(profile)}</Text>
          <Button onPress={signOut} title="Sign out" />
        </>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});
