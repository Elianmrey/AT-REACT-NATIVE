import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AuthScreen from '../screens/AuthScreen';
import UserInfoScreen from '../screens/UserInfoScreen';
import RepositoriesScreen from '../screens/RepositoriesScreen';
import IssuesScreen from '../screens/IssuesScreen';
import IssueDetailsScreen from '../screens/IssueDetailsScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



const AppNavigator = () => (
    <Stack.Navigator initialRouteName="Authorization" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Authorization" component={AuthScreen} screenOptions={{ headerShown: false }} />
        <Stack.Screen name="UserInfo" component={UserInfoScreen} title='Informações do Usuário' />
        <Stack.Screen name="Repositories" component={RepositoriesScreen} />
        <Stack.Screen name="Issues" component={IssuesScreen} />
        <Stack.Screen name="IssueDetails" component={IssueDetailsScreen} />

    </Stack.Navigator>
);



export default AppNavigator;
