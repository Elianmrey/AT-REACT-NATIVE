import { View, TextInput, Button, StyleSheet } from 'react-native';

const OrdenationFilter = ({ setFiltro, setOrdenacao }) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Filtrar por descrição"
      onChangeText={setFiltro}
    />
    <View style={styles.botoes}>
      <Button title="Ordenar por Data" onPress={() => setOrdenacao('data')} />
      <Button title="Ordenar por Valor" onPress={() => setOrdenacao('valor')} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: 10 },
  input: { borderWidth: 1, padding: 8, marginBottom: 10 },
  botoes: { flexDirection: 'row', justifyContent: 'space-between' },
});

export default OrdenationFilter;
