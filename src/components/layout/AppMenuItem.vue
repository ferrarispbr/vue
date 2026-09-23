<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { RouterLink } from 'vue-router';
    import type { MenuItem } from '@/interfaces/MenuItem';

    const props = withDefaults(
        defineProps<{
            item: MenuItem;
            level?: number;
        }>(),
        {
            level: 1
        }
    );

    const emit = defineEmits<{
        navigate: [];
    }>();

    const isExpanded = ref(false);
    
    const hasChildren = computed(() =>
        Boolean(props.item.filhos?.length)
    );

    function toggleGroup()
    {
        isExpanded.value = !isExpanded.value;
    }

    function notifyNavigation()
    {
        emit('navigate');
    }
</script>

<template>
    <li class="app-menu__item":class="`app-menu__item--level-${level}`">
        <RouterLink v-if="item.rota" class="app-menu__link":to="item.rota" @click="notifyNavigation" >
            <i v-if="item.icone":class="['bi', item.icone]" aria-hidden="true"></i>
            <span class="app-menu__label">{{ item.titulo }}</span>
        </RouterLink>

        <button v-else-if="hasChildren" type="button"class="app-menu__group-button":aria-expanded="isExpanded":aria-label="`Alternar submenu ${item.titulo}`" @click="toggleGroup">
            <i v-if="item.icone":class="['bi', item.icone]" aria-hidden="true" ></i>
            <span class="app-menu__label">{{ item.titulo }}</span>
            <i class="bi bi-chevron-down app-menu__group-icon" aria-hidden="true"></i>
        </button>

        <ul v-if="hasChildren && isExpanded" class="app-menu__sublist">
            <AppMenuItem
                v-for="child in item.filhos"
                :key="child.id"
                :item="child"
                :level="level + 1"
                @navigate="notifyNavigation"
            />
        </ul>
    </li>
</template>