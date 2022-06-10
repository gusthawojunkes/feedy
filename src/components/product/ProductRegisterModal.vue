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
                <v-form v-model="valid" ref="productFormulary" lazy-validation>
                    <v-row>
                        <v-col cols="8">
                            <v-text-field label="Nome" v-model="newProduct.name" required :rules="nameRules"></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field label="Preço" type="number" v-model="newProduct.price" :rules="priceRules" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-select
                                label="Categoria"
                                v-model="newProduct.categories"
                                :rules="categoryRules"
                                :items="availableCategories"
                                multiple
                                outlined
                                dense
                                required
                            ></v-select>
                        </v-col>
                        <v-col>
                            <v-textarea label="Descrição" rows="2" v-model="newProduct.description" :rules="descriptionRules" required></v-textarea>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="close()">Cancelar</v-btn>
                <v-btn @click="reset()">Limpar</v-btn>
                <v-btn @click="register()">Cadastrar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { defineComponent } from 'vue';
import ProductService from '@/services/product.service';
import CategorieService from '../../services/categorie.service';
import Helper from '@/utils/helper';
import FormularyUtils from '@/utils/formulary.util';

export default defineComponent({
    mounted() {
        this.availableCategories = CategorieService.defaults();
    },
    name: 'ProductRegisterModal',
    data: () => ({
        valid: false,
        newProduct: {},
        availableCategories: [],
        nameRules: [FormularyUtils.validateIsNotNull('Nome é obrigatório')],
        priceRules: [FormularyUtils.validateIsNotNull('Preço é obrigatório')],
        categoryRules: [FormularyUtils.validateIsNotNull('Categoria é obrigatório')],
        descriptionRules: [FormularyUtils.validateIsNotNull('Descrição é obrigatório')],
    }),
    props: {
        open: { type: Boolean, default: false },
    },
    methods: {
        close() {
            this.$emit('close');
        },
        register() {
            const formsValidation = this.$refs.productFormulary.validate();
            formsValidation.then((validation) => {
                const isValid = validation.valid;
                if (isValid) {
                    this.newProduct.uid = Helper.generateUid();
                    this.newProduct.createdAt = new Date();
                    this.newProduct.updatedAt = new Date();

                    ProductService.save(this.newProduct)
                        .then(() => {
                            this.$emit('on-create', this.newProduct);
                            this.newProduct = {};
                            this.$toast.success(`Produto Criado com Sucesso!`);
                        })
                        .catch((error) => {
                            if (error && error.massage) {
                                console.error(error.massage);
                            }
                            this.$toast.error(`Erro ao criar o produto!`);
                        });
                } else {
                    this.$toast.warning(`Existem inconsistências! Verifique o formulário!`);
                }
            });
        },
        reset() {
            this.$refs.productFormulary.reset();
            this.newProduct.categories = [];
            this.$nextTick(() => {
                this.$refs.productFormulary.resetValidation();
            });
        },
    },
});
</script>
