import { getFirestore, collection, doc, setDoc, deleteDoc, getDocs, updateDoc, getDoc } from 'firebase/firestore';
import Helper from '@/utils/helper';
import Logger from '@/utils/logger';

export default class Firestore {
    static getInstance() {
        return getFirestore();
    }

    static async getCollection(database, collectionName) {
        if (!database) {
            database = this.getInstance();
        }

        return new Promise((resolve, reject) => {
            try {
                resolve(collection(database, collectionName));
            } catch (error) {
                reject(undefined);
            }
        });
    }

    static getDocumentReference(database, collectionName, uid) {
        return doc(database, collectionName, uid);
    }

    static async findDocument(collectionName, documentName) {
        const database = this.getInstance();
        const document = this.getDocumentReference(database, collectionName, documentName);
        return new Promise((resolve, reject) => {
            try {
                getDoc(document).then((snapshot) => {
                    resolve(snapshot.data());
                });
            } catch (error) {
                Helper.handleError(error);
                reject(undefined);
            }
        });
    }

    static save(collectionName, data) {
        if (!data || !data.uid) {
            throw 'Invalid data, please verify the data object';
        }
        const database = this.getInstance();
        const document = this.getDocumentReference(database, collectionName, data.uid);
        return new Promise((resolve, reject) => {
            try {
                setDoc(document, data).then(() => {
                    Logger.info(`Added document '${data.uid}' to collection '${collectionName}'`);
                    resolve();
                });
            } catch (error) {
                Helper.handleError(error);
                reject(undefined);
            }
        });
    }

    static async getAll(collectionName, converter) {
        const documents = [];
        const database = this.getInstance();
        let collection = await this.getCollection(database, collectionName);
        if (converter) collection = collection.withConverter(converter);
        try {
            const snapshots = await getDocs(collection);
            snapshots.forEach((snapshot) => {
                documents.push(snapshot.data());
            });
            return documents;
        } catch (error) {
            Helper.handleError(error);
            return [];
        }
    }

    static async update(collectionName, uid, data) {
        const database = this.getInstance();
        const document = this.getDocumentReference(database, collectionName, uid);
        return new Promise((resolve, reject) => {
            try {
                updateDoc(document, data).then(() => {
                    Logger.warning(`Updated document '${uid}' in collection '${collectionName}'`);
                    resolve();
                });
            } catch (error) {
                Helper.handleError(error);
                reject();
            }
        });
    }

    static async remove(collectionName, uid) {
        const database = this.getInstance();
        return new Promise((resolve, reject) => {
            try {
                const document = this.getDocumentReference(database, collectionName, uid);
                deleteDoc(document).then(() => {
                    Logger.info(`Removed document '${uid}' from collection '${collectionName}'`);
                    resolve();
                });
            } catch (error) {
                Helper.handleError(error);
                reject();
            }
        });
    }
}
