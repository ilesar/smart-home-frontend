<template>
    <div class="co-popup">
        <a-modal
                title="Delete"
                centered
                v-model="visible"
                @ok="() => visible = false"
        >
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
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
    private title: string = 'asds';
    private visible: boolean = false;
    private popupEvent: string = 'asdasdasd';

    private openPopup(popupEvent: string) {
        this.popupEvent = popupEvent;
        this.visible = true;
    }

    private closePopup() {
        this.visible = false;
        this.popupEvent = '';
        this.title = '';
    }

}
</script>

<style lang="scss" scoped>
    .co-popup {

    }
</style>
