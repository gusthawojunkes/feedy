<template>
    <div class="dialog">
        <div class="dialog__header">
            <h3 class="dialog__title">{{ prop.title }}</h3>
            <button class="dialog__close" @click="close">&times;</button>
        </div>
        <div class="dialog__body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'ProductCard',
    props: {
        product: { type: Object, default: () => {} },
    },
    data: () => ({
        showDescription: false,
    }),
});
</script>

<style></style>
