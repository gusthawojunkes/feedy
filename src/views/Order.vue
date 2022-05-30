<template>
    <v-tabs v-model="tab" class="mb-5">
        <v-tab v-for="category in productsCategorys" :key="category" :value="category">{{ category }} </v-tab>
    </v-tabs>
    <v-window v-model="tab" height="500px">
        <v-window-item v-for="category in productsCategorys" :key="category" :value="category">
            <v-list v-for="product in filteredItens(category)" :key="product.getUid" :text="product.getName" @click="openItemModal(product)">
                <v-card class="mx-auto d-flex flex-no-wrap">
                    <v-img :src="product.image" height="150px" cover></v-img>
                    <v-col>
                        <v-card-title> {{ product.name }} </v-card-title>
                        <v-card-subtitle> R$ {{ product.price }} </v-card-subtitle>
                    </v-col>
                </v-card>
            </v-list>
        </v-window-item>
    </v-window>
    <div class="fill-height my-4">
        <v-btn block> Confirmar Pedido </v-btn>
    </div>
    <v-dialog v-model="dialog" fullscreen>
        <v-card>
            <v-toolbar>
                <v-btn icon dark @click="dialog = false">
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-toolbar-title>Voltar</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-responsive class="overflow-y-auto scroll">
                <v-lazy
                    v-model="isActive"
                    :options="{
                        threshold: 0.5,
                    }"
                    transition="fade-transition"
                >
                    <div>
                        <v-img height="500" :src="item.product.image" cover class="align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"> </v-img>
                        <v-list class="mx-3">
                            <v-card>
                                <div class="mt-9">
                                    <v-card-subtitle class="text-1 font-weight-black">{{ item.product.name }}</v-card-subtitle>
                                    <v-card-title> R$ {{ item.product.price }}</v-card-title>
                                </div>

                                <v-divider class="mx-4"></v-divider>

                                <v-card-text>
                                    <div class="mt-4 mb-9">{{ item.product.description }}</div>
                                </v-card-text>
                            </v-card>
                        </v-list>
                        <div class="d-flex justify-space-between ma-3">
                            <div>
                                <v-btn icon dark @click="decrementItem()">
                                    <v-icon>mdi-minus</v-icon>
                                </v-btn>
                                <h1 class="mx-3">{{ this.item.quantity }}</h1>
                                <v-btn icon dark text @click="incrementItem()">
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </div>
                            <div class="text-center my-1">
                                <v-btn rounded dark size="large" @click="addCart(item)"> Adicionar </v-btn>
                            </div>
                        </div>
                    </div>
                </v-lazy>
            </v-responsive>
        </v-card>
    </v-dialog>
</template>
<script>
import { defineComponent } from 'vue';
import CategorieService from '@/services/categorie.service';
import ProductService from '@/services/product.service';

export default defineComponent({
    name: 'ProductList',
    async mounted() {
        this.products = await ProductService.getAll();
        this.productsCategorys = CategorieService.defaults();
    },
    data: () => ({
        tab: 'Geral',
        dialog: false,
        isActive: true,
        products: [],
        productsCategorys: [],
        cartProducts: [],
        item: {
            product: {},
            quantity: 0,
        },
    }),
    methods: {
        openItemModal(newItem) {
            this.dialog = true;
            this.item.product = newItem;
            console.log(this.item);
        },
        incrementItem() {
            this.item.quantity = this.item.quantity + 1;
        },
        decrementItem() {
            if (this.item.quantity == 0) return;
            this.item.quantity = this.item.quantity - 1;
        },
        filteredItens(category) {
            if (category == 'Geral') return this.products;

            return this.products.filter((product) => {
                return product.categories.includes(category);
            });
        },
        addCart(item) {
            console.log(item);
            this.cartProducts.push(item);
            this.dialog = false;
        },
    },
});
</script>

<style scoped>
.scroll {
    max-height: 200vw;
}
</style>
