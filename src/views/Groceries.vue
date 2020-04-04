<template>
    <a-list itemLayout="horizontal" :dataSource="groceryList">
        <a-list-item slot="renderItem" slot-scope="item, index">
            <a-list-item-meta
                    :description="item.price + ' KN'"
            >
                <p slot="title">{{item.name}}</p>
                <a-avatar
                        slot="avatar"
                        :src="item.image ? item.image.path : 'testiram'"
                />
            </a-list-item-meta>
        </a-list-item>
    </a-list>
</template>

<script lang="ts">
  import {LoadingOverlayHelper} from '@/helpers/LoadingOverlayHelper';
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
  import {Action, Getter} from 'vuex-class';

  @Component({
    name: 'Groceries',
    components: {},
  })
  export default class Groceries extends Vue {

    private loadingOverlay = new LoadingOverlayHelper(this, {});

    @Getter('groceries/getGroceryItemList')
    private groceryList;
    @Action('groceries/fetchGroceryItemList')
    private fetchGroceryItemList;


    public beforeMount() {
      this.fetchGroceryItemList();
    }

  }
</script>
