import BaseService from './firebase.service';

export default class ProductService {
    static async getAll() {
        return await BaseService.getAll('products');
    }
    static async remove(uid) {
        return await BaseService.remove('products', uid);
    }
    static save(data) {
        return BaseService.save('products', data);
    }
}
