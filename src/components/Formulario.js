import React, {useState} from "react"
import Error from "./Error"

const Formulario = ({guardarBusquedaLetra}) => {

    const [busqueda, guardarBusqueda] = useState({
        artista : '',
        cancion : ''
    })

    //state de error
    const [error, actualizarError] = useState(false);

    const {artista, cancion} = busqueda;

    //function for save params of search
    const actualizarBusqueda = (e) => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }

    //pasar info al componente principal
    const buscarInformacion = (e) => {
        e.preventDefault();
        if(artista.trim === '' || cancion.trim() === ''){
            actualizarError(true);
            return;
        }

        //todo bien

        actualizarError(false);

        guardarBusquedaLetra(busqueda);
    }

    return (
        <div className="bg-info">
            <div className="container">
                {error ? <Error mensaje={"Todos los campos son obligatorios"}/> : null}
                <div className="row">
                    <form className="col card text-white bg-transparent mb-5 pt-5 pb-2" onSubmit={buscarInformacion}>
                        <fieldset>
                            <legend className="text-center">
                                Buscador Letras Canciones
                            </legend>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Artista</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="artista"
                                            placeholder="Nombre Artista"
                                            onChange={actualizarBusqueda}
                                            value={artista}
                                        >
                                        </input>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Canción</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="cancion"
                                            placeholder="Nombre Canción"
                                            onChange={actualizarBusqueda}
                                            value={cancion}
                                        >
                                        </input>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary float-right">
                                Buscar
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Formulario;