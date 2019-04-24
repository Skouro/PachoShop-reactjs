import React, {Component} from 'react';
import * as axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'

export default class Create extends Component {
    constructor(props) {
        super(props);
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
            this.formData.append('file', file);
        })
    }

    onSubmit(e) {
        e.preventDefault();
        let auxState = this.state;
        let auxFormData = this.formData;
        Swal.fire({
            title: 'Registrar Producto',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            showLoaderOnConfirm: true,
            preConfirm: (state) => {
                return axios.post('http://localhost:3000/product', auxState)
                    .then(async (respProduct) => {
                        let result;
                        await axios.put(`http://localhost:3000/product/upload/${auxState.id}`, auxFormData)
                            .then((resp) => {
                                result = resp;
                            });
                        return result;
                    }).catch(err => {
                        Swal.showValidationMessage(
                            `Request failed: ${err}`
                        )
                    });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
           let lasAux = auxFormData;
           console.log(lasAux.get('file'));
            if (result.value) {
                Swal.fire({
                    title: `${result.value.data.name} registrado correctamente`,
                    imageUrl: `http://localhost:3000/product/image/${lasAux.get('file').name}`
                })
            }
        });
        // axios.post('http://localhost:3000/product', this.state)
        //     .then((resp) => {
        //     }).catch(err => {
        // });
        // axios.put(`http://localhost:3000/product/upload/${this.state.id}`, this.formData)
        //     .then((resp) => {
        //         Swal.fire(
        //             'Good job!',
        //             'You clicked the button!',
        //             'success'
        //         )
        //     });

        // this.setState({
        //     name: '',
        //     price: '',
        //     id: '',
        //     stock: '',
        //     description: ''
        // })
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
                                <input type="text" className="form-control" id="id"
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
                            <button type="submit" className="btn btn-primary">Agregar</button>
                        </div>
                        <div className='col-4'>
                            <div className="form-group">
                                <label htmlFor="name">Imagen</label>
                                <input type='file' id='multi' onChange={this.onChangeImg} multiple/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
