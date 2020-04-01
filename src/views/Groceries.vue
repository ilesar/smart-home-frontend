<template>

</template>

<script lang="ts">
  import HelloWorldDuoTone from '@/components/home/HelloWorldDuoTone.vue';
  import HelloWorldWrapper from '@/components/home/HelloWorldWrapper.vue';
  import HelloWorld from '@/components/home/HelloWorld.vue';
  import {LoadingOverlayHelper} from '@/helpers/LoadingOverlayHelper';
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
  import GroceryItem from '@/api/models/GroceryItem';

  @Component({
    name: 'Groceries',
    components: {},
  })
  export default class Groceries extends Vue {

    public listData;
    private loadingOverzlay = new LoadingOverlayHelper(this, {});

    public created() {
      for (let i = 0; i < 23; i++) {
        this.listData.push({
          href: 'https://www.antdv.com/',
          title: `ant design vue part ${i}`,
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
          content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        });
      }
    }

    public get pagination() {
      return {
        onChange: (page: number) => {
                    console.log(page);
        },
        pageSize: 10,
      };
    }

    public get actions() {
      return [
        {type: 'star-o', text: '156'},
        {type: 'like-o', text: '156'},
        {type: 'message', text: '2'},
      ];
    }
  }
</script>
