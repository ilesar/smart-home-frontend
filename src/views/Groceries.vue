<template>
    <a-list itemLayout="horizontal" :dataSource="groceryList">
        <a-list-item slot="renderItem" slot-scope="item, index">
            <a-list-item-meta
                    :description="item.price + ' KN'"
            >
                <p slot="title">{{item.name}}</p>
                <a-avatar
                        slot="avatar"
                        :src="item.image ? item.image.image : 'testiram'"
                />
            </a-list-item-meta>
        </a-list-item>
    </a-list>
</template>

<script lang="ts">
  import HelloWorldDuoTone from '@/components/home/HelloWorldDuoTone.vue';
  import HelloWorldWrapper from '@/components/home/HelloWorldWrapper.vue';
  import HelloWorld from '@/components/home/HelloWorld.vue';
  import {LoadingOverlayHelper} from '@/helpers/LoadingOverlayHelper';
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
  import GroceryItem from '@/api/models/GroceryItem';
  import GroceryController from '@/api/controllers/GroceryController';

  @Component({
    name: 'Groceries',
    components: {},
  })
  export default class Groceries extends Vue {

    private groceryList = [];
    private loadingOverlay = new LoadingOverlayHelper(this, {});


    public beforeMount() {
      this.loadingOverlay.start();
      GroceryController.fetchAll().then(() => {
        this.loadingOverlay.stop();

        this.groceryList = GroceryItem.query().with('image').all();
        console.log(this.groceryList);
      });
    }

  }
</script>
