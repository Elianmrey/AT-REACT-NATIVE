import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform, StatusBar,useWindowDimensions } from 'react-native';
 import { API_TOKEN as apiToken } from '../../env'; // meu token para ñ ter que copiar ele no campo de tokem e poder testar
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const AuthScreen = ({ navigation }) => {
    const [token, setToken] = useState('');
    
    const { width, height } = useWindowDimensions();
    const isPortrait = height >= width;

    
        useEffect(() => {
                  
        if (apiToken) {
            setToken(apiToken);
          
            }
    }, []);


    const  handleLogin =async () => {
        if (token.trim()) {
            navigation.navigate('UserInfo', { token });
          await  AsyncStorage.setItem('token', apiToken);
        } else {
            alert('Por favor, insira o token.');
        }
    };

    return (
        <View style={[styles.generalContainer, isPortrait ? styles.generalContainer : styles.landscapeOrientation,]}>
            <Image source={require('../../assets/github-logo.png')} style={{ width: 200, height: 200 }} />
        <View style={[styles.container, isPortrait ? styles.container : styles.landscapeContainer]}>
            <Text style={styles.title}>Login com GitHub</Text>
            <TextInput
                style={styles.input}
                placeholder="Token GitHub"
                value={token}
                onChangeText={setToken}
            />
            <Button title="Entrar" onPress={handleLogin} />
            </View>
        </View> 
    );
};

const styles = StyleSheet.create({
    generalContainer: {
        padding: 10,
        ...Platform.select({
            android: {
                paddingTop: StatusBar.currentHeight,
            },
           default: { paddingTop: 15 },
        }),
        
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111',
    },
    landscapeOrientation: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    landscapeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
    },
    container: {justifyContent: 'center', padding: 20},
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        color: 'white',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        color: 'white',
    },
   
});

export default AuthScreen;
