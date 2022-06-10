<template>
    <v-tabs v-model="selectedCategory" class="my-12" fixed-tabs>
        <v-tab v-for="category in categories" :key="category" :value="category" class="mx-8">{{ category }} </v-tab>
    </v-tabs>
    <v-window v-model="selectedCategory">
        <v-window-item v-for="category in categories" :key="category" :value="category">
            <v-list v-for="product in filteredItens(selectedCategory)" :key="product.uid" :text="product.name">
                <v-card class="mx-auto my-4 d-flex flex-no-wrap">
                    <v-img :src="product.image" height="180px" cover></v-img>
                    <v-col class="d-flex flex-column justify-center">
                        <v-card-title>{{ product.name }} </v-card-title>
                        <div>
                            <v-card-subtitle> R$ {{ product.price }} </v-card-subtitle>
                            <v-chip class="ma-3" size="x-small" color="green" v-if="getQuantity(product)"> Adicionado ao Pedido </v-chip>
                        </div>
                    </v-col>
                    <div class="d-flex flex-column justify-center mr-4">
                        <v-btn variant="outline" @click="incrementItem(product)">
                            <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                        <div class="mx-8 my-4">{{ getQuantity(product) }}</div>
                        <v-btn variant="outline" @click="decrementItem(product)">
                            <v-icon dark>mdi-minus</v-icon>
                        </v-btn>
                    </div>
                </v-card>
            </v-list>
        </v-window-item>
    </v-window>
    <Dialog :props="orderConfirmationDialog"></Dialog>
    <v-btn class="my-12" color="#009688" block @click="sendOrder()"> Confirmar Pedido </v-btn>
</template>
<script>
import { defineComponent } from 'vue';
import CategorieService from '@/services/categorie.service';
import ProductService from '@/services/product.service';
import OrderService from '../services/order.service';
import FirestoreUtils from '../utils/firestore.util';
import _ from 'lodash';
import DialogVue from '../components/cards/Dialog.vue';

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
        showDialog: true,
        order: undefined,
        products: [],
        categories: [],
        items: [],
        selectedCategory: 'Geral',
        orderConfirmationDialog: {
            title: 'tese',
        },
        item: {
            product: {},
            quantity: 0,
        },
        orderConfirmation: {
            title: 'Deseja confirmar o Pedido?',
            model: true,
        },
    }),
    methods: {
        openItemModal(newItem) {
            this.dialog = true;
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
            if (category == 'Geral') return this.products;

            return this.products.filter((product) => {
                return product.categories.includes(category);
            });
        },
        getQuantity(product) {
            if (this.order.items) {
                const item = this.order.items.find((item) => item.product.uid === product.uid);
                if (item) {
                    return this.order.items.indexOf(item).quantity;
                }
            } else {
                return 0;
            }
        },
        addCart(item) {
            this.order.items.push(item);
            this.item = {
                product: {},
                quantity: 0,
            };
            this.dialog = false;
            this.$toast.success(`Item adicionado ao carrinho!`);
        },
        removeCart(item) {
            this.order.items.push(item);
            this.item = {
                product: {},
                quantity: 0,
            };
            this.dialog = false;
            this.$toast.success(`Item removido do carrinho!`);
        },
        sendOrder() {
            if (sessionStorage.getItem('order')) {
                let oldOrder = JSON.parse(sessionStorage.getItem('order'));
                oldOrder.items = this.order.items;

                OrderService.save(oldOrder).then(() => {
                    this.$toast.success(`Pedido Atualizado com sucesso!`);
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
        getItems() {
            if (this.order.items) {
                return this.order.items;
            } else {
                return [];
            }
        },
    },
    components: {
        DialogVue,
    },
});
</script>

<style scoped>
.scroll {
    max-height: 200vw;
}
</style>
