import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const IssueDetailsScreen = ({ route, navigation }) => {
    const { issue } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{issue.title}</Text>
            <Text style={styles.body}>{issue.body || 'Nenhuma descrição disponível.'}</Text>
            <Text style={styles.state}>Estado desta Issue: {issue.state=== 'open' ? 'Aberto' : 'Fechado'}</Text>
            <Button title="Voltar" onPress={() => navigation.goBack()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#222' },
    title: { fontSize: 20, fontWeight: 'bold', margin: 10, color: 'white'},
    body: {  fontSize: 16, color: 'white', margin:10,},
    state: { marginTop: 10, color: 'coral', margin:10, },
    
});

export default IssueDetailsScreen;
