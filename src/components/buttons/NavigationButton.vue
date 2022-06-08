<template>
    <v-btn class="py-12" block :to="properties.path">{{ properties.title }}</v-btn>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'NavigationButton',

    props: {
        properties: {
            type: Object,
            required: true,
        },
    },
});
</script>
