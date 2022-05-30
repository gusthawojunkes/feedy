import Firestore from './firestore.service';

export default class OrderService {
    static async getAll() {
        return await Firestore.getAll('orders');
    }
    static async save(order) {
        return await Firestore.save('orders', order);
    }
}
