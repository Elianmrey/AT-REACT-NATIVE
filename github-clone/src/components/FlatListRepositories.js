import { FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { getRepositories } from '../api/githubApi';
import RepositoryCard from './RepositoryCard';
import  { useState, useEffect } from'react';




const FlatListComponent = ({ token, setTotalRepos, setReposList, navigation }) => {
    
const [repos, setRepos] = useState([]);
const [page, setPage] = useState(1);
const [loading, setLoading] = useState(false);
const [refreshing, setRefreshing] = useState(false);


const fetchRepos = async () => {
    setLoading(true);
    const newRepos = await getRepositories(token, page);
    setTotalRepos(newRepos.length);
    setReposList(repos);
    setRepos(prev => [...prev, ...newRepos]);
    setLoading(false);
};

useEffect(() => {
    fetchRepos();
}, [page]);

    const handleLoadMore = () => setPage(previousPage => previousPage + 1);

const handleRefresh = async () => {
    setRefreshing(true);
  const refreshedRepos = await getRepositories(token, page);
   setRepos(refreshedRepos);
  setRefreshing(false);
};

return (

    <FlatList
        data={repos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) =>
            <RepositoryCard repo={item}  onPress={() => navigation.navigate('Issues', { token, item })}/>}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        ListFooterComponent={loading &&
            <ActivityIndicator size={"large"} color={"#0000ff"} />}
    />
    
);
};

export default FlatListComponent;