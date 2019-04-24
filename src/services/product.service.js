import * as axios from 'axios';

export class ProductService {
    urlApi = 'http://localhost:3000';
    getOne(id) {
        return axios.get(`${this.urlApi}/product/${id}`)
    }
    search(text) {
        return axios.get(`${this.urlApi}/product/search/${text}`)
    }

    delete(id) {
        return axios.delete(`${this.urlApi}/product/${id}`)
    }
    getAll(){
       return  axios.get(`${this.urlApi}/product`);
    }
    update(body) {
       return  axios.put(`${this.urlApi}/product`, body)
    }
}
