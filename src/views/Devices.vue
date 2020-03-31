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

<script>
  import HelloWorld from '@/components/home/HelloWorld.vue'
  import HelloWorldDuoTone from '@/components/home/HelloWorldDuoTone'
  import HelloWorldWrapper from '@/components/home/HelloWorldWrapper'

  export default {
    name: 'Devices',
    components: {
      HelloWorldDuoTone,
      HelloWorldWrapper,
      HelloWorld,
    },
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
