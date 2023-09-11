/* função para converter as moedas
    autor: Wesley silva
*/
    

async function obtemTaxas(moedasOrigem, moedaDestino){
    const url = `https://economia.awesomeapi.com.br/last/${moedasOrigem}-${moedaDestino}`
    try{
        const response = await fetch(url)
        const data = await response.json()
        //console.log(data)
        let retorno = data[`${moedasOrigem}${moedaDestino}`].bid
        return retorno
    } catch (error) {
        console.error(error)
        return null
    }
}
async function calculaConversao(valor, moedasOrigem, moedaDestino){
    const valorNumerico = parseFloat(valor)
    if (!isNaN(valorNumerico)){
         resultado.textContent ='O valor tem  que ser um numero valido!'
    }
    if(valor>0 && moedasOrigem && moedaDestino && moedasOrigem !== moedaDestino){
        const taxaConversao = await obtemTaxas(moedasOrigem, moedaDestino)
        const valorConvertido = (valorNumerico * taxaConversao). toFixed(2)
        resultado.textContent =`O  valor convertido é ${moedaDestino} ${valorConvertido}`
    } else {
        resultado.textContent =``
    
    }
}
/**
 * campos do formulario
 */
const moedaOrigem = document.getElementById('moedaOrigem')
const moedaDestino = document.getElementById('moedaDestino')
const valor = document.getElementById('valor')
const resultado = document.getElementById('resultado')

moedaOrigem.addEventListener('change', () => {
    calculaConversao(valor.value, moedaOrigem.value, moedaDestino.value)
})
moedaDestino.addEventListener('change', () => {
    calculaConversao(valor.value, moedaOrigem.value, moedaDestino.value)
})
valor.addEventListener('input', () => {
    calculaConversao(valor.value, moedaOrigem.value, moedaDestino.value)
})