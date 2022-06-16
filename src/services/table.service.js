import Helper from '../utils/helper';
import Firestore from './firestore.service';

export default class TableService {
    static save(data) {
        return Firestore.save('tables', data);
    }

    static async getByNumber(number) {
        if (!number) {
            throw 'Número da mesa não informado';
        }
        const table = await Firestore.findDocument('tables', number.toString());
        if (table && table.closingDate == null) {
            return table;
        }

        return Firestore.save('tables', this.newTable(number)).then((table) => {
            return table;
        });
    }

    static newTable(number) {
        return {
            uid: number.toString(),
            createdAt: new Date(),
            updatedAt: new Date(),
            name: `Mesa ${number}`,
            number: number,
            openingDate: new Date(),
            closingDate: null,
            status: 'open',
        };
    }

    static async closeTable(number) {
        if (!number) {
            throw 'Número da mesa não informado';
        }

        const closingInformation = {
            closingDate: new Date(),
            status: 'closed',
        };

        return new Promise((resolve, reject) => {
            Firestore.update('tables', number.toString(), closingInformation)
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    Helper.handleError(error);
                    reject(error);
                });
        });
    }
}
