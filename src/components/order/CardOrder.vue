<template>
    <v-card class="d-flex justify-space-between pa-6 pr-6 my-6">
        <div class="d-flex justify-space-between">
            <div class="d-flex align-center">
                <div class="text-h5">{{ order.getUid }}</div>
            </div>
            <v-divider vertical class="px-3"></v-divider>
            <div class="pl-6">
                <div class="text-h8">{{ order.totalAmount }}</div>
                <div class="text-h6">R$ {{ order.price }}</div>
            </div>
        </div>
        <div class="d-flex align-center">
            <v-icon size="50">mdi-chevron-right</v-icon>
        </div>
    </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CardOrder',
    data: () => ({}),
    props: {
        order: {
            type: Object,
            required: true,
        },
    },
});
</script>

<style></style>
