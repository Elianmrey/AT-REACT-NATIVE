import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const TransactionItem = ({ transaction, onDelete, onEdit }) => {
  const { description, amount, date, currency } = transaction;

  const renderRightActions = () => (
    <TouchableOpacity style={styles.deleteAction} onPress={() => onDelete(transaction.id)}>
      <Icon name="trash-outline" size={24} color="#fff" />
      <Text style={styles.actionText}>Excluir</Text>
    </TouchableOpacity>
  );

  const renderLeftActions = () => (
    <TouchableOpacity style={styles.editAction} onPress={() => onEdit(transaction)}>
      <Icon name="pencil-outline" size={24} color="#fff" />
      <Text style={styles.actionText}>Editar</Text>
    </TouchableOpacity>
  );

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
    >
      <View style={styles.itemContainer}>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.amount}>{`${currency} ${amount}`}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 14,
    color: 'green',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  deleteAction: {
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    flex: 1,
  },
  editAction: {
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    flex: 1,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default TransactionItem;
