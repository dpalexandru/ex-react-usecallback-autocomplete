import { useState, useEffect } from 'react'


function App() {
  //stati
  const [listaProdotti, setListaProdotti] = useState([]);
  const [ricerca, setRicerca] = useState("")


  //chiamata api lista prodotti
  useEffect(() => {
    fetch(`http://localhost:3333/products?search=${ricerca}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setListaProdotti(data);
      })
      .catch(err => console.error(err))

  }, [ricerca])

  return (
    <>
      <header><h1>I nostri prodotti</h1></header>
      <main>
        <input
          placeholder='Cerca per nome prodotto...'
          className='campo-ricerca'
          type="text"
          value={ricerca}
          onChange={e => setRicerca(e.target.value)}
        />

        {ricerca.length > 0 && listaProdotti.length > 0 && (
          <ul className="tendina">
            {listaProdotti.map((prodotto) => (
              <li
                key={prodotto.id}
                onClick={() => {
                  setListaProdotti([]);
                  setRicerca(prodotto.name);
                }}
              >
                {prodotto.name}
              </li>
            ))}
          </ul>
        )}
      </main>

    </>
  )
}

export default App
