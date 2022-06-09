import Firestore from './firestore.service';
import FirestoreUtils from '../utils/firestore.util';
import _ from 'lodash';

export default class OrderService {
    static async getAll() {
        return await Firestore.getAll('orders');
    }
    static async save(order) {
        return await Firestore.save('orders', order);
    }
    static createNewOrder() {
        return _.extend(FirestoreUtils.getBaseInfo(), {
            items: [],
            totalAmount: 0,
            paid: false,
        });
    }
}
