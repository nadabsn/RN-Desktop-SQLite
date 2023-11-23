import React, {useState, useEffect} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  insertUser,
  createTables,
  getAllUsers,
  truncateUsers,
  findUser,
} from './database';
function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    // truncateUsers();
    createTables();
    insertUser('nada@gmail.com', '1234');
    getAllUsers();
  }, []);
  const handleLogin = async () => {
    await findUser(email, password, userExist => {
      setUserExists(userExist);
    });
  };

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <View style={{height: 50}}></View>

      {userExists ? (
        <Text style={{fontSize: 20, color: 'green'}}>User Exists</Text>
      ) : (
        <Text style={{fontSize: 20, color: 'red'}}>User does not Exist</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default App;
