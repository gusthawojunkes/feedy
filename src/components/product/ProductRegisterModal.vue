<template>
    <v-dialog v-model="open">
        <v-card>
            <v-card-title>
                <span>Cadastro de produto</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="close()">
                    <v-icon> mdi-close </v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-form v-model="valid" ref="productFormulary" lazy-validation>
                    <v-row>
                        <v-col cols="8">
                            <v-text-field label="Nome" type="text" v-model="product.name" :rules="nameRules" required></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field label="Preço" type="number" v-model="product.price" :rules="priceRules" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-select
                                label="Categoria"
                                ref="categories"
                                v-model="product.categories"
                                :rules="categoryRules"
                                :items="availableCategories"
                                multiple
                                outlined
                                dense
                                required
                            ></v-select>
                        </v-col>
                        <v-col>
                            <v-textarea label="Descrição" type="text" rows="2" v-model="product.description" :rules="descriptionRules" required></v-textarea>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="close()">Cancelar</v-btn>
                <v-btn @click="reset()">Limpar</v-btn>
                <v-btn @click="save()">Salvar</v-btn>
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
    name: 'ProductRegisterModal',
    mounted() {
        this.availableCategories = CategorieService.defaults();
        this.product = this.productData;
    },

    data: () => ({
        valid: false,
        availableCategories: [],
        nameRules: [FormularyUtils.validateIsNotNull('Nome é obrigatório')],
        priceRules: [FormularyUtils.validateIsNotNull('Preço é obrigatório')],
        categoryRules: [FormularyUtils.validateIsNotNull('Categoria é obrigatório')],
        descriptionRules: [FormularyUtils.validateIsNotNull('Descrição é obrigatório')],
    }),
    props: {
        open: { type: Boolean, default: false },
        productData: { type: Object, default: () => ({}) },
    },
    methods: {
        close() {
            this.$emit('close');
        },
        save() {
            const formsValidation = this.$refs.productFormulary.validate();
            formsValidation.then((validation) => {
                const isValid = validation.valid;
                if (isValid) {
                    this.generateInitialData();
                    this.product.updatedAt = new Date();

                    ProductService.save(this.product)
                        .then(() => {
                            this.$emit('on-create', this.product);
                            this.$toast.success(`Produto Salvo com Sucesso!`);
                        })
                        .catch((error) => {
                            if (error && error.massage) {
                                console.error(error.massage);
                            }
                            this.$toast.error(`Erro ao salvar o produto!`);
                        });
                } else {
                    this.$toast.warning(`Existem inconsistências! Verifique o formulário!`);
                }
            });
        },
        reset() {
            this.$refs.productFormulary.reset();
            this.product.categories = [];
            this.$nextTick(() => {
                this.$refs.productFormulary.resetValidation();
            });
        },

        generateInitialData() {
            if (!this.product.uid) {
                this.product.uid = Helper.generateUid();
                this.product.createdAt = new Date();
            }
        },
    },
});
</script>
