<template>
    <v-card class="pa-3 padless">
        <div class="text-h6 py-6">Total: {{ properties.total }}</div>
        <v-btn block :to="properties.path"> Confirmar Pedido </v-btn>
    </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CardTotalizer',
    props: {
        properties: {
            type: Object,
            required: true,
        },
    },
    data: () => ({}),
});
</script>
