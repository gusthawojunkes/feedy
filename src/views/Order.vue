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
                <v-img :src="product.image" height="180px"></v-img>
                <v-col class="d-flex flex-column justify-center">
                    <v-card-title>{{ product.name }} </v-card-title>
                    <div>
                        <v-card-subtitle> R$ {{ product.price }} {{ product.selected ? `(${product.actualQuantity}x)` : '' }}</v-card-subtitle>
                    </div>
                </v-col>
                <div class="d-flex flex-column justify-center mr-4">
                    <v-btn class="mx-2" color="#009688" @click="openProductSelection(product)">
                        <v-icon dark>{{ product.selected ? 'mdi-pencil' : 'mdi-plus' }}</v-icon>
                    </v-btn>
                    <ProductSelectionModal
                        :productSelection="selectionProductDialog"
                        @close="selectionProductDialog.dialog = false"
                        @on-add-item="addItemOnOder($event)"
                        @on-remove="removeOrderItem($event)"
                    >
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
import Helper from '@/utils/helper';
import TableService from '@/services/table.service';

export default defineComponent({
    name: 'OrderTyping',
    async mounted() {
        this.loadingProducts = true;
        this.order = this.loadOrder();
        this.products = await ProductService.getAll();
        this.updateProductsMapping();
        this.loadingProducts = false;
        this.filteredProducts = this.filterProducts();
        this.categories = CategorieService.defaults();
    },

    data: () => ({
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
                this.filteredProducts = this.filterProducts(category);
            },
        },
        $route: {
            immediate: true,
            handler() {
                this.saveOrder();
            },
        },
    },

    methods: {
        removeOrderItem(uid) {
            const productIndexOnOrder = _.findIndex(this.order.items, (currentItem) => {
                return currentItem.product.uid === uid;
            });
            if (productIndexOnOrder !== -1) {
                this.order.items.splice(productIndexOnOrder, 1);
            }
            this.filterProducts();
        },
        addItemOnOder(item) {
            const productIndexOnOrder = _.findIndex(this.order.items, (currentItem) => {
                return currentItem.product.uid === item.product.uid;
            });
            if (productIndexOnOrder !== -1) {
                this.order.items[productIndexOnOrder] = item;
            } else {
                this.order.items.push(item);
            }
            this.filterProducts();
            this.$toast.success(`${item.product.name} adicionado ao pedido!`);
        },
        openProductSelection(product) {
            if (!product) {
                this.$toast.error('Ocorreu um erro ao tentar selecionar o produto, contate os responsáveis no estabelecimento.');
                return;
            }
            const { uid } = product;
            const productIndex = _.findIndex(this.order.items, (item) => {
                return item.product.uid === uid;
            });
            if (productIndex !== -1) {
                const item = this.order.items[productIndex];
                this.selectionProductDialog.item = item;
            } else {
                this.selectionProductDialog.item = {
                    product: product,
                    quantity: 0,
                };
            }
            this.selectionProductDialog.dialog = true;
        },

        filterProducts(category = 'Geral') {
            if (category == 'Geral') return this.products;

            return this.products.filter((product) => {
                return product.categories.includes(category);
            });
        },

        async saveOrder(forceSave = false) {
            const order = OrderService.prepare(this.order);
            sessionStorage.setItem('order', JSON.stringify(order));
            if (forceSave) {
                await OrderService.save(order);
            }
        },

        async openOrderRevision() {
            const tableNumber = Helper.getTableNumber();
            if (!tableNumber) {
                this.$toast.error('Não foi possível identificar a mesa, contate os responsáveis pelo restaurante.');
                return;
            }

            const table = await TableService.getByNumber(tableNumber);
            if (table.status !== 'open') {
                this.$toast.error('A mesa está fechada, não é possível realizar um pedido. Contate os responsáveis pelo restaurante.');
                return;
            }

            if (this.order.items.length == 0) {
                this.$toast.error('Adicione ao menos um item no pedido antes de finalizar!');
                return;
            }
            OrderService.calculateTotalAmount(this.order);
            this.orderConfirmationDialog = true;
        },

        async sendOrder() {
            try {
                const forceSaveOnRemote = true;
                await this.saveOrder(forceSaveOnRemote);
                await OrderService.send(this.order)
                    .then(() => {
                        this.deleteCurrentOrder();
                        this.$router.push('/pedidos');
                        this.$toast.success('Pedido enviado com sucesso!');
                    })
                    .catch((error) => {
                        throw error;
                    });
            } catch (error) {
                this.$toast.error(error.message);
            }
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

        updateProductsMapping() {
            if (this.order) {
                (this.order.items || []).forEach((item) => {
                    const uid = item.product.uid;
                    const index = _.findIndex(this.products, (product) => {
                        return product.uid === uid;
                    });
                    if (index != -1) {
                        const product = this.products[index];
                        if (product) {
                            product.selected = true;
                            product.actualQuantity = item.quantity;
                        }
                    }
                });
            }
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
