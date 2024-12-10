import { RefreshControl, ScrollView } from 'react-native';

const PullToRefresh = ({ refreshing, onRefresh, children }) => {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
            {children}
        </ScrollView>
    );
};

export default PullToRefresh;
