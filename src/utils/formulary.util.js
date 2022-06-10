export class FormularyUtils {
    static validateIsNotNull(errorMessage) {
        return (value) => !!value || errorMessage;
    }
}
