<template>
    <div v-if="!loadingProducts && products.length == 0">
        <v-alert type="warning">Não existem produtos cadastrados.</v-alert>
    </div>
    <div v-else>
        <v-tabs v-model="selectedCategoryIndex" class="my-12" fixed-tabs>
            <v-tab v-for="category in categories" :key="category" class="mx-8">{{ category }} </v-tab>
        </v-tabs>
        <div v-if="loadingProducts" class="d-flex justify-center">
            <v-progress-circular indeterminate color="#009688"></v-progress-circular>
        </div>
        <v-list v-else v-for="product in filteredProducts" :key="product.uid">
            <v-card class="mx-auto my-4 d-flex flex-no-wrap">
                <v-img :src="product.image" height="180px" cover></v-img>
                <v-col class="d-flex flex-column justify-center">
                    <v-card-title>{{ product.name }} </v-card-title>
                    <div>
                        <v-card-subtitle> R$ {{ product.price }} </v-card-subtitle>
                    </div>
                </v-col>
                <div class="d-flex flex-column justify-center mr-4">
                    <v-btn class="mx-2" fab dark @click="openProductSelection(product)">
                        <v-icon dark>mdi-plus</v-icon>
                    </v-btn>
                    <ProductSelectionModal :productSelection="selectionProductDialog" @close="selectionProductDialog.dialog = false" @on-add-item="addItemOnOder($event)">
                    </ProductSelectionModal>
                </div>
            </v-card>
        </v-list>
        <v-btn class="my-12" color="#009688" block @click="openOrderRevision()"> Confirmar Pedido </v-btn>
        <OrderConfirmationDialog
            :order="order"
            :orderConfirmationDialog="orderConfirmationDialog"
            @close="orderConfirmationDialog = false"
            @on-confirm="sendOrder()"
        ></OrderConfirmationDialog>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import ProductSelectionModal from '@/components/product/ProductSelectionModal.vue';
import CategorieService from '@/services/categorie.service';
import ProductService from '@/services/product.service';
import OrderService from '@/services/order.service';
import OrderConfirmationDialog from '@/components/dialog/OrderConfirmationDialog.vue';
import _ from 'lodash';

export default defineComponent({
    name: 'OrderTyping',
    async mounted() {
        this.loadingProducts = true;
        this.products = await ProductService.getAll();
        this.loadingProducts = false;
        this.filteredProducts = this.filterProductsByCategory();
        this.categories = CategorieService.defaults();
    },

    created() {
        this.order = this.loadOrder();
    },

    data: () => ({
        productIndex: undefined,
        order: undefined,
        products: [],
        filteredProducts: [],
        categories: [],
        loadingProducts: false,
        selectedCategoryIndex: 0,
        selectionProductDialog: {
            dialog: false,
            product: undefined,
        },
        orderConfirmationDialog: false,
    }),

    watch: {
        selectedCategoryIndex: {
            immediate: true,
            handler(to) {
                const category = this.categories[to];
                this.filteredProducts = this.filterProductsByCategory(category);
            },
        },
    },

    methods: {
        addItemOnOder(item) {
            if (this.productIndex !== -1) {
                this.order.items[this.productIndex].quantity = item.quantity;
            } else {
                this.order.items.push(item);
            }
            this.$toast.success(`${item.product.name} adicionado ao pedido!`);
        },
        openProductSelection(product) {
            if (!product) {
                this.$toast.error('Ocorreu um erro ao tentar selecionar o produto, contate os responsáveis no estabelecimento.');
                return;
            }
            const { uid } = product;
            this.productIndex = _.findIndex(this.order.items, (item) => {
                return item.product.uid === uid;
            });
            if (this.productIndex !== -1) {
                const item = this.order.items[this.productIndex];
                this.selectionProductDialog.item = item;
            } else {
                this.selectionProductDialog.item = {
                    product: product,
                    quantity: 0,
                };
            }
            this.selectionProductDialog.dialog = true;
        },

        filterProductsByCategory(category = 'Geral') {
            if (category == 'Geral') return this.products;

            return this.products.filter((product) => {
                return product.categories.includes(category);
            });
        },

        async saveOrder() {
            this.validateOrderOrThrowException();
            const order = OrderService.prepare(this.order);
            sessionStorage.setItem('order', JSON.stringify(order));
            OrderService.save(order).then(() => {
                this.$toast.success('Pedido salvo com sucesso!');
            });
        },

        openOrderRevision() {
            if (this.order.items.length == 0) {
                this.$toast.error('Adicione ao menos um item no pedido antes de finalizar!');
                return;
            }
            this.orderConfirmationDialog = true;
        },

        sendOrder() {
            this.saveOrder()
                .then(() => {
                    this.$router.push('/pedidos');
                })
                .catch((error) => {
                    this.$toast.error(error.message);
                });
        },

        loadOrder() {
            const orderFromSession = JSON.parse(sessionStorage.getItem('order'));
            if (this.order === undefined && orderFromSession) {
                return orderFromSession;
            } else {
                const order = OrderService.createNewOrder();
                sessionStorage.setItem('order', JSON.stringify(order));
                return order;
            }
        },

        validateOrderOrThrowException() {
            if (this.order === undefined || this.order === null) {
                throw 'Ocorreu um erro ao tentar salvar o pedido, contate os responsáveis no estabelecimento.';
            }

            if (!this.order.items.length || this.order.items.length === 0) {
                throw 'Adicione pelo menos um item no pedido antes de enviá-lo.';
            }
        },

        deleteCurrentOrder() {
            this.order = undefined;
            sessionStorage.removeItem('order');
        },
    },
    components: {
        ProductSelectionModal,
        OrderConfirmationDialog,
    },
});
</script>

<style scoped>
.scroll {
    max-height: 200vw;
}
</style>
