<script setup lang="ts">
    import { MENU } from '@/config/menu';

    import AppMenuItem from './AppMenuItem.vue';
    import TopBarUsuario from './TopBarUsuario.vue';

    defineProps<{
        isOpen: boolean;
    }>();

    const emit = defineEmits<{
        navigate: [];
    }>();

    function handleNavigation()
    {
        emit('navigate');
    }
</script>

<template>
    <nav
        id="main-navigation"
        class="app-menu"
        :class="{ 'app-menu--open': isOpen }"
        aria-label="Menu principal"
    >
        <div class="app-menu__user">
            <TopBarUsuario />
        </div>

        <ul class="app-menu__list">
            <AppMenuItem
                v-for="item in MENU"
                :key="item.id"
                :item="item"
                @navigate="handleNavigation"
            />
        </ul>
    </nav>
</template>