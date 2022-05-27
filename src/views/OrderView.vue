<template>
    <div class="text-h5 mt-5 mb-12">Pedido</div>
    <item-list :listItems="listItems"></item-list>
    <card-totalizer :properties="totalizer"></card-totalizer>
</template>

<script>
import { defineComponent } from 'vue';
import CardTotalizer from '@/components/cards/CardTotalizer.vue';
import ItemList from '@/components/Order/ItemList.vue';
import defaultImagem from '@/assets/defaultImagem.png';

export default defineComponent({
    name: 'HelpCenterView',

    data: () => ({
        defaultImagem: defaultImagem,
        listItems: [
            {
                uid: 1,
                orderUid: 1,
                name: 'Teste 1',
                price: 89.99,
                src: defaultImagem,
            },
            {
                uid: 2,
                orderUid: 1,
                name: 'Teste 2',
                price: 25.78,
                src: defaultImagem,
            },
        ],
        totalizer: { total: 1 },
    }),

    components: {
        CardTotalizer,
        ItemList,
    },
});
</script>
