<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25">
        <g fill="none" fill-rule="evenodd" stroke="#2658a5">
            <path stroke-linejoin="round" d="M6 4.5l2 17h8l2-17"/>
            <path d="M3 4.5h18"/>
            <path stroke-linejoin="round" d="M9 4V2h6v2"/>
            <path d="M10 8v10M14 8v10"/>
        </g>
    </svg>

</template>

<script>
    import { Component, Vue } from 'vue-property-decorator';

    @Component({
        name: 'DeleteIcon',
    })
    export default class DeleteIcon extends Vue {
    }
</script>

<style lang="scss" scoped>

</style>
