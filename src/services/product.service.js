import BaseService from './firebase.service';
import _ from 'lodash';

const ProductService = _.extend(BaseService, {
    constructor() {
        this.COLLECTION = 'products';
    },

    getAll: async () => {
        return await BaseService.getAll(this.COLLECTION);
    },
});

export default ProductService;
