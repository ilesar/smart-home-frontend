<template>
    <a-list itemLayout="horizontal" :dataSource="dateSource" class="item-list">
        <a-list-item slot="renderItem" slot-scope="item">
            <a-list-item-meta
                    :description="item.price + ' KN'"
            >
                <p slot="title">{{item.name}}</p>
                <a-avatar
                        slot="avatar"
                        :icon="item.paymentTag"
                        style="color: #1890ff; background: white"
                />
            </a-list-item-meta>
            <a-badge status="success" text="Automatizirano" v-if="item.isAutomated" style="padding-right: 24px"/>
        </a-list-item>
    </a-list>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component({
    name: 'ItemList',
    components: {},
  })
  export default class ItemList extends Vue {
    @Prop()
    private dateSource;
  }
</script>

<style lang="scss" scoped>
    .ant-tabs-bar.ant-tabs-top-bar {
        margin-bottom: 0px !important;
    }
    .item-list {
        height: calc(100vh - 236px);
        overflow-y: scroll;
    }
</style>
