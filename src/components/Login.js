import React from 'react';
import { Alert, View } from 'react-native';
import { AccessToken, LoginButton, LoginManager } from 'react-native-fbsdk';

LoginManager.logInWithReadPermissions(['public_profile']).then(
  result => {
    if (result.isCancelled) {
      Alert.alert('Login cancelled');
    } else {
      Alert.alert(`Login success with permissions: ${result.grantedPermissions.toString()}`);
    }
  },
  error => {
    Alert.alert(`Login fail with error: ${error}`);
  },
);

const Login = () => (
  <View>
    <LoginButton
      publishPermissions={['public_profile']}
      onLoginFinished={
        (error, result) => {
          if (error) {
            Alert.alert(`login has error: ${result.error}`);
          } else if (result.isCancelled) {
            Alert.alert('login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken()
              .then(data => Alert.alert(data.accessToken.toString()));
          }
        }
      }
      onLogoutFinished={() => Alert.alert('logout.')}
    />
  </View>
);

export default Login;
