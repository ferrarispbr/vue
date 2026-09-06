<script setup lang="ts">

import AppTopBar from './AppTopBar.vue';
import AppMenu from './AppMenu.vue';
import AppContent from './AppContent.vue';
import AppFooter from './AppFooter.vue';

</script>

<template>

    <AppTopBar />

    <div class="d-flex">

        <AppMenu />

        <AppContent />

    </div>

    <AppFooter />

</template>