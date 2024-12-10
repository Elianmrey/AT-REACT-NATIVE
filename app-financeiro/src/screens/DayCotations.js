import {useState,useEffect} from 'react';
import { View,Text, StyleSheet, ScrollView } from "react-native";
import {getCurrencies, getCotations} from "../api/ApiConnect";


const DayCotations= () => {
const  [currencyData, setCurrencyData] = useState();
const [coinInfo, setCoinInfo] = useState();
 const coinsSymbol = ['AUD','CAD','CHF','DKK','EUR','GBP','JPY','NOK','SEK','USD',]


    useEffect(() => {
        const yesterday = (new Date().getDay()-1) +'-' + (new Date().getMonth()+1) + '-' + new Date().getFullYear();

       async function getInfoCotations() {
       await getCurrencies().then((response) => setCurrencyData(response));
       coinsSymbol.forEach(async (coin) => await getCotations(coin, yesterday).then(response => setCoinInfo((prevState) => ({...prevState, [coin]: response }))));
      }
      getInfoCotations();
    }, []);
    
   console.log("Dados de moedas:",coinInfo);


    return (
     <ScrollView style={styles.container}>
         <Text style={styles.title}>Cotações dos ulltimos dias</Text>
          {currencyData?.map((currency, index) => (
                <View key={index} style={styles.cotation}>
                        <Text  style={styles.titleText}>{currency.nomeFormatado}  {coinsSymbol[index]}</Text>
                        <Text  style={styles.text}>Cotação de venda: {coinInfo?.[coinsSymbol[index]]?.cotacaoVenda}</Text>
                        <Text  style={styles.text}>Cotação de compra: {coinInfo?.[coinsSymbol[index]]?.cotacaoCompra}</Text>
                    </View>))}
     </ScrollView>
    );
};
export default DayCotations;

const styles = StyleSheet.create({
    cotation: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 20,
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom:10,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#eee',
    },
});