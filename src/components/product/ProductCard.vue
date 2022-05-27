<template>
    <v-card elevation="2">
        <v-img :src="product.image"> </v-img>
        <v-card-title>
            {{ product.name }}
            <v-spacer></v-spacer>
            {{ toBrazilianCurrency(product.price) }}
        </v-card-title>
        <v-card-text>
            {{ product.description }}
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon @click="edit(product.uid)">
                <v-icon dark> mdi-pencil </v-icon>
            </v-btn>
            <v-btn icon @click="remove(product.uid)"> <v-icon dark> mdi-delete </v-icon> </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import StringUtils from '@/utils/string.util';
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'ProductCard',
    props: {
        product: { type: Object, default: () => {} },
    },
    methods: {
        remove(uid) {
            this.$emit('remove', uid);
        },
        edit(uid) {
            this.$emit('edit', uid);
        },
        toBrazilianCurrency(value) {
            return StringUtils.convertIntoCurrency(value);
        },
    },
});
</script>
