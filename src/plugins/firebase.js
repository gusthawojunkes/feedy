import { initializeApp } from 'firebase/app';
import Logger from '@/utils/logger';

export default class Firebase {
    constructor() {
        this.INSTANCE = undefined;
    }

    static async initialize() {
        return new Promise((resolve) => {
            try {
                const firebaseApp = initializeApp({
                    apiKey: import.meta.env.VITE_API_KEY,
                    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
                    projectId: import.meta.env.VITE_PROJECT_ID,
                    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
                    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
                    appId: import.meta.env.VITE_APP_ID,
                    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
                });
                this.INSTANCE = firebaseApp;
                if (this.INSTANCE === null) {
                    throw new Error('Firebase instance failed to initialize');
                }
                Logger.info('Database connection successfully established', false);
            } catch (error) {
                let message = 'An error occurred while trying to establish the connection to the database';
                if (error) {
                    console.error(error);
                    if (error instanceof Error) {
                        message += `: ${error.message}`;
                    }
                }
                Logger.error(message);
            } finally {
                resolve();
            }
        });
    }
}
