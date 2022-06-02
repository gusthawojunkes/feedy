import Firestore from './firestore.service';
import { query, where, getDocs } from 'firebase/firestore';

export default class OrderService {
    static async getAll() {
        return await Firestore.getAll('orders');
    }
    static async save(order) {
        return await Firestore.save('orders', order);
    }
    static async getAllByTable(number) {
        const collection = await Firestore.getCollection(Firestore.getInstance(), 'orders');
        const customQuery = query(collection, where('tableNumber', '==', number));
        return await getDocs(customQuery);
    }
}
