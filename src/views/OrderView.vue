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

    data: () => ({
        itemList: [
            {
                uid: 1,
                orderUid: 1,
                name: 'Teste 1',
                price: 89.99,
                src: noImage,
            },
            {
                uid: 2,
                orderUid: 1,
                name: 'Teste 2',
                price: 25.78,
                src: noImage,
            },
        ],
        cardTotalizer: { total: 1 },
    }),

    components: {
        ItemList,
        CardTotalizer,
    },
});
</script>
