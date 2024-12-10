import axios from 'axios';

const BASE_URL = 'https://images-api.nasa.gov/search?';

export const fetchImages = async (query, page) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: { q: query, page },
        });

        // console.log('Response data:',response.data.collection.items);
        
        return response.data.collection.items;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
};
