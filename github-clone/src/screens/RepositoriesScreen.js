import { View, StyleSheet, StatusBar, Platform, Button } from 'react-native';
import ProgressBar from '../components/ProgressBar';
import FlatListComponent from '../components/FlatListRepositories';
import { useState } from 'react';


const RepositoriesScreen = ({ route,navigation }) => {
    const [totalRepos, setTotalRepos] = useState(0);
    const [reposList, setReposList] = useState([]);
    
   
    const progressBarFilled = reposList.length > 0 ? reposList.length / totalRepos : 0;
    
    const { token } = route.params;
    
    return (
        <View style={styles.container}>
            <ProgressBar value={progressBarFilled} />
            <FlatListComponent token={token} setTotalRepos={setTotalRepos} setReposList = {setReposList} navigation={navigation}/>
        <Button title='Voltar' onPress={() => navigation.goBack()}/>
        </View>
    )
}

export default RepositoriesScreen;


const styles = StyleSheet.create({

    container: {
        ...Platform.select({
            android: { paddingTop: StatusBar.currentHeight + 15},
        }),
        flex: 1,
        padding: 10,
        backgroundColor: '#111',
    },
});


