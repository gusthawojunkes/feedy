<template>
    <v-div v-for="item in itemList" :key="item">
        <OrderItem :item="item"></OrderItem>
    </v-div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import OrderItem from './OrderItem.vue';

export default defineComponent({
    name: 'ItemList',
    data: () => ({}),
    props: {
        itemList: {
            type: [],
            required: true,
        },
    },
    components: {
        OrderItem,
    },
});
</script>

<style></style>
