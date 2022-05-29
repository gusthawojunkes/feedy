<template>
    <div class="d-flex flex-column justify-end">
        <div class="text-h5 mt-5 mb-12">Pedido</div>
        <item-list :itemList="itemList"></item-list>
        <card-totalizer :properties="cardTotalizer"></card-totalizer>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import noImage from '@/assets/no-image.png';
import ItemList from '@/components/order/ItemList.vue';
import CardTotalizer from '@/components/cards/CardTotalizer.vue';

export default defineComponent({
    name: 'OrderView',

    async mounted() {
        (this.itemList = [
            {
                id: 1,
                name: 'Coca-Cola',
                price: 2.5,
                quantity: 3,
                image: noImage,
            },
            {
                id: 2,
                name: 'Fanta',
                price: 2.5,
                quantity: 1,
                image: noImage,
            },
        ]),
            (this.cardTotalizer = {
                total: await this.totalizer(),
            });
    },

    data: () => ({
        itemList: [],
        cardTotalizer: {
            total: 0,
            path: '/pedidos-criados',
        },
    }),

    methods: {
        async totalizer() {
            return this.itemList.reduce((acc, item) => {
                return acc + item.price * item.quantity;
            }, 0);
        },
    },

    components: {
        ItemList,
        CardTotalizer,
    },
});
</script>
