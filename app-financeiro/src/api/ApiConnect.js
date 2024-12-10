import axios from 'axios';


const BASE_URL = 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/';


 const getCurrencies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}Moedas?$top=100&$format=json`);
    return response.data.value;
  } catch (error) {
    console.error("Erro ao obter a lista de moedas:", error);
    throw error;
  }
};


 const getCotations = async (coin, dateCotation) => {
  try {
    const response = await axios.get(
      `${BASE_URL}CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='${coin}'&@dataCotacao='${dateCotation}'&$top=1&$format=json`
    );

    // console.log("Resposta axios",response);

    return response.data.value[0];  
  } catch (error) {
    console.error(`Erro ao obter a cotação de ${moeda} na data ${dataCotacao}:`, error);
    throw error;
  }
};

export{
  getCurrencies,
  getCotations
}