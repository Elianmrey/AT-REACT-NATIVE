import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const InsertTransactionScreen = ({ navigation, route }) => {
  const { handleAddTransaction } = route.params; 
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tipo, setTipo] = useState('Receita');
  const [moeda, setMoeda] = useState('USD');

  const handleSave = () => {
    const newTransaction = {
      id: Math.random().toString(), 
      description: descricao.trim(),  
      amount: parseFloat(valor),
      date: data,
      time: hora,
      category: categoria,
      type: tipo.toLowerCase(),
      currency: moeda,
    };

    handleAddTransaction(newTransaction);
    navigation.goBack(); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inserir Transação</Text>
      <TextInput style={styles.input} placeholder="Descrição" value={descricao} onChangeText={setDescricao} />
      <TextInput style={styles.input} placeholder="Valor" keyboardType="numeric" value={valor} onChangeText={setValor} />
      <TextInput style={styles.input} placeholder="Data (DD/MM/AAAA)" value={data} onChangeText={setData} />
      <TextInput style={styles.input} placeholder="Hora (HH:MM)" value={hora} onChangeText={setHora} />
      <TextInput style={styles.input} placeholder="Categoria" value={categoria} onChangeText={setCategoria} />
      <Picker selectedValue={tipo} onValueChange={(itemValue) => setTipo(itemValue)}>
        <Picker.Item label="Receita" value="Receita" />
        <Picker.Item label="Despesa" value="Despesa" />
      </Picker>
      <Picker selectedValue={moeda} onValueChange={(itemValue) => setMoeda(itemValue)}>
        <Picker.Item label="USD" value="USD" />
        <Picker.Item label="EUR" value="EUR" />
        <Picker.Item label="BRL" value="BRL" />
      </Picker>
      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});

export default InsertTransactionScreen;
