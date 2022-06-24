import Firestore from './firestore.service';

export default class ProductService {
    static async getAll() {
        const products = await Firestore.getAll('products');
        products.map((product) => {
            if (!product.image) {
                product.image = '/src/assets/no-image.jpeg';
            }
            return product;
        });
        return products;
    }
    static async remove(uid) {
        return Firestore.remove('products', uid);
    }
    static save(data) {
        return Firestore.save('products', data);
    }
}
