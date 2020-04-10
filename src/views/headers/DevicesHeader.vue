<template>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" :title="title" class="o-section-header" @back="goBack">
        <template slot="extra">
            <a-button type="default" @click="showDrawer" >
                Predlošci
            </a-button>
        </template>
        <a-drawer
                :title="`Odaberi predložak za ${room ? room.name : ''}`"
                placement="bottom"
                :closable="false"
                @close="onClose"
                :visible="visible"
                class="shopping-drawer"
                :bodyStyle="{ overflow: 'auto', height: '201px' }"
        >
        </a-drawer>
    </a-page-header>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {Getter} from 'vuex-class';
import Room from '@/api/models/Room';
import {RouteNames} from '@/enums/RouteNames';

@Component
export default class DevicesHeader extends Vue {
  private visible: boolean = false;


  public showDrawer() {
    this.visible = true;
  }

  public onClose() {
    this.visible = false;
  }

  public get room() {
    return this.$store.getters['rooms/getRoomById'](this.$route.params.roomSlug);
  }

  public goBack() {
    window.history.back();
  }

  public get title() {
    if (!this.room) {
      return '';
    }
    return `Uređaji u ${this.room.name}`;
  }
}
</script>

<style lang="scss" scoped>

</style>
