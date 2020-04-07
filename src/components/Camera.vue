<template>
    <span>
        <video autoplay width="100%" ref="video"></video>
        <a-button type="primary" @click="takePhoto">TAKE PHOTO</a-button>
        <h2>Captured Image</h2>
        <figure class="figure" style="width: 100%">
            <img :src="image" class="img-responsive" style="width: 100%"/>
        </figure>
    </span>

</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';

  @Component
  export default class Camera extends Vue {

    private cameraObject;
    private image: string = null;

    mounted() {
      console.log('MOUNTING CAMERA...');
      console.log(this.$el);

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
      let video = this.$refs.video;
      if (!this.ctx) {
        let canvas = document.createElement('canvas');
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
      }
      const {ctx, canvas} = this;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      return canvas;
    }
  }
</script>

<style lang="scss">

</style>
