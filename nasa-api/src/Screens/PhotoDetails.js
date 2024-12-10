
import { Text, Image, View, StyleSheet, useWindowDimensions } from 'react-native';

const PhotoDetails = ({ route }) => {
    const {height, width} = useWindowDimensions()
    isPortrait = height > width

    const { imageDetails } = route.params;

   
    const imageUrl = imageDetails?.href || '../../assets/noimg.jpg'; 
    const title = imageDetails?.title || 'Sem título disponível';
    const description = imageDetails?.description || 'Sem descrição disponível';

    return (
        <View style={isPortrait ? styles.container : styles.landscape } >
            <View style={isPortrait ? styles.imageContainer: styles.landscapeImageContainer}>
                <Image source={{ uri: imageUrl }} style={isPortrait ? styles.image : styles.imagelandscape} resizeMode="contain" />
            </View>
            <View style={isPortrait ?styles.textContainer: styles.landscapeTextContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description} </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'indigo',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: 300,
    },
    imagelandscape: {
        width: '50%',
        height:400,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        color: 'orange',
    },
    description: {
        fontSize: 16,
        color: 'white',
    },
    landscape: {
      backgroundColor: 'indigo',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',

    },
    landscapeImageContainer: {
        alignItems: 'center',
        width: '60%',
        height: 400,
        
    },
    landscapeTextContainer: {
        alignItems: 'center',
        width: '40%',
        padding: 30,
    },
});

export default PhotoDetails;
