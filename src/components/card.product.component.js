import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import type {IProduct} from "../interfaces/iProduct";
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import {ProductService} from "../services/product.service";
import Swal from 'sweetalert2';

export class CardProduct extends Component {
    constructor(props) {
        super(props);
        this.product = this.props.product;
        this.delete = this.delete.bind(this);
        this.delete = this.delete.bind(this);
    }

    delete() {
       // return  <Redirect to="/" push={true}/>;
        console.log(this.product);
        let aux = this.product;
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, borralo!'
        }).then((result) => {
                console.log(aux);
                new ProductService().delete(aux.id).then(value => {
                    Swal.fire(
                        '¡Eliminado!',
                        'El product ha sido eleminado',
                        'success'
                    ).then(value1 => {
                        // this.props.history.push('/create')
                    })

                });
            }
        )
    }

    render() {
        return (
            <div className="card">
                <img src={`http://localhost:3000/product/image/${this.product.image}`}
                     style={{width: '200px', height: '200px'}} className="card-img-top"
                     alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{this.product.name} <span
                        className="badge badge-primary">{this.product.stock}</span></h5>
                    <p className="card-text">{this.product.description}</p>
                    <p className="card-text">
                        <small className="text-muted">{`$${this.product.price}`}</small>
                    </p>
                    <Link to={`/edit/${this.product.id}`}>
                        <button className="btn btn-outline-warning m-1"><i className="fas fa-pencil-alt"></i></button>
                    </Link>
                    <button onClick={this.delete} className="btn btn-outline-danger m-1"><i
                        className="fas fa-trash-alt"></i></button>
                </div>
            </div>
        )
    }
}
