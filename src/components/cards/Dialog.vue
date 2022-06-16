<template>
    <v-dialog v-model="open" persistent>
        <v-card>
            <v-card-title class="text-h5 mx-12 mt-12"> {{ content.title }} </v-card-title>
            <v-card-text> {{ content.description }} </v-card-text>
            <v-card-actions class="mb-12">
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="send(false)"> Cancelar </v-btn>
                <v-btn color="green darken-1" text @click="send(true)"> Confirmar </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<!-- 

    TODO

    Finalizar o dialog;
    Estilizar a tela de inclusão e remoção de itens do pedido;
    Colocar o loading na tela de pedidos;
    Incluir a posibilidade do adm de editar o produto.

 -->

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'DialogVue',
    props: {
        open: { type: Boolean, default: false },
        content: {
            type: Object,
            default: () => ({
                titleButton: '',
                title: '',
                description: '',
                action: false,
            }),
        },
    },
    data: () => ({}),
    methods: {
        send(action) {
            this.$emit('close');
            if (action) {
                this.content.action = true;
            }
        },
    },
});
</script>

<style></style>
