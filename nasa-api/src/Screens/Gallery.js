import { useState, useEffect } from 'react';
import { FlatList, TextInput, View,StyleSheet, ActivityIndicator,useWindowDimensions } from 'react-native';
import { fetchImages } from '../Api/ApiConnect';  
import ImageCard from '../Components/ImageCard.js';
import ProgressBar from '../Components/ProgressBarComp';

const GalleryScreen = ({ navigation }) => {

    const {height, width} = useWindowDimensions()
    isPortrait = height > width

    const [astro, setAstro] = useState('earth');

    const [page, setPage] = useState(1);
    
    const [images, setImages] = useState([]);
    
    const [loading, setLoading] = useState(false);
    
    const [totalItems, setTotalItems] = useState(0); 

    const loadImages = async (refresh = false) => {
        if (loading) return; 
        setLoading(true);

        try {
            const newImages = await fetchImages(astro, refresh ? page+1 : page);

            if (Array.isArray(newImages) && newImages.length > 0) {
                    const processedImages = newImages.map(item => {
                    if (item.data && Array.isArray(item.data) && item.data.length > 0) {
                     const imageDetails = item.data[0];  
                      const imageLink = item.links && Array.isArray(item.links) ? item.links[0]?.href : null;
                     const title = imageDetails?.title || 'Sem informação disponivel';
                    const description = imageDetails?.description || 'Sem informação disponivel';

                        if (imageLink) {
                            return {
                                href: imageLink,
                                title: title,
                                description: description,
                            };
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                }).filter(Boolean);

                setImages(refresh ? processedImages : [...images, ...processedImages]);
                setTotalItems(newImages.length); 

                if (refresh) {
                    setPage(2);
                } else {
                    setPage(page + 1);
                }
            }
        } catch (error) {
            console.error('Erro ao carregar as imagens:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadImages(true);
    }, [astro]);  

    return (
        <View style={isPortrait ? styles.container : styles.landscape}>
            <TextInput placeholder="Buscar entre as imagens da Nasa..." value={astro} onChangeText={setAstro} style={styles.text} />
           
            {totalItems > 0 && (
                <ProgressBar progress={(totalItems/ images.length)}/>
            )}
            <FlatList data={images} keyExtractor={(item, index) => `${item.href}_${index}`}
                renderItem={({ item }) => ( <ImageCard image={item.href} title={item.title}     
                description={item.description} onPress={() => navigation.navigate('ImageDetails', { imageDetails: item })}/>
                )} onEndReached={() => { 
                    if (!loading) {
                        loadImages();
                    }
                }} onEndReachedThreshold={0.5} onRefresh={() => loadImages(true)} refreshing={loading} ListFooterComponent={loading && <ActivityIndicator />} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
     flex: 1,
     padding: 10,
     backgroundColor: '#111',
    },
    text: {
     marginBottom: 10,
     padding: 10,
     backgroundColor: '#444',
     borderWidth: 1,
     borderColor: '#FFF',
     fontSize: 16,
     fontWeight: 'bold',
     textAlign: 'center',
     borderRadius: 25,
     color: '#FFF',
    },
    landscape: {
     flex: 1,
     padding: 10,
     backgroundColor: '#111',
        
    },
});
export default GalleryScreen;
