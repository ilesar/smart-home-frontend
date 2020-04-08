<template>
    <div style="float:left; width: 100%; margin-bottom: 24px;">
        <figure class="figure" style="position: absolute;">
            <img :src="image" class="img-responsive" style="width: calc(100% - 24px); z-index: 999"/>
        </figure>
        <div class="video-wrapper">
            <video autoplay width="100%" ref="video" style="margin-bottom: 16px"></video>
        </div>
        <a-row type="flex" style="align-items: center;justify-content: center;" :gutter="16" class="gutter-row">
            <a-button type="primary" @click="takePhoto" :disabled="image !== null" class="gutter-box"><a-icon type="camera"></a-icon></a-button>
            <a-button type="default" @click="() => { this.image = null}" :disabled="image === null" class="gutter-box"><a-icon type="reload"></a-icon></a-button>
        </a-row>

    </div>

</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';

  @Component({
    name: 'Camera',
  })
  export default class Camera extends Vue {

    private cameraObject;
    private image: string = null;
    private context = null;
    private canvas = null;

    mounted() {
      console.log('MOUNTING CAMERA...');
      console.log(this.$el);
      console.log('MEDIA');
      console.log(navigator);
      navigator.mediaDevices.enumerateDevices().then(devices => {
        const device = this.extractDevice(devices);
        const constraints = this.createConstraints(device);

        this.startStream(constraints);

      }).catch(err => {
        console.log(err.name + ': ' + err.message);
      });
    }

    private extractDevice(devices: MediaDeviceInfo[]) {
      devices = this.filterBackCamera(devices);
      let device = null;

      if (devices.length === 0) {
        console.error('No devices!');
        return;
      }

      device = devices[devices.length - 1];

      return device;
    }

    private filterBackCamera(devices: MediaDeviceInfo[]) {
      devices = devices.filter((v) => {
        return v.kind == 'videoinput';
      });

      console.log('Found ' + devices.length + ' video devices');

      // devices = devices.filter(v => (v.label.indexOf('back') > 0));
      //
      // console.log('Found ' + devices.length + ' back cameras');

      return devices;
    }

    private createConstraints(device: MediaDeviceInfo) {
      return {
        audio: false,
        video: {
          deviceId: {ideal: device.deviceId},
          width: {ideal: window.innerWidth},
          height: {ideal: window.innerHeight}
        }
      };
    }

    private startStream(constraints) {
      navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        try {
          this.$refs.video.srcObject = stream;
        } catch (error) {
          this.$refs.video.srcObject = URL.createObjectURL(stream);
        }
        console.log('DONE');
      }).catch(err => {
        console.log(err.name + ': ' + err.message);
      });
    }

    public takePhoto() {
      this.image = this.getCanvas().toDataURL('image/jpeg');
    }

    getCanvas() {
      let video = this.$refs.video as HTMLVideoElement;
      this.createCanvasFromVideo(video);

      const {context, canvas} = this;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      return canvas;
    }

    private createCanvasFromVideo(video: HTMLVideoElement) {
      let canvas;

      if (!this.context) {
        canvas = document.createElement('canvas');

        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;

        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
      }

      return canvas;
    }
  }
</script>

<style lang="scss" >
    .gutter-example >>> .ant-row > div {
        background: transparent;
        border: 0;
    }
    .gutter-box {
        /*background: #00a0e9;*/
        margin: 0 5px;
    }

    .video-wrapper {
        width: 100%;
        /*clip-path: circle(60px at center);*/
        height: calc(100vw - 48px);
        overflow: hidden;
    }
</style>
