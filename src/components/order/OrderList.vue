<template>
    <v-div v-for="order in orders" :key="order.uid">
        <card-order :order="order"></card-order>
    </v-div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CardOrder from './CardOrder.vue';

export default defineComponent({
    name: 'OrderList',
    data: () => ({}),
    props: {
        orders: {
            type: [],
            required: true,
        },
    },
    components: { CardOrder },
});
</script>

<style></style>
