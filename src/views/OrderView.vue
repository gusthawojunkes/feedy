<template>
    <div class="text-h5 mt-5 mb-12">Pedido</div>
    <item-list :listItems="listItems"></item-list>
</template>

<script>
import { defineComponent } from 'vue';
import noImage from '@/assets/no-image.png';

export default defineComponent({
    name: 'OrderView',

    data: () => ({
        noImage: noImage,
        listItems: [
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
        totalizer: { total: 1 },
    }),
});
</script>
