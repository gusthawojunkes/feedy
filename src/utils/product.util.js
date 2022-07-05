export default class ProductUtils {
    static getDefaultImageByFirstCategorie(categories) {
        if (categories.length === 0) {
            return '/src/assets/no-image.jpeg';
        }
        const category = categories[0];
        if (category) {
            switch (category) {
                case 'Bebidas':
                    return '/src/assets/drink.jpg';
                case 'Carnes':
                    return '/src/assets/meat.jpg';
                case 'Sobremesas':
                    return '/src/assets/dessert.jfif';
                case 'Sopas':
                    return '/src/assets/soup.jfif';
                case 'Massas':
                    return '/src/assets/pasta.jpg';
                default:
                    return '/src/assets/no-image.jpeg';
            }
        } else {
            return '/src/assets/no-image.jpeg';
        }
    }
}
