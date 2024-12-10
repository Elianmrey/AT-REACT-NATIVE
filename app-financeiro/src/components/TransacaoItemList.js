import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

const TransacaoItemList = ({ transaction, onDelete, onEdit, navigation }) => {
  
  const handlePress = () => {
    navigation.navigate('TransactionDetails', { transaction });
  };


  const renderRightActions = () => {
    return (
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => onEdit(transaction)}>
          <Text style={styles.actionText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(transaction.id)}>
          <Text style={styles.actionText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const {width,height} = useWindowDimensions();
const isPortrait = height>width;



  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity style={styles.itemContainer} onPress={handlePress}>
        <View style={styles.textContainer}>
          <Text style={styles.description}>{transaction.description}</Text>
          <Text style={styles.details}>Valor: {transaction.amount} {transaction.currency}</Text>
        {isPortrait? <Text style={styles.details}>Data: {transaction.date}</Text>:  false}
        {isPortrait?  <Text style={styles.details}>Hora: {transaction.time}</Text>: false}
          <Text style={styles.details}>Categoria: {transaction.category}</Text>
          <Text style={styles.details}>Tipo: {transaction.type === 'expense' ? 'Despesa' : 'Receita'}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  textContainer: {
    flexDirection: 'column',
  },
  description: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f2f2f2',
    height: '100%',
    width: 150,
    borderRadius: 8,
    padding: 10,
  },
  editButton: {
    backgroundColor: '#f8e71c',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TransacaoItemList;
