import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Alert, Button, StyleSheet } from 'react-native';
import OrdenacaoFiltro from '../components/OrdenationFilter'; 
import TransacaoItemList from '../components/TransacaoItemList';
import { getCotations } from '../api/ApiConnect';

const TransactionListScreen = ({ navigation }) => {
  const [transactions, setTransactions] = useState([
    { id: '1', description: 'Compra supermercado', amount: 100, date: '09-12-2024', time: '15:30', category: 'Alimentação', type: 'expense', currency: 'BRL' },
    { id: '2', description: 'Cinema', amount: 50, date: '09-12-2024', time: '18:00', category: 'Lazer', type: 'expense', currency: 'USD' },
    { id: '3', description: 'Venda de celular', amount: 200, date: '09-12-2023', time: '10:00', category: 'Vendas', type: 'income', currency: 'BRL' },
  ]);

  const [loading, setLoading] = useState(false);
  const [filtro, setFiltro] = useState('');
  const [ordenacao, setOrdenacao] = useState('');

  const fetchCotacao = async (transactions) => {
    setLoading(true);
    try {
      const updatedTransactions = await Promise.all(
        transactions.map(async (transaction) => {
          if (transaction.currency !== 'BRL') {
            const cotacao = await getCotations(transaction.currency, transaction.date);
            if (cotacao && cotacao.valor) {
              transaction.amount = cotacao.valor * transaction.amount;
            }
          }
          return transaction;
        })
      );
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error('Erro ao buscar cotações:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao buscar as cotações');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCotacao(transactions);
  }, []);

  const handleDelete = (id) => {
    Alert.alert('Confirmar', 'Deseja excluir esta transação?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        onPress: () => setTransactions(transactions.filter((transaction) => transaction.id !== id)),
      },
    ]);
  };

  const handleEdit = (transaction) => {
    if (transaction) {
      navigation.navigate('EditTransaction', { transaction, setTransactions });
    } else {
      console.error('Transação não encontrada!');
    }
  };

  const handleAddTransaction = (newTransaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
  };

  const getFilteredAndSortedTransactions = () => {
    let filteredTransactions = transactions;

  
    if (filtro) {
      filteredTransactions = filteredTransactions.filter((transaction) =>
        transaction.description.toLowerCase().includes(filtro.toLowerCase())
      );
    }
    
    if (ordenacao === 'data') {
      filteredTransactions = filteredTransactions.sort((a, b) => (new Date(a.date)) - (new Date(b.date)));
    } else if (ordenacao === 'valor') {
      filteredTransactions = filteredTransactions.sort((a, b) => a.amount - b.amount);
    }

    return filteredTransactions;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Transações</Text>
      <OrdenacaoFiltro setFiltro={setFiltro} setOrdenacao={setOrdenacao} ordenacao={ordenacao} />
      {loading ? (
        <Text style={styles.loading}>Carregando cotações...</Text>
      ) : (
        <FlatList data={getFilteredAndSortedTransactions()}
          renderItem={({ item }) => ( <TransacaoItemList transaction={item} 
            onDelete={handleDelete} onEdit={handleEdit} navigation={navigation}/>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      <View style={styles.separator}>
        <Button title="Ver Contações" onPress={() => navigation.navigate('DayCotations')} style={styles.button} />
        <Button title="Adicionar Transação" onPress={() => navigation.navigate('InsertTransaction', { handleAddTransaction })} style={styles.button}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  loading: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  separator: {
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 250,
  },
});

export default TransactionListScreen;
