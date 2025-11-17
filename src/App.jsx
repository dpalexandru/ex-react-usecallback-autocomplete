import { useState } from 'react'


function App() {

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
