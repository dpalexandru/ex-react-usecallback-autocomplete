import { useState, useEffect, useCallback } from 'react'

// Funzione debounce generica
function debounce(callback, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  };
}


function App() {
  //stati
  const [listaProdotti, setListaProdotti] = useState([]);
  const [ricerca, setRicerca] = useState("")
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [inputValue, setInputValue] = useState("");



  //chiamata api lista prodotti
  useEffect(() => {
    fetch(`http://localhost:3333/products?search=${ricerca}`)
      .then(res => res.json())
      .then(data => {
        console.log("Richiesta Api");
        setListaProdotti(data);
      })
      .catch(err => console.error(err))

  }, [ricerca])

  // chiamata api per recuperare singolo prodotto 
  useEffect(() => {
    if (selectedProductId === null) {
      return;
    }
    fetch(`http://localhost:3333/products/${selectedProductId}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setSelectedProduct(data);
      })
      .catch(err => console.error(err))

  }, [selectedProductId])

  // usiamo debounce e usecallback
  const debouncedSearch = useCallback(
    debounce((val) => {
      setRicerca(val);
    }, 300),
    []
  );

  return (
    <>
      <header><h1>I nostri prodotti</h1></header>
      <main>
        <input
          placeholder='Cerca per nome prodotto...'
          className='campo-ricerca'
          type="text"
          value={inputValue}
          onChange={(e) => {
            const val = e.target.value;
            setInputValue(val);
            debouncedSearch(val);
          }}
        />

        {inputValue.length > 0 && listaProdotti.length > 0 && (
          <ul className="tendina">
            {listaProdotti.map((prodotto) => (
              <li
                key={prodotto.id}
                onClick={() => {
                  setListaProdotti([]);
                  setInputValue(prodotto.name);
                  setSelectedProductId(prodotto.id);
                }}
              >
                {prodotto.name}
              </li>
            ))}
          </ul>
        )}
        <div className="container">
          {selectedProduct !== null &&
            (
              <div className='card'>
                <h3>{selectedProduct.name}</h3>
                {/* LINK IMMAGINE OGGETTO NON FUNZIONANTE "https://fakeimg.pl/500x500/?text=Smart+Thermostat" */}
                <p>{selectedProduct.brand}</p>
                <p>{selectedProduct.color}</p>
                <p>{selectedProduct.description}</p>
                <p>{selectedProduct.price}€</p>
              </div>
            )
          }
        </div>

      </main>

    </>
  )
}

export default App
