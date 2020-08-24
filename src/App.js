import React, {Fragment, useState, useEffect} from 'react';
import Formulario from "./components/Formulario"
import axios from "axios"
import Letra from "./components/Letra";
import Info from "./components/Info";

function App() {

  //state de busqueda
  const [busquedaLetra, guardarBusquedaLetra] = useState({});

  //state de letras
  const [letra, guardarLetra] = useState('');
  //state de informacion
  const [informacion, guardarInformacion] = useState('');


  //https://www.theaudiodb.com/api/v1/json/1/search.php?s=coldplay

  useEffect(()=>{
    if(Object.keys(busquedaLetra).length===0) return;
    const {artista, cancion} = busquedaLetra;
    const llamadaAPI = async () => {
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`
      const [letraTemp, informacionTemp] = await Promise.all([
        axios(url), axios(url2)
      ])
      guardarLetra(letraTemp.data.lyrics);
      guardarInformacion(informacionTemp.data.artists[0])
    }
    llamadaAPI();
  },[busquedaLetra]);



  return (
    <Fragment>
      <Formulario guardarBusquedaLetra={guardarBusquedaLetra} />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Info info={informacion}/>
          </div>

          <div className="col-md-6">
            <Letra letra={letra} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
