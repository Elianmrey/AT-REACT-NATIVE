import { useState, } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const EditTransactionScreen = ({ route, navigation }) => {
  const { transaction, setTransactions } = route.params; // Recebendo a transação e a função setTransactions

  const [description, setDescription] = useState(transaction.description);
  const [amount, setAmount] = useState(transaction.amount);
  const [category, setCategory] = useState(transaction.category);
  const [currency, setCurrency] = useState(transaction.currency);

  const handleSave = () => {
    
    const updatedTransaction = {
      ...transaction,
      description,
      amount,
      category,
      currency,
    };

    
    setTransactions((prevTransactions) => 
      prevTransactions.map((t) =>
        t.id === updatedTransaction.id ? updatedTransaction : t
      )
    );

    
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Transação</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Descrição"/>
      <TextInput style={styles.input} value={String(amount)} onChangeText={(text) => setAmount(parseFloat(text))} keyboardType="numeric" placeholder="Valor" />
      <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder="Categoria" />
      <TextInput style={styles.input} value={currency} onChangeText={setCurrency} placeholder="Moeda" />
      <Button title="Salvar" onPress={handleSave} />
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
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});

export default EditTransactionScreen;
