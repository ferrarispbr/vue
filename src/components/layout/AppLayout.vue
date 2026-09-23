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