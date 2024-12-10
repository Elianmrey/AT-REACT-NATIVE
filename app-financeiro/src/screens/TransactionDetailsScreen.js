import { View, Text, StyleSheet } from 'react-native';

const TransactionDetailsScreen = ({ route }) => {
  const { transaction } = route.params; 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da Transação</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.detail}>Descrição: {transaction.description}</Text>
        <Text style={styles.detail}>Valor: {transaction.amount} {transaction.currency}</Text>
        <Text style={styles.detail}>Data: {transaction.date}</Text>
        <Text style={styles.detail}>Hora: {transaction.time}</Text>
        <Text style={styles.detail}>Categoria: {transaction.category}</Text>
        <Text style={styles.detail}>Tipo: {transaction.type === 'expense' ? 'Despesa' : 'Receita'}</Text>
        <Text style={styles.detail}>Moeda: {transaction.currency}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailContainer: {
    marginTop: 20,
  },
  detail: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
});

export default TransactionDetailsScreen;
