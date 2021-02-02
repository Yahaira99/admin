import React, { Fragment } from 'react';
import Header from "./Componentes/Header";
import Reporte from "./Componentes/Reporte";

function App() {
  return (
    document.body.style.backgroundColor = "#282c34",
    <div >
      <Fragment>
        <Header titulo='¡Bienvenido a obvio Latam!' />
        <br></br>
        <Reporte />
        <br></br>
      </Fragment>
    </div>

  );
}

export default App;