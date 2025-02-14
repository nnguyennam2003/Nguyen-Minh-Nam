import { useEffect, useState } from 'react'
import SelectBox1 from './components/SelectBox1';
import SelectBox2 from './components/SelectBox2';
import loadingIcon from './assets/icons/loading.svg';

function App() {
  const [rates, setRates] = useState([])
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("ETH");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(false)

  
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch("https://interview.switcheo.com/prices.json");
        const data = await response.json();
        setRates(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRates();
  }, []);

  const handleConvert = () => {
    setLoading(true);

    setTimeout(() => {
      const fromRate = rates.find((r) => r.currency === fromCurrency)?.price || 1;
      const toRate = rates.find((r) => r.currency === toCurrency)?.price || 1;

      const result = (amount * fromRate) / toRate;
      setConvertedAmount(result.toFixed(4));

      setLoading(false);
    }, 800);
  };
  const currencyList = rates.map(rate => rate.currency);
  return (
    <div className='bg-[#2B2B36] h-screen flex justify-center items-center'>
      <div className="p-6 bg-[#343443] border-[#46475E] border-[1px] shadow-lg rounded-lg w-[600px]">
        <h1 className="text-3xl font-semibold mb-10 text-white">Exchange crypto</h1>
        <div className="flex items-center space-x-2 mb-6">
          <input
            type="number"
            value={amount === "" ? "" : amount}
            onChange={(e) => {
              const value = e.target.value;
              setAmount(value === "" ? "" : parseFloat(value) || 0)
            }}
            placeholder='You send'
            style={{ '-webkit-appearance': 'none' }}
            className="w-2/3 p-2 outline-none rounded-md bg-[#3E3E59] text-white"
          />
          <SelectBox1
            currencies={currencyList}
            selectedCurrency={fromCurrency}
            onCurrencyChange={setFromCurrency}
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={convertedAmount || ""}
            readOnly
            placeholder='You get'
            className="w-2/3 p-2 outline-none rounded-md bg-[#3E3E59] text-white "
          />
          <SelectBox2
            currencies={currencyList}
            selectedCurrency={toCurrency}
            onCurrencyChange={setToCurrency}
          />
        </div>
        <button
          onClick={handleConvert}
          className="w-full mt-9 h-[40px] bg-blue-500 text-white p-2 rounded-md mb-4 cursor-pointer hover:scale-[0.98] transition-transform"
        >
          {loading ? <img src={loadingIcon} alt="loading" className='w-[23px] m-auto animate-spin ' /> : "Exchange"}

        </button>

      </div>
      
    </div>
  )
}

export default App
