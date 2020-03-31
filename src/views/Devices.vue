<template>
    <a-row :gutter="16">
        <a-col class="gutter-row" :span="6">
            <div class="gutter-box">
                <a-card hoverable>
                    <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            slot="cover"
                    />
                    <template class="ant-card-actions" slot="actions">
                        <a-icon type="setting" key="setting" />
                        <a-icon type="edit" key="edit" />
                        <a-icon type="ellipsis" key="ellipsis" />
                    </template>
                    <a-card-meta title="Card title" description="This is the description">
                        <a-avatar
                                slot="avatar"
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        />
                    </a-card-meta>
                </a-card>
            </div>
        </a-col>
        <a-col class="gutter-row" :span="6">
            <div class="gutter-box">
                <a-card hoverable>
                    <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            slot="cover"
                    />
                    <template class="ant-card-actions" slot="actions">
                        <a-icon type="setting" key="setting" />
                        <a-icon type="edit" key="edit" />
                        <a-icon type="ellipsis" key="ellipsis" />
                    </template>
                    <a-card-meta title="Card title" description="This is the description">
                        <a-avatar
                                slot="avatar"
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        />
                    </a-card-meta>
                </a-card>
            </div>
        </a-col>
        <a-col class="gutter-row" :span="6">
            <div class="gutter-box">
                <a-card hoverable>
                    <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            slot="cover"
                    />
                    <template class="ant-card-actions" slot="actions">
                        <a-icon type="setting" key="setting" />
                        <a-icon type="edit" key="edit" />
                        <a-icon type="ellipsis" key="ellipsis" />
                    </template>
                    <a-card-meta title="Card title" description="This is the description">
                        <a-avatar
                                slot="avatar"
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        />
                    </a-card-meta>
                </a-card>
            </div>
        </a-col>
        <a-col class="gutter-row" :span="6">
            <div class="gutter-box">
                <a-card hoverable>
                    <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            slot="cover"
                    />
                    <template class="ant-card-actions" slot="actions">
                        <a-icon type="setting" key="setting" />
                        <a-icon type="edit" key="edit" />
                        <a-icon type="ellipsis" key="ellipsis" />
                    </template>
                    <a-card-meta title="Card title" description="This is the description">
                        <a-avatar
                                slot="avatar"
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        />
                    </a-card-meta>
                </a-card>
            </div>
        </a-col>
    </a-row>
<!--    <div class="home">-->
<!--        <HelloWorld msg="Welcome to Your Vue.js App"/>-->
<!--        <HelloWorldWrapper msg="Welcome to Your Vue.js App"/>-->
<!--        <HelloWorldDuoTone msg="Welcome to Your Vue.js App"/>-->
<!--    </div>-->
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
  import HelloWorld from '@/components/home/HelloWorld.vue';
  import HelloWorldDuoTone from '@/components/home/HelloWorldDuoTone.vue';
  import HelloWorldWrapper from '@/components/home/HelloWorldWrapper.vue';
  import { LoadingOverlayHelper } from '@/helpers/LoadingOverlayHelper';
  import {
    State,
    Getter,
    Action,
    Mutation,
    namespace,
  } from 'vuex-class';

  @Component({
    name: 'Devices',
    components: {
      HelloWorldDuoTone,
      HelloWorldWrapper,
      HelloWorld,
    },
  })
  export default class Devices extends Vue {
    @Action('shoppingModule/getItems') private actionFoo;

    private loadingOverlay = new LoadingOverlayHelper(this, {});

    public mounted() {

      // console.log('starting');
      // this.loadingOverlay.start();
      //
      // setTimeout(() => {
      //   this.loadingOverlay.stop();
      // }, 1000);
    }
  }

</script>

<style lang="scss" scoped>
    .gutter-example >>> .ant-row > div {
        background: transparent;
        border: 0;
    }
    .gutter-box {
        /*background: #00a0e9;*/
        padding: 5px 0;
    }
</style>
