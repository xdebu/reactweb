import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './Components/DevItem';
import DevForm from './Components/DevForm';
// Componente: Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação.
// Propriedade: Informações que um componente PAI passa para o componente Filho
// Estado: Informações mantidas pelo componente (Lembrar: imutabilidade)


function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function hadnleAddDev(data) {
    const response = await api.post('/devs', data)

    setDevs([...devs, response.data]);
  }


  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={hadnleAddDev}/>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}/>
          ))}

        </ul>
      </main>
    </div>
  );
}

export default App;

/* Exemplo de Utilização do Estado
import React, { useState } from 'react';

function App(){
  const [counter, setCounter] = useState(0);

  function incrementCounter(){
    setCounter(counter + 1);
  }

  return (
    <>
      <h1>Contador: {counter}</h1>
      <button onClick={incrementCounter}>Incrementar</button>
    </>
  );
}

export default App;
*/
