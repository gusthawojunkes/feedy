<template>
    <v-app>
        <v-main>
            <div v-if="isDesktop">
                <v-container>
                    <router-view />
                </v-container>
            </div>
            <div v-else>
                <router-view />
            </div>
        </v-main>
        <BottomNavigationVue />
    </v-app>
</template>

<script>
import Helper from '@/utils/helper';
import BottomNavigationVue from '@/components/BottomNavigation.vue';
import '@/styles/styles.css';

const APPLICATION_NAME = 'Feedy';

export default {
    name: 'App',
    mounted() {
        this.isDesktop = Helper.isDesktop();
    },

    data: () => ({
        isDesktop: false,
    }),

    watch: {
        $route: {
            immediate: true,
            handler(to) {
                document.title = to.meta.title || APPLICATION_NAME;
            },
        },
    },
    components: {
        BottomNavigationVue,
    },
};
</script>
