import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AutenticationScreen from './src/screens/AutenticationScreen';
import TransactionsListScreen from './src/screens/TransactionsListScreen';
import InsertTransactionScreen from './src/screens/InsertTransactionScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import EditTransactionScreen from './src/screens/EditTransactionScreen';
import TransactionDetailsScreen from './src/screens/TransactionDetailsScreen';
import DayCotations from './src/screens/DayCotations';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Autentication">
        <Stack.Screen name="Autentication" component={AutenticationScreen} options={{ title: 'Autenticação' }}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="TransactionsList" component={TransactionsListScreen}options={{ title: 'Transações' }} />
        <Stack.Screen name="InsertTransaction" component={InsertTransactionScreen} options={{ title: 'Inserir Transação' }}/>
        <Stack.Screen name="EditTransaction" component={EditTransactionScreen} options={{ title: 'Editar Transação' }}/>
        <Stack.Screen name="TransactionDetails" component={TransactionDetailsScreen} options={{ title: 'Detalhes da Transação' }}/>
        <Stack.Screen name="DayCotations" component={DayCotations}  options={{ title: 'Cotações' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
