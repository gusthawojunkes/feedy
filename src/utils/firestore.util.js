import Helper from './helper';

export default class FirestoreUtils {
    static getBaseInfo() {
        return {
            uid: Helper.generateUid(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
}
