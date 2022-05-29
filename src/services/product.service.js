import Firestore from './firestore.service';

export default class ProductService {
    static async getAll() {
        return await Firestore.getAll('products');
    }
    static async remove(uid) {
        return await Firestore.remove('products', uid);
    }
    static save(data) {
        return Firestore.save('products', data);
    }
}
