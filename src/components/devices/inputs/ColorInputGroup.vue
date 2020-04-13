<template>
    <a-row>
        <a-col :span="1" v-for="index in quantity" :key="index">
            <color-input></color-input>
        </a-col>
    </a-row>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
  import ColorInput from '@/components/devices/inputs/ColorInput.vue';

  @Component({
    name: 'ColorInputGroup',
    components: {
      ColorInput
    },
  })
  export default class ColorInputGroup extends Vue {
    @Prop()
    private quantity: number;
  }
</script>

<style lang="scss" scoped>

</style>
