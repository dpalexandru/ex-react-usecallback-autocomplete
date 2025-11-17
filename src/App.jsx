import { useState, useEffect } from 'react'


function App() {
  //stati
  const [listaProdotti, setLisitaProdotti] = useState([])
  const [search, setSearch] = useState("")


  //chiamata api lista prodotti
  useEffect(() => {
    fetch("http://localhost:3333/products?search=ma")
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err))

  }, [])

  return (
    <>
      <header><h1>I nostri prodotti</h1></header>
      <main>
        <input
          placeholder='Cerca per nome prodotto...'
          className='campo-ricerca'
          type="text" />
      </main>

    </>
  )
}

export default App
