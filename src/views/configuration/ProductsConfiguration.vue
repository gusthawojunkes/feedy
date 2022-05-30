<template>
    <v-row>
        <v-col cols="12">
            <v-btn @click="create()">
                <span>Novo</span>
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <ProductRegisterModal :open="createProductDialog" @close="createProductDialog = false" @on-create="reloadProducts($event)"> </ProductRegisterModal>
        </v-col>
    </v-row>
    <v-row v-if="products.length > 0">
        <v-col cols="12" lg="3" v-for="product in products" :key="product.name">
            <ProductCard :product="product" @remove="remove($event)"></ProductCard>
        </v-col>
    </v-row>
    <v-row v-else>
        <v-col cols="12">Sem resultados</v-col>
    </v-row>
</template>

<script>
import { defineComponent } from 'vue';
import ProductCard from '@/components/product/ProductCard.vue';
import ProductService from '../../services/product.service';
import ProductRegisterModal from '@/components/product/ProductRegisterModal.vue';
export default defineComponent({
    name: 'ProductsConfiguration',
    components: {
        ProductCard,
        ProductRegisterModal,
    },
    async mounted() {
        this.products = await ProductService.getAll();
    },
    data: () => ({
        products: [],
        createProductDialog: false,
    }),
    methods: {
        remove(uid) {
            ProductService.remove(uid).then(() => {
                this.products = this.products.filter((product) => product.uid !== uid);
            });
        },
        edit(uid) {
            console.log(uid);
        },
        create() {
            this.createProductDialog = true;
        },
        reloadProducts(newProduct) {
            if (newProduct) {
                this.products.push(newProduct);
                this.createProductDialog = false;
            }
        },
    },
});
</script>
