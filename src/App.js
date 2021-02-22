import React, {useEffect,useState} from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';


const BASE_URL =' https://api.exchangeratesapi.io/latest '

function App() {


  const [currencyOptions,setCurrencyOptions]= useState([])  
  const [fromCurrency, setFromCurrency]= useState()
  const [toCurrency, setToCurrency]= useState()
  const [exchangeRate, setExchangeRate]= useState()
  const [amount, setAmount]= useState(1)
  const [amountInFromCurrency, setamountInFromCurrency]= useState(true)
      

  let toAmount, fromAmount
  if(amountInFromCurrency){
    fromAmount= amount
    toAmount =amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(()=>{
    fetch(BASE_URL)
      .then(res=> res.json())
      .then(data=>{
        console.log(data)
        const firstCurrency = Object.keys(data.rates)[0] 
        setCurrencyOptions([data.base,...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(data.rates[firstCurrency])   
     
        
      })
  },[])

  useEffect(()=> {

console.log((fromCurrency!= null && toCurrency != null))
    
    if (fromCurrency!= null && toCurrency != null){
    
     const url = "https://api.exchangeratesapi.io/latest?symbols="+toCurrency+"&base="+fromCurrency
       fetch (url)
      /* '${BASE_URL} ?base${fromCurrency} &symbols=${toCurrency}'
      console.log(a)
        fetch (a)
       /* '${BASE_URL} ?base${fromCurrency} &symbols=${toCurrency}')*/
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[toCurrency]))
   
    }    
  },[fromCurrency, toCurrency])




  function handleFromAmountChange(e){
    setAmount(e.target.value)
    setamountInFromCurrency(true)      
    
  }

  function handleToAmountChange(e){
    setAmount(e.target.value)
    setamountInFromCurrency(false)  
    
  }



  return (
    
    <div className= 'app' >
     
    <h1>RATES CONVERSION</h1>
    From
    <CurrencyRow 
    currencyOptions={currencyOptions} 
    selectedCurrency={fromCurrency}
    onChangeCurrency={e=> setFromCurrency(e.target.value)}
    onChangeAmount={handleFromAmountChange}
    amount= {fromAmount}
    /> 
    <div className='equals'>=</div>
    To
    <CurrencyRow 
    currencyOptions={currencyOptions} 
    selectedCurrency={toCurrency}
    onChangeCurrency={e=> setToCurrency(e.target.value)}
    onChangeAmount={handleToAmountChange}
    amount = {toAmount}
    />    
    
    </div>
  );
}

export default App;
