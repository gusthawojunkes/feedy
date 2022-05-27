<template>
    <v-tabs v-model="tab" class="mb-5">
        <v-tab v-for="category in productsCategorys" :key="category" :value="category">{{ category }} </v-tab>
    </v-tabs>
    <v-window v-model="tab" height="500px">
        <v-window-item v-for="category in productsCategorys" :key="category" :value="category">
            <v-list v-for="product in filteredItens(category)" :key="product.getUid" :text="product.getName" @click="openDialog(product)">
                <v-card class="mx-auto d-flex flex-no-wrap">
                    <v-img :src="imagem" height="150px" cover></v-img>
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
                        <v-img height="500" :src="imagem" cover class="align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"> </v-img>
                        <v-list class="mx-3">
                            <v-card>
                                <div class="mt-9">
                                    <v-card-subtitle class="text-1 font-weight-black">{{ dialogProduct.name }}</v-card-subtitle>
                                    <v-card-title> R$ {{ dialogProduct.price }}</v-card-title>
                                </div>

                                <v-divider class="mx-4"></v-divider>

                                <v-card-text>
                                    <div class="mt-4 mb-9">{{ dialogProduct.description }}</div>
                                </v-card-text>
                            </v-card>
                        </v-list>
                        <div class="d-flex justify-space-between ma-3">
                            <div>
                                <v-btn icon dark @click="decrementItem()">
                                    <v-icon>mdi-minus</v-icon>
                                </v-btn>
                                <h1 class="mx-3">{{ this.dialogProduct.quantity }}</h1>
                                <v-btn icon dark text @click="incrementItem()">
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </div>
                            <div class="text-center my-1">
                                <v-btn rounded dark size="large" @click="addCart(dialogProduct)"> Adicionar </v-btn>
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

export default defineComponent({
    async mounted() {
        this.products = [];
        this.productsCategorys = this.getProductsCategorys();
    },
    data() {
        return {
            tab: 'Geral',
            dialog: false,
            isActive: true,
            imagem: this.getImage(),
            products: [],
            productsCategorys: [],
            cartProducts: [],
            dialogProduct: {},
        };
    },
    methods: {
        openDialog(product) {
            this.dialog = true;
            this.dialogProduct = product;
        },
        incrementItem() {
            if (isNaN(this.dialogProduct.quantity)) this.dialogProduct.quantity = 0;
            this.dialogProduct.quantity = this.dialogProduct.quantity + 1;
        },
        decrementItem() {
            console.log(this.dialogProduct);
            if (isNaN(this.dialogProduct.quantity)) this.dialogProduct.quantity = 0;
            this.dialogProduct.quantity = this.dialogProduct.quantity - 1;
        },
        filteredItens(category) {
            if (category == 'Geral') return this.products;

            return this.products.filter((product) => product.category == category);
        },
        getImage() {
            let urlImageFirebase = '';

            if (urlImageFirebase == '') {
                return null;
            } else {
                return urlImageFirebase;
            }
        },
        getProductsCategorys() {
            const prods = this.products.map((product) => {
                return product.category;
            });

            const allProds = Array.from(prods);
            allProds.unshift('Geral');
            return allProds;
        },
        addCart(item) {
            return this.cartProducts.push(item);
        },
    },
});
</script>

<style scoped>
.scroll {
    max-height: 200vw;
}
</style>
