import BaseService from './firebase.service';
import { setDoc } from 'firebase/firestore';

export default class LogService {
    static register(data) {
        if (!data || !data.uid) {
            throw 'Invalid data, please verify the data object';
        }
        const database = BaseService.getInstance();
        const document = BaseService.getDocumentReference(database, 'logs', data.date.toString());
        return new Promise((resolve, reject) => {
            try {
                setDoc(document, data).then(() => {
                    resolve();
                });
            } catch (error) {
                reject(undefined);
            }
        });
    }
}
