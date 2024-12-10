import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, useWindowDimensions } from 'react-native';
import { getUserInfo } from '../api/githubApi';



const UserInfoScreen = ({ route, navigation }) => {

    const { width, height } = useWindowDimensions();
    const isPortrait = height >= width;

    const { token } = route.params;
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        getUserInfo(token).then(data => setUserInfo(data));
    }, [token]);

    if (!userInfo) return <Text>Carregando...</Text>;


    // console.log('User info: ', userInfo);

    return (
        <View style={[isPortrait ? styles.container : styles.containerLandscape]}>

            <Image style={styles.avatar} source={{ uri: userInfo.avatar_url }} />

            <View style={[isPortrait ? styles.semiContainer : styles.semiContainerLandscape]}>
                <Text style={styles.title}>Bem-vindo, {userInfo.name}</Text>
                <Text style={styles.text}>Usuário: {userInfo.login}</Text>
                <Text style={styles.text}>Email: {userInfo.email? userInfo.email : 'Sem privilegios de visualização de email'}</Text>
                <Text style={styles.text}>Bio: {userInfo.bio? userInfo.bio : 'Sem biografia'}</Text>
                <View style={[isPortrait ? styles.buttonContainer : styles.buttonContainerLandscape]}>
                    <Button onPress={() => navigation.navigate('Repositories', { token })} title="Ir para Repositórios" />

                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111' },
    title: { fontSize: 24, marginBottom: 10, color: 'white' },
    avatar: { width: 200, height: 200, borderRadius: 150, marginBottom: 10 },
    containerLandscape: { padding: 20, flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: '#111' },
    semiContainerLandscape: { justifyContent: 'center', alignItems: 'center', margin: 22 },
    text: { marginBottom: 5, color: 'white' },
    semiContainer: { flex: 0, justifyContent: 'center', alignItems: 'center', margin: 22 },
    buttonContainer: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 20, gap: 10 },
    buttonContainerLandscape: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 20, gap: 10 },

});





export default UserInfoScreen;
