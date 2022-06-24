export default class FormularyUtils {
    static validateIsNotNull(errorMessage) {
        return (value) => Boolean(value) || errorMessage;
    }
}
