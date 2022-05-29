import dayjs from 'dayjs';
import LogService from '../services/log.service';
import Helper from '../utils/helper';

export default class Logger {
    static info(message) {
        const formattedDate = dayjs().format('DD/MM/YYYY HH:mm:ss');
        const formatedMessage = `[INFO - ${formattedDate}]: ${message}`;
        const logDocument = this.generateLogDocument(message, 'info');
        LogService.register(logDocument);
        console.log(formatedMessage);
    }
    static warning(message) {
        const formattedDate = dayjs().format('DD/MM/YYYY HH:mm:ss');
        const formatedMessage = `[WARNING - ${formattedDate}]: ${message}`;
        const logDocument = this.generateLogDocument(message, 'warning');
        LogService.register(logDocument);
        console.warn(formatedMessage);
    }
    static error(message) {
        const formattedDate = dayjs().format('DD/MM/YYYY HH:mm:ss');
        const formatedMessage = `[ERROR - ${formattedDate}]: ${message}`;
        const logDocument = this.generateLogDocument(message, 'error');
        LogService.register(logDocument);
        console.error(formatedMessage);
    }

    static generateLogDocument(message, type) {
        return {
            uid: Helper.generateUid(),
            message: message,
            type: type,
            date: new Date(),
        };
    }
}
