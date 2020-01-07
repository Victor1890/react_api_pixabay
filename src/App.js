import React, { Component } from 'react';
import Buscador from './components/Buscador';
import Contenedor from './components/Contenedor';

class App extends Component{

  constructor(){
    super();
    this.state = {
      termino   : "",
      imagenes  : [],
      pagina    : 0,
    }
  }

  consultaAPI = () =>{
    const url = `https://pixabay.com/api/?key=14791830-08bba15d16d042e3e2df8def6&q=${this.state.termino}&per_page=20&page=${this.state.pagina}`;

    fetch(url)
    .then(respuesta => respuesta.json())
    .then(result => {
      this.setState({
        imagenes: result.hits
      });
    })
    .catch(error => console.log(error));
  }

  datosBusqueda = (e) =>{
    console.log(e);
    this.setState({
      termino : e,
      pagina  : 1,
    }, () => {
      this.consultaAPI();
    });
  }
  
  paginaSiguiente = () =>{
    let pagina = this.state.pagina;

    pagina++;

    this.setState({
      pagina  : pagina,
    }, () => {
      this.consultaAPI();
      this.scroll();
    });

  }

  paginaAnterior = () =>{
    let pagina = this.state.pagina;

    if(pagina === 1) return null;

    pagina--;

    this.setState({
      pagina  : pagina,
    }, () => {
      this.consultaAPI();
      this.scroll();
    });
    
  }

  scroll = () =>{
    const element = document.querySelector('.jumbotron');
    element.scrollIntoView('smooth','start');
  }

  render(){
    return(
      <div className="app container" >
        <div className='jumbotron'>
          <p className='lead text-center'>Buscador de Imagenes</p>
          <Buscador datosBusqueda={this.datosBusqueda}/>
        </div>

        <div className='row justify-content-center'>
          <Contenedor 
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />
        </div>
      </div>
    );
  }
}

export default App;
