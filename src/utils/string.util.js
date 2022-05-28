export default class StringUtils {
    static isBlank(value) {
        return value === undefined || value === null || value.trim() === '';
    }
    static isNotBlank(value) {
        return !StringUtils.isBlank(value);
    }
    static convertIntoCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    }
}
