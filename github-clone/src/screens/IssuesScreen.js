import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { getIssues } from '../api/githubApi';

export default function IssuesScreen({ route, navigation }) {
    const { token, item} = route.params;
    const [issues, setIssues] = useState([]);


   

    const fetchIssues = async () => {
        const response = await getIssues(token, item.owner.login, item.name);
    setIssues(response);
        console.log("Carregando issues...: ", item.owner.login);
 }

    useEffect(() => {
        fetchIssues();
         
    }, []);

    

    const handleStateChange = (index) => {
        const updatedIssues = [...issues];
        if (updatedIssues[index].state === 'open') {
            updatedIssues[index].state = 'closed';
        } else {
            updatedIssues[index].state = 'open';
        }
    
        setIssues(updatedIssues); 
    };

    const renderRightActions = (index) => (
        <RectButton style={styles.swipeButton} onPress={() => handleStateChange(index)}>
            <Text style={styles.swipeText}>Alterar Estado da Issue</Text>
        </RectButton>
    ); //PODE DAR ERRO SE O TOKEM NÃO TIVER PRIVILEGIOS PARA ESCREVER O ESTADO DA iSSUE
    

    return (
        <View style={styles.container}>
            <FlatList
                data={issues}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <Swipeable renderRightActions={() => renderRightActions(index)}>
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => navigation.navigate('IssueDetails', { issue: item })}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.stateIssue}>{`Estado: ${item.state}`}</Text>
                        </TouchableOpacity>
                    </Swipeable>
                )}
            />
            <TouchableOpacity
                style={styles.createButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: '#222' },
    item: { padding: 15, backgroundColor: 'indigo', marginVertical: 8, borderRadius: 5 },
    title: { fontSize: 18, fontWeight: 'bold', color: 'white' },
    stateIssue: { marginTop: 5, color: 'white' },
    swipeButton: { backgroundColor: '#ff9800', justifyContent: 'center', flex: 1, alignItems: 'center' },
    swipeText: { color: '#fff', fontWeight: 'bold' },
    createButton: { backgroundColor: '#007bff', padding: 15, borderRadius: 5, marginTop: 10 },
    buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
