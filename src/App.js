import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Create from './components/create.component';
import Edit from './components/edit.component';
import Index from './components/index.component';
import Listar from "./components/listar.component";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        }
        this.onChangSearchText = this.onChangSearchText.bind(this);
    }

    onChangSearchText(e) {
        this.setState({
            searchText: e.target.value
        })
    }

    render() {
        return (
            <Router>
                <div className="container">

                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="#">Navbar</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link to={'/index'} className="nav-link">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/create'} className="nav-link"> Agregar nuevo producto</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/listar'} className="nav-link"> Lista de productos</Link>
                                </li>
                            </ul>
                            <form className="form-inline my-2 my-lg-0">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search"
                                       aria-label="Search" onChange={this.onChangSearchText} value={this.state.searchText}/>
                                <Link className="btn btn-outline-success my-2 my-sm-0" to={`/listar?text=${this.state.searchText}`}>Search
                                </Link>
                            </form>
                        </div>
                    </nav>

                    <br/>
                    <h2>Bienvenido a la tienda de pacho</h2> <br/>
                    <Switch>
                        <Route exact path='/create' component={Create}/>
                        <Route path='/edit/:id' component={Edit}/>
                        <Route path='/index' component={Index}/>
                        <Route path='/listar' component={Listar}/>
                        <Route path='/edit' component={Edit}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
