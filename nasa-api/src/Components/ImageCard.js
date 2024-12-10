import { Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ImageCard = ({ image, title, description, onPress }) => {
   
    const imageUrl = image ? image : '../../assets/noimg.jpg'; 

    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
            <Image source={{ uri: imageUrl }} style={styles.image} onError={() => console.warn('Erro ao carregar a imagem.')} />
            <Text style={styles.title} numberOfLines={1}>
                {title || 'Sem título'} 
            </Text>
            {description && (
                <Text style={styles.description} numberOfLines={3}>
                    {description || 'Sem descrição'}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 2,
        backgroundColor: 'indigo',
    },
    image: {
        width: '100%',
        height: 150,
        backgroundColor: '#222',  
    },
    title: {
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'orange',
    },
    description: {
        paddingHorizontal: 10,
        paddingBottom: 20,
        fontSize: 14,
        color: '#FFF',
    },
});

export default ImageCard;
