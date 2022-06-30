export default class OrderUtils {
    static getSituationStyle(order) {
        if (order.status) {
            switch (order.status) {
                case 'ABERTO':
                    return 'green';
                case 'FECHADO':
                    return 'red';
                case 'EM ANDAMENTO':
                    return 'orange';
                default:
                    return 'orange';
            }
        }
        return order.paid ? 'green' : 'red';
    }

    static getSituationLabel(order) {
        if (order.status) {
            return order.status;
        }
        return order.paid ? 'FECHADO' : 'ABERTO';
    }
}
