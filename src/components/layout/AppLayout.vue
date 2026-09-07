<script setup lang="ts">
import AppContent from './AppContent.vue'
import AppFooter from './AppFooter.vue'
import AppMenu from './AppMenu.vue'
import AppTopBar from './AppTopBar.vue'
</script>

<template>
    <div class="app-layout">
        <AppTopBar />

        <div class="app-layout__workspace">
            <AppMenu />

            <div class="app-layout__main-column">
                <AppContent />
                <AppFooter />
            </div>
        </div>
    </div>
</template>