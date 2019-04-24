import React, {Component} from 'react';
import {CardProduct} from './card.product.component'
import * as axios from 'axios';
import {IProduct} from '../interfaces/iProduct'
import {ProductService} from "../services/product.service";

export default class Listar extends Component {

    constructor(props) {
        console.log('new');
        super(props);
        this.state = {products: []};
        const urlParams = new URLSearchParams(window.location.search);
        let text = urlParams.get('text');
        console.log(text);
        if (text) {
            new ProductService().search(text).then(value => {
                console.log(value.data);
                this.setState({products: value.data});
            });
        } else {
            new ProductService().getAll().then(value => {
                console.log(value.data);
                this.setState({products: value.data});
            });
        }

    }

    tabProduts() {
        return this.state.products.map((object, i) => {
            return <CardProduct product={object} key={i}/>;
        });
    }

    render() {
        return (
            <div className="card-columns">
                {
                    this.tabProduts()
                }
            </div>
        )
    }
}
