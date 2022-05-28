<template>
    <v-dialog v-model="open">
        <v-card>
            <v-card-title>
                <span>Cadastrar produto</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="close()">
                    <v-icon> mdi-close </v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-form ref="productFormulary" lazy-validation>
                    <v-row>
                        <v-col cols="9">
                            <v-text-field label="Nome" v-model="newProduct.name"></v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field label="Preço" type="number" v-model="newProduct.price"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-textarea label="Descrição" v-model="newProduct.description"></v-textarea>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="close()">Cancelar</v-btn>
                <v-btn @click="register()">Cadastrar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { defineComponent } from 'vue';
import ProductService from '@/services/product.service';
import Helper from '@/utils/helper';

export default defineComponent({
    name: 'ProductRegisterModal',
    data: () => ({
        newProduct: {},
    }),
    props: {
        open: { type: Boolean, default: false },
    },
    methods: {
        close() {
            this.$emit('close');
        },
        register() {
            const formularyIsValid = this.$refs.productFormulary.validate();
            if (formularyIsValid) {
                this.newProduct.uid = Helper.generateUid();
                this.newProduct.createdAt = new Date();
                this.newProduct.updatedAt = new Date();

                ProductService.save(this.newProduct).then(() => {
                    this.$emit('on-create', this.newProduct);
                    this.newProduct = {};
                });
            }
        },
    },
});
</script>
