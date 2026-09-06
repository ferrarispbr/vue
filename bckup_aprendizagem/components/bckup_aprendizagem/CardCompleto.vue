

<template>

    <div class="card mt-3">

        <div class="card-header">
            <slot name="header">Cabeçaho Padrão</slot>
        </div>

        <div class="card-body">
            <slot></slot>
        </div>

        <div class="card-footer">
            <slot name="footer">Rodapé Padrão</slot>
        </div>

    </div>

</template>