import React, {Component} from 'react';
import * as axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ProductService} from "../services/product.service";
import Swal from 'sweetalert2';
import {Router} from 'react-router';

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.image = '';
        this.productService = new ProductService();
        this.productService.getOne(props.match.params.id)
            .then(value => {
                console.log(value.data);
                for (let i in this.state) {
                    this.setState({
                        [i]: value.data[i]
                    })
                }
                // console.log('value', value);
                // this.setState(value) =
            });
        this.formData = new FormData();
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeId = this.onChangeId.bind(this);
        this.onChangeStock = this.onChangeStock.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeImg = this.onChangeImg.bind(this);
        this.state = {
            name: '',
            price: '',
            id: '',
            stock: '',
            description: '',
            image: ''
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    onChangeId(e) {
        this.setState({
            id: e.target.value
        });
    }

    onChangeStock(e) {
        this.setState({
            stock: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeImg = e => {
        const files = Array.from(e.target.files);
        files.forEach((file, i) => {
            console.log(file);
            this.formData.append('file', file);
        })
    }

    onSubmit(e) {
        e.preventDefault();
        new ProductService().update(this.state)
            .then((resp) => {
                Swal.fire(
                    '!Actualizado!',
                    '¡Producto actualizado correctamente!',
                    'success'
                ).then(value => {
                })
            }).catch(err => {
            console.log(err);
        });
        axios.put(`http://localhost:3000/product/upload/${this.state.id}`, this.formData)
            .then((resp) => {
                console.log(resp)
            });

        this.setState({
            name: '',
            price: '',
            id: '',
            stock: '',
            description: ''
        })
    }

    render() {
        return (
            <div className={'mt-4'}>
                <form onSubmit={this.onSubmit}>

                    <div className='row'>
                        <div className='col-8'>
                            <div className="form-group">
                                <label htmlFor="name">Nombre</label>
                                <input type="text" className="form-control" id="name"
                                       aria-describedby="emailHelp" value={this.state.name}
                                       onChange={this.onChangeName} placeholder="Ingrese el nombre del producto"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="id">ID</label>
                                <input type="text" className="form-control" id="id" disabled="disabled"
                                       placeholder="ID" value={this.state.id} onChange={this.onChangeId}/>
                                <small id="emailHelp" className="form-text text-muted">Id unico para reconocer el
                                    producto en el
                                    sistema
                                </small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Precio</label>
                                <input type="number" className="form-control" id="price" placeholder={'Precio'}
                                       value={this.state.price} onChange={this.onChangePrice}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="stock">Stock</label>
                                <input type="number" className="form-control" id="stock" placeholder={'Stock'}
                                       value={this.state.stock} onChange={this.onChangeStock}/>
                                <small id="emailHelp" className="form-text text-muted">Cantidad de productos en stock
                                </small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea className="form-control" id="description"
                                          placeholder="Description del producto" value={this.state.description}
                                          onChange={this.onChangeDescription}/>
                            </div>
                            <button type="submit" className="btn btn-primary">Actualizar</button>
                        </div>
                        <div className='col-4'>
                            <div className="form-group">
                                <label htmlFor="name">Imagen</label>
                                <img src={`http://localhost:3000/product/image/${this.state.image}`} alt="..."
                                     className="img-thumbnail"/>
                                <input type='file' id='multi' onChange={this.onChangeImg} multiple/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
