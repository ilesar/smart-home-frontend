<template>
    <a-list itemLayout="horizontal" :dataSource="dateSource" class="item-list">
        <a-list-item slot="renderItem" slot-scope="item" style="padding-right: 24px">
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
            <a-button type="default" shape="round" icon="edit" @click="editItem(item)"
                      style="margin-left: 16px">
            </a-button>
            <a-button type="danger" shape="round" icon="delete" @click="deleteItem(item)"
                      style="margin-left: 16px">
            </a-button>
        </a-list-item>
    </a-list>
</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
  import RecurringPayment from '@/api/models/RecurringPayment';
  import {EventBus} from '@/helpers/EventBusHelper';
  import {EventBusEvents} from '@/enums/EventBusEvents';
  import RecurringPaymentForm from '@/components/forms/RecurringPaymentForm.vue';
  import {DrawerDataInterface} from '@/interfaces/DrawerDataInterface';
  import moment from 'moment';

  @Component({
    name: 'ItemList',
    components: {},
  })
  export default class ItemList extends Vue {
    @Prop()
    private dateSource;

    @Emit('on-delete')
    public deleteItem(item: RecurringPayment) {
        return item;
    }

    @Emit('on-edit')
    public editItem(item: RecurringPayment) {
      return item;
    }
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
