<template>
    <v-tabs v-model="selectedCategory" class="my-12" fixed-tabs>
        <v-tab v-for="category in categories" :key="category" class="mx-8">{{ category }} </v-tab>
    </v-tabs>
    <v-window v-model="selectedCategory">
        <v-window-item :value="selectedCategory">
            <v-list v-for="product in filteredProducts" :key="product.uid" :text="product.name">
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

                        <ProductSelectionModal
                            :productSelection="selectionProductDialog"
                            @close="selectionProductDialog.dialog = false"
                            @on-add-item="addItemOnOder($event)"
                        ></ProductSelectionModal>
                    </div>
                </v-card>
            </v-list>
        </v-window-item>
    </v-window>
    <v-btn class="my-12" color="#009688" block @click="sendOrder()"> Confirmar Pedido </v-btn>
</template>
<script>
import { defineComponent } from 'vue';
import ProductSelectionModal from '@/components/product/ProductSelectionModal.vue';
import CategorieService from '@/services/categorie.service';
import ProductService from '@/services/product.service';
import OrderService from '../services/order.service';
import FirestoreUtils from '../utils/firestore.util';
import _ from 'lodash';

export default defineComponent({
    name: 'OrderTyping',
    async mounted() {
        this.products = await ProductService.getAll();
        this.categories = CategorieService.defaults();
    },
    created() {
        this.order = this.loadOrder();
    },
    data: () => ({
        order: undefined,
        products: [],
        filteredProducts: [],
        selectionProductDialog: {
            dialog: false,
            product: undefined,
        },
        categories: [],
        items: [],
        selectedCategory: 'Geral',
        orderConfirmation: {
            title: 'Deseja confirmar o Pedido?',
            model: true,
        },
    }),
    watch: {
        selectedCategory: {
            immediate: true,
            handler(to) {
                const category = to;
                this.filteredProducts = this.filteredItens(category);
            },
        },
    },
    methods: {
        addItemOnOder(item) {
            this.order.items.push(item);
        },
        openProductSelection(product) {
            if (!product) {
                this.$toast.error('Ocorreu um erro ao tentar selecionar o produto, contate os responsáveis no estabelecimento.');
                return;
            }
            const { uid } = product;
            console.log(uid);
            const productIndex = _.findIndex(this.order.items, (item) => {
                item.product.uid === uid;
            });
            if (productIndex != -1) {
                const item = this.order.items[productIndex];
                this.selectionProductDialog.item = item;
            } else {
                this.selectionProductDialog.item = {
                    product: product,
                    quantity: 0,
                };
            }
            console.log(this.selectionProductDialog);
            this.selectionProductDialog.dialog = true;
        },
        openItemModal(newItem) {
            this.item.product = newItem;
        },
        incrementItem(product) {
            const item = this.order.items.find((item) => item.product.uid === product.uid);
            if (item) {
                this.order.items.indexOf(item).quantity++;
            } else {
                this.order.items.push({
                    product,
                    quantity: 1,
                });
                this.$toast.success(`Produto Adicionado ao carrinho!`);
            }
            console.log(this.order.items);
        },
        decrementItem(product) {
            const item = this.order.items.find((item) => item.product.uid === product.uid);
            if (item) {
                if (item.quantity > 1) {
                    this.order.items.indexOf(item).quantity--;
                } else {
                    this.order.items.splice(this.order.items.indexOf(item), 1);
                    this.$toast.success(`Produto Removido do carrinho!`);
                }
            }
        },
        filteredItens(category) {
            if (!category || category == 'Geral') return this.products;

            return this.products.filter((product) => {
                return product.categories.includes(category);
            });
        },
        addCart(item) {
            this.order.items.push(item);
            this.item = {
                product: {},
                quantity: 0,
            };
            this.$toast.success(`Item adicionado ao carrinho!`);
        },
        removeCart(item) {
            this.order.items.push(item);
            this.item = {
                product: {},
                quantity: 0,
            };
            this.$toast.success(`Item removido do carrinho!`);
        },
        sendOrder() {
            if (sessionStorage.getItem('order')) {
                let oldOrder = JSON.parse(sessionStorage.getItem('order'));
                oldOrder.items = this.order.items;

                OrderService.save(oldOrder).then(() => {
                    this.$toast.success('Pedido Atualizado com sucesso!');
                    this.$router.push('/pedidos');
                });

                sessionStorage.setItem('order', JSON.stringify(oldOrder));
            } else {
                const order = _.extend(FirestoreUtils.getBaseInfo(), {
                    items: this.order.items,
                    totalAmount: this.order.items.reduce((sum, item) => {
                        return sum + item.product.price * item.quantity;
                    }, 0),
                    paid: false,
                });
                OrderService.save(order).then(() => {
                    this.$toast.success(`Pedido Criado com sucesso!`);
                    this.$router.push('/pedidos');
                });
                sessionStorage.setItem('order', JSON.stringify(order));
            }
        },
        loadOrder() {
            const orderFromSession = JSON.parse(sessionStorage.getItem('order'));
            if (orderFromSession) {
                return orderFromSession;
            } else {
                const order = OrderService.createNewOrder();
                sessionStorage.setItem('order', JSON.stringify(order));
                return order;
            }
        },
    },
    components: {
        ProductSelectionModal,
    },
});
</script>

<style scoped>
.scroll {
    max-height: 200vw;
}
</style>
