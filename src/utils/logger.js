import dayjs from 'dayjs';

export default class Logger {
    static info(message) {
        console.log(`[INFO - ${dayjs().format('DD/MM/YYYY HH:mm:ss')}]: ${message}`);
    }
    static warning(message) {
        console.warn(`[WARNING] - ${dayjs().format('DD/MM/YYYY HH:mm:ss')}]: ${message}`);
    }
    static error(message) {
        console.error(`[ERROR] - ${dayjs().format('DD/MM/YYYY HH:mm:ss')}]: ${message}`);
    }
}
