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
            throw `Ocorreu um erro ao realizar as tratativas do pedido!\n ${error}`;
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
        if (order.tableNumber === undefined || order.tableNumber === null) {
            throw 'Não foi encontrada a mesa do pedido.';
        }
    }

    static async send(order) {
        const service = this;
        return new Promise((resolve, reject) => {
            try {
                const orderToSend = service.prepare(order);
                if (orderToSend.totalAmount === 0) {
                    reject('Pedido não pode estar com o valor zerado.');
                }
                orderToSend.status = 'EM ANDAMENTO';
                service.updateOnRemote(orderToSend);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    static async getAllByTable(number) {
        return await Firestore.doQuery('orders', {
            field: 'tableNumber',
            operator: '==',
            value: number,
        });
    }

    static async updateOnRemote(order) {
        return new Promise((resolve, reject) => {
            Firestore.update('orders', order.uid, order)
                .then(() => {
                    resolve(order);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}
