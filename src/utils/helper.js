import Logger from '@/utils/logger';

export default class Helper {
    static handleError(error) {
        if (error && error instanceof Error && error.message) {
            Logger.error(error.message);
        }
    }

    static generateUid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    static isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    static isDesktop() {
        return !this.isMobile();
    }
}
