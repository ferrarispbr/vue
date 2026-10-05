<script setup lang="ts">
    import { ref } from 'vue'
    import AppContent from './AppContent.vue'
    import AppFooter from './AppFooter.vue'
    import AppMenu from './AppMenu.vue'
    import AppTopBar from './AppTopBar.vue'

    const mobileBreakpoint      =   window.matchMedia('(max-width: 991.98px)',)
    const isMobileMenuOpen      =   ref(false)
    const isDesktopMenuCollapsed=   ref(false)

    function toggleMenu() 
    {
        if (mobileBreakpoint.matches) 
        {
            isMobileMenuOpen.value = !isMobileMenuOpen.value
            return
        }

        isDesktopMenuCollapsed.value = !isDesktopMenuCollapsed.value
    }

    /***
     * @description Fecha o menu mobile
     * Ela é usada em dois momentos:
     *      quando a pessoa clica no fundo escurecido atrás do menu;
     *      quando a pessoa navega para uma página pelo menu.
     *      quando em desktop, ela não faz nada, 
     *          pois o menu lateral não funciona como um painel que
     *         abre e fecha sobre o conteúdo.
     */
    function closeMobileMenu()
    {
        if (mobileBreakpoint.matches)
        {
            isMobileMenuOpen.value = false
        }
    }

</script>

<template>
    <div class="app-layout" :class="{'app-layout--menu-collapsed':isDesktopMenuCollapsed,}">
        <AppTopBar @toggle-menu="toggleMenu" />
        <button v-if="isMobileMenuOpen" @click="closeMobileMenu" class="app-menu-backdrop" type="button" aria-label="Fechar menu"></button>
        <div class="app-layout__workspace">
            <AppMenu :is-open="isMobileMenuOpen" @navigate="closeMobileMenu"/>
            <div class="app-layout__main-column">
                <AppContent />
                <AppFooter />
            </div>
        </div>
    </div>
</template>