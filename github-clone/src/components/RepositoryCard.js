import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';


const RepositoryCard = ({ repo, onPress }) => (

    <TouchableOpacity style={styles.card} onPress={onPress}>
        {/* { console.log(repo) } */}
        <Text style={styles.name}>{repo.name}</Text>
        <Text style={styles.text}>{repo.visibility? 'Publico': 'Privado'}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    card: { padding: 15, margin: 10, backgroundColor: 'indigo', borderRadius: 5 },
    name: { fontSize: 16, fontWeight: 'bold', color: 'white' },
    text: { margin: 5, color: 'white' },
});

export default RepositoryCard;
