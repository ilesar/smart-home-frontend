<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25">
        <g fill="none" fill-rule="evenodd">
            <rect width="16" height="16" x="2.5" y="2.5" stroke="#2658a5" rx="2" />
            <path stroke="#2658a5"
                  stroke-linejoin="round"
                  d="M20 5h1c.5 0 1 .5 1 1v15c0 .5-.5 1-1.006 1.003C11.444 22.053 6.446 22 6 22c-.5 0-1-.5-1-1v-1" />
            <path fill="#2658a5" d="M10 6h1v9h-1z" />
            <path fill="#2658a5" d="M15 10v1H6v-1z" />
        </g>
    </svg>

</template>

<script>
    import { Component, Vue } from 'vue-property-decorator';

    @Component({
        name: 'DuplicateIcon',
    })
    export default class DuplicateIcon extends Vue {
    }
</script>

<style lang="scss" scoped>

</style>
