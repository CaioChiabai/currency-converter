let dolar = 0

let usdInput = document.querySelector("#usd");
let brlInput = document.querySelector("#brl");

window.addEventListener("DOMContentLoaded", () => {
    fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL")
        .then(response => response.json())
        .then(data => {
            dolar = parseFloat(data.USDBRL.bid); // valor de compra do dólar
            usdInput.value = "1,00";
            convert("usd-to-brl");
        })
        .catch(error => {
            console.error("Erro ao buscar o valor do dólar:", error);
            dolar = 5.1; // valor padrão de fallback
            usdInput.value = "1,00";
            convert("usd-to-brl");
        });
});

usdInput.addEventListener("keyup", () => {
    convert("usd-to-brl");
})

brlInput.addEventListener("keyup", () => {
    convert("brl-to-usd");
})

usdInput.addEventListener("blur", () => {
    usdInput.value = formatCurrency(usdInput.value)
})

brlInput.addEventListener("blur", () => {
    brlInput.value = formatCurrency(brlInput.value)
})

function formatCurrency(value) {
    let fixedValue = fixValue(value);
    let options = {
        useGrouping: false,
        minimumFractionDigits: 2
    }
    let formatter = new Intl.NumberFormat("pt-BR", options);
    
    return formatter.format(fixedValue);
}

function fixValue(value){
    let fixedValue = value.replace(",", ".")
    let floatValue = parseFloat(fixedValue);
    
    if (isNaN(floatValue)) {
        return 0;
    }

    return floatValue
}

function convert(type){
    switch (type){
        case "usd-to-brl":{
            let fixedValue = fixValue(usdInput.value);

            let result = fixedValue * dolar;
            result =  result.toFixed(2);

            brlInput.value = formatCurrency(result);

            break;
        }
        case "brl-to-usd":{
            let fixedValue = fixValue(brlInput.value);

            let result = fixedValue / dolar;
            result = result.toFixed(2);

            usdInput.value = formatCurrency(result);
            
            break;
        }
        default:{
            console.error("Tipo de conversão inválido");
            return;
        }
    }
}