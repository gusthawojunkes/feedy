<template>
    <v-card class="mx-auto my-8" max-width="400">
        <v-img class="align-end text-white" height="200" :src="item.src" cover>
            <v-card-title>{{ item.price }}</v-card-title>
        </v-img>

        <v-card-subtitle class="py-5">{{ item.name }}</v-card-subtitle>

        <v-card-text>
            <div>{{ item.quantity }}</div>
        </v-card-text>

        <v-card-actions>
            <v-btn color="orange">
                <v-icon dark>mdi-plus</v-icon>
            </v-btn>

            <v-btn color="orange">
                <v-icon dark>mdi-minus</v-icon>
            </v-btn>

            <v-btn color="orange" v-if="item.quantity <= 0 ? true : false"> Remover Item </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'OrderItem',
    data: () => ({
        removeItem: false,
    }),
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
});
</script>
