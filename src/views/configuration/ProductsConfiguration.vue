<template>
    <div class="text-h5 mt-5 mb-12">Configuração de Produtos</div>
    <v-row class="my-8">
        <v-col cols="12">
            <v-btn block @click="create()">
                <span>Novo</span>
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <ProductRegisterModal :open="createProductDialog" @close="createProductDialog = false" @on-create="reloadProducts($event)"> </ProductRegisterModal>
        </v-col>
    </v-row>
    <v-row v-if="products.length > 0">
        <v-col cols="12" lg="6" v-for="product in products" :key="product.name">
            <ProductCard :product="product" @remove="remove($event)" @edit="edit($event)"></ProductCard>
        </v-col>
    </v-row>
    <v-row v-else>
        <v-col cols="12">Sem resultados</v-col>
    </v-row>
    <ProductEditModal :open="editProductDialog" :productData="editProduct" @close="editProductDialog = false" @on-create="reloadProducts($event)"></ProductEditModal>
</template>

<script>
import { defineComponent } from 'vue';
import ProductCard from '@/components/product/ProductCard.vue';
import ProductService from '@/services/product.service';
import ProductRegisterModal from '@/components/product/ProductRegisterModal.vue';
import ProductEditModal from '@/components/product/ProductEditModal.vue';
import _ from 'lodash';

export default defineComponent({
    name: 'ProductsConfiguration',
    components: {
        ProductCard,
        ProductRegisterModal,
        ProductEditModal,
    },
    async mounted() {
        this.products = await ProductService.getAll();
    },
    data: () => ({
        editProduct: undefined,
        products: [],
        editProductDialog: false,
        createProductDialog: false,
    }),
    methods: {
        remove(uid) {
            ProductService.remove(uid)
                .then(() => {
                    this.products = this.products.filter((product) => product.uid !== uid);
                    this.$toast.success('Produto Excluido com Sucesso!');
                })
                .catch((error) => {
                    if (error && error.message) {
                        console.error(error.message);
                    }
                    this.$toast.error('Erro ao Excluir Produto');
                });
        },
        edit(uid) {
            const index = _.findIndex(this.products, (product) => {
                return product.uid === uid;
            });

            if (index !== -1) {
                const product = this.products[index];
                this.editProduct = product;
                this.editProductDialog = true;
            } else {
                this.$toast.error('Erro ao localizar o produto para edição!');
            }
        },
        create() {
            this.createProductDialog = true;
        },
        reloadProducts(newProduct) {
            if (newProduct) {
                this.products.push(newProduct);
                this.createProductDialog = false;
                this.editProductDialog = false;
            }
        },
    },
});
</script>
