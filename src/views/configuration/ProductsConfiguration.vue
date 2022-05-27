<template>
    <v-row>
        <v-col cols="12">
            <v-btn> Novo <v-icon>mdi-plus</v-icon></v-btn>
            <ProductRegisterModal :open="createProductDialog" @close="createProductDialog = false"> </ProductRegisterModal>
        </v-col>
    </v-row>
    <v-row v-if="products.length > 0">
        <v-col cols="12" lg="3" v-for="product in products" :key="product.name">
            <ProductCard :product="product"></ProductCard>
        </v-col>
    </v-row>
    <v-row v-else>
        <v-col cols="12">Sem resultados</v-col>
    </v-row>
</template>

<script>
import { defineComponent } from 'vue';
import ProductCard from '@/components/product/ProductCard.vue';
import ProductRegisterModal from '@/components/product/ProductRegisterModal.vue';
export default defineComponent({
    name: 'ProductsConfiguration',
    components: {
        ProductCard,
        ProductRegisterModal,
    },
    // async mounted() {
    //     ProductService.getAll()
    //         .then((products) => {
    //             this.products = products;
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // },
    data: () => ({
        products: [],
        createProductDialog: false,
    }),
    methods: {
        // remove(uid) {
        //     ProductService.remove(uid).then(() => {
        //         this.products = this.products.filter((product) => product.uid !== uid);
        //     });
        // },
        // edit(uid) {
        //     console.log(uid);
        // },
        // toBrazilianCurrency(value) {
        //     return StringUtils.convertIntoCurrency(value);
        // },
        // create() {
        //     this.createProductDialog = true;
        // },
    },
});
</script>
