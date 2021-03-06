import ProductUtils from '../utils/product.util';
import Firestore from './firestore.service';

export default class ProductService {
    static async getAll() {
        let products = await Firestore.getAll('products');
        products.map((product) => {
            if (!product.image) {
                product.image = ProductUtils.getDefaultImageByFirstCategorie(product.categories);
            }
            return product;
        });
        return await products;
    }

    static async remove(uid) {
        return await Firestore.remove('products', uid);
    }

    static save(data) {
        return Firestore.save('products', data);
    }
}
