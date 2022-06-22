import Firestore from './firestore.service';
import FirestoreUtils from '../utils/firestore.util';
import Helper from '../utils/helper';
import _ from 'lodash';

export default class OrderService {
    static async getAll() {
        return await Firestore.getAll('orders');
    }

    static async save(order) {
        return await Firestore.save('orders', order);
    }

    static createNewOrder() {
        const tableNumberFromSession = Helper.getTableNumber();
        return _.extend(FirestoreUtils.getBaseInfo(), {
            items: [],
            totalAmount: 0,
            paid: false,
            tableNumber: tableNumberFromSession,
        });
    }

    static prepare(order) {
        if (!order) {
            throw 'Ocorreu um erro ao validar o pedido, contate o estabelecimento.';
        }
        try {
            this.validateAndSetTableNumber(order);
            this.calculateTotalAmount(order);
        } catch (error) {
            throw 'Ocorreu um erro ao realizar as tratativas do pedido!';
        }
        return order;
    }

    static calculateTotalAmount(order) {
        let totalAmount = 0;

        if (order && order.items) {
            totalAmount = order.items.reduce((sum, item) => {
                return sum + item.product.price * item.quantity;
            }, 0);
        }

        order.totalAmount = totalAmount;
    }

    static validateAndSetTableNumber(order) {
        if (!order.tableNumber) {
            const tableNumberFromSession = Helper.getTableNumber();
            if (tableNumberFromSession) {
                order.tableNumber = tableNumberFromSession;
            }
        }
    }

    static async send(order) {
        console.log(order);
    }

    static async getAllByTable(number) {
        return await Firestore.doQuery('orders', {
            field: 'tableNumber',
            operator: '==',
            value: number,
        });
    }
}
