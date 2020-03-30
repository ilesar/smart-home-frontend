<template>
    <div class="co-popup">
        <a-modal
            :visible="visible"
            :footer="null"
            :width="popupEvent === popupEvents.openAddMaterials ? '600px' : '90%'"
            @cancel="closePopup()"
        >
        </a-modal>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { EventBus } from '@/helpers/EventBusHelper';
import { EventBusEvents } from '@/enums/EventBusEvents';
import { PopupEvents } from '@/enums/PopupEvents';
import { PopupEventData } from '@/interfaces/PopupEventData';

@Component({
    name: 'Popup',
    components: {},
})
export default class Popup extends Vue {
    public popupEvents: any = PopupEvents;
    public popupData: any = null;
    private title: string = '';
    private visible: boolean = false;
    private popupEvent: string = '';

    private eventBusListeners() {
        EventBus.$on(EventBusEvents.openAddProductsPopup, (eventData: PopupEventData) => {
            this.openPopup(eventData.popupEvent);

            if (eventData.data === undefined) {
                return;
            }

            this.popupData = eventData.data;
        });

        EventBus.$on(EventBusEvents.openMaterialsPopup, (eventData: PopupEventData) => {
            this.openPopup(eventData.popupEvent);

            if (eventData.data === undefined) {
                return;
            }

            this.popupData = eventData.data;
        });

        EventBus.$on(EventBusEvents.openMultipositionPopup, (eventData: PopupEventData) => {
            this.openPopup(eventData.popupEvent);

            if (eventData.data === undefined) {
                return;
            }

            this.popupData = eventData.data;
        });

        EventBus.$on(EventBusEvents.closePopup, () => {
            this.closePopup();
        });
    }

    private openPopup(popupEvent: string) {
        this.popupEvent = popupEvent;
        this.visible = true;
    }

    private closePopup() {
        this.visible = false;
        this.popupEvent = '';
        this.title = '';
    }

    private mounted() {
        this.eventBusListeners();
    }
}
</script>

<style lang="scss" scoped>
    .co-popup {

    }
</style>
