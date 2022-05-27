<template>
    <div>
        <h1>Página não encontrada</h1>
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
