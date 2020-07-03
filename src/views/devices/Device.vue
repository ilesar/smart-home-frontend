<template>
    <div style="padding: 0px;" ref="configcard">
        <a-card :bordered="false" class="configuration-card"
                :body-style="{padding: '0', height: !$isMobile() ? 'calc(100vh - 129px)' : 'calc(100vh - 65px)', overflowY: 'scroll'}">
            <template slot="title" style="line-height: 32px">
                <a-affix :target="() => this.$refs.configcard">
                    Predlošci
                    <a-button type="primary"
                              style="float: right; margin-right: 8px"
                              @click="newConfiguration"
                    >
                        Stvori novi predložak
                    </a-button>
                </a-affix>

            </template>
            <a-list itemLayout="horizontal" :dataSource="templates">
                <a-empty
                        v-if="templates.length === 0"
                        :style="{ paddingTop: '64px'}"
                        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                        :imageStyle="{height: '60px'}"
                >
                </a-empty>
                <a-list-item :style="{padding: '16px 24px', cursor: !template.isActive ? 'pointer' : 'default'}"
                             slot="renderItem" slot-scope="template"
                             @click="() => template.isActive ? null : activateTemplate(template)">
                    <a-list-item-meta>
                        <a slot="title">
                            {{ template.name }}
                        </a>
                        <a slot="description">
                            <a-col style="width: 20vw; min-width: 200px">
                                <a-progress
                                        :strokeColor="lampColorSchema(template)"
                                        :percent="100"
                                        type="line"
                                        :strokeWidth="10"
                                        :show-info="false"
                                />
                            </a-col>
                        </a>
                    </a-list-item-meta>

                    <a slot="actions">
                        <a-badge
                                :count="'Aktivno'"
                                v-if="template.isActive === true && !activating"
                                :numberStyle="{
                                    backgroundColor: '#FFFFFF',
                                    color: '#1890ff',
                                    boxShadow: '0 0 0 1px #d9d9d9 inset',
                                  }"
                                style="margin-right: 50%"
                        >

                        </a-badge>
                        <!--                        <a-button type="default"-->
                        <!--                                  style="float: right; margin-right: 0px"-->
                        <!--                                  v-if="template.isActive === false && !activating"-->
                        <!--                                  @click="activateTemplate(template)"-->
                        <!--                        >-->
                        <!--                            Aktiviraj-->
                        <!--                        </a-button>-->
                    </a>

                </a-list-item>
            </a-list>
        </a-card>
    </div>
</template>s

<script lang="ts">
    import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
    import {Action, Getter} from 'vuex-class';
    import ColorInput from '@/components/devices/inputs/ColorInput.vue';
    import ColorInputGroup from '@/components/devices/inputs/ColorInputGroup.vue';
    import InputWrapper from '@/components/devices/InputWrapper.vue';
    import Device from '@/api/models/Device';
    import ConfigurationTemplate from '@/api/models/ConfigurationTemplate';
    import {EventBus} from "@/helpers/EventBusHelper";
    import {EventBusEvents} from "@/enums/EventBusEvents";
    import GroceryItem from "@/api/models/GroceryItem";
    import {DrawerDataInterface} from "@/interfaces/DrawerDataInterface";
    import DeviceConfigurationForm from "@/components/forms/DeviceConfigurationForm.vue";


    const mqtt = require('mqtt');

    @Component({
        name: 'Device',
        components: {
            InputWrapper,
            ColorInputGroup,
            ColorInput,
        },
    })
    export default class DeviceConfiguration extends Vue {
        @Action('rooms/fetchRooms') private fetchRooms;
        @Action('configurationtemplates/updateConfigurationTemplate')
        private updateConfigurationTemplate;
        @Action('configurationtemplates/activateLocalTemplate')
        private activateLocalTemplate;

        private activating = false;

        public created() {
            this.fetchRooms();
        }

        public newConfiguration() {
            EventBus.$emit(EventBusEvents.OpenDrawer, {
                title: 'Dodaj novi predložak',
                model: {},
                component: DeviceConfigurationForm,
                submitText: 'Spremi',
                onSubmit: (drawer: DeviceConfigurationForm, model: GroceryItem) => {
                },
            } as DrawerDataInterface<GroceryItem>);
        }

        public get device(): Device {
            return this.$store.getters['devices/getDeviceById'](this.$route.params.deviceSlug);
        }

        public get templates(): ConfigurationTemplate[] {
            if (this.device) {
                return this.device.configuration.templates;
            }

            return [];
        }

        public lampColorSchema(template: ConfigurationTemplate) {
            const schema = {};
            let i = 0;

            for (const configurationItem of template.items) {
                const percent = Math.round(i * (100 / (template.items.length - 1))) + '%';
                schema[percent] = configurationItem.value;
                i++;
            }

            return schema;
        }


        public activateTemplate(currentTemplate: ConfigurationTemplate) {
            this.activateLocalTemplate(currentTemplate);

            currentTemplate.isActive = true;
            this.updateConfigurationTemplate(currentTemplate).then(() => {
                this.fetchRooms();
            });
        }

    }
</script>

<style lang="scss" scoped>
    .device-icon {
        font-size: 50vw;
    }

    .configuration-card {
        height: 100%;
        overflow-y: hidden;
    }

</style>
