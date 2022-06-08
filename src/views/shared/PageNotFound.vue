<template>
    <div class="d-flex flex-column align-center">
        <div class="text-h4 mt-12 mb-6 pt-12 text-center" color="green">Ops... não encontramos essa página!</div>
        <div class="text-h7 mt-5 mb-12 text-center">Por favor, volte para a página anterior.</div>
        <GoBackButton></GoBackButton>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import GoBackButton from '@/components/buttons/GoBackButton.vue';
export default defineComponent({
    name: 'PageNotFound',
    components: {
        GoBackButton,
    },
});
</script>
