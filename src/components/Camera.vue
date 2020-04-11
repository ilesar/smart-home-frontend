<template>
    <div class="video-wrapper">

        <a-row type="flex" class="camera-controls" v-if="this.image === null">
            <a-button type="primary" @click="takePhoto" :disabled="image !== null" class="camera-button">
                <a-icon type="camera"></a-icon>
            </a-button>
        </a-row>
        <a-row type="flex" class="camera-controls" v-if="this.image !== null">
            <a-button type="default" @click="retakePhoto" :disabled="image === null" class="camera-button" style="margin-right: 16px">
                <a-icon type="reload"></a-icon>
            </a-button>
            <a-button type="primary" @click="confirmPhoto" :disabled="image === null" class="camera-button">
                <a-icon type="check"></a-icon>
            </a-button>
        </a-row>
        <figure class="figure" style="margin: 0; position: absolute">
            <img :src="image" class="photo-element"/>
        </figure>
        <video autoplay width="100%" ref="video"></video>

    </div>

</template>

<script lang="ts">
import {Vue, Component, Prop, Watch, Emit} from 'vue-property-decorator';
import {off} from 'element-ui/src/utils/dom';

@Component({
  name: 'Camera',
})
export default class Camera extends Vue {

  private cameraObject;
  private image: string = null;
  private context = null;
  private canvas = null;

  public mounted() {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const device = this.extractDevice(devices);
      const constraints = this.createConstraints(device);

      this.startStream(constraints);

    }).catch((err) => {
      console.log(err.name + ': ' + err.message);
    });
  }

  @Emit('on-photo')
  public takePhoto() {
    this.image = this.getCanvas().toDataURL('image/jpeg');
  }

  @Emit('on-retake-photo')
  public retakePhoto() {
    this.image = null;
  }

  @Emit('on-confirm-photo')
  public confirmPhoto() {
    return this.image;
  }

  public getCanvas() {
    const video = this.$refs.video as HTMLVideoElement;
    this.createCanvasFromVideo(video);

    const {context, canvas} = this;
    const offset = Math.round((window.innerWidth) * 0.3);
    context.drawImage(video, 0, offset, canvas.width, canvas.width,0, 0, canvas.width, canvas.width);

    return canvas;
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
      return v.kind === 'videoinput';
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
        height: {ideal: window.innerHeight},
      },
    };
  }

  private startStream(constraints) {
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      try {
        // @ts-ignore
        this.$refs.video.srcObject = stream;
      } catch (error) {
        // @ts-ignore
        this.$refs.video.srcObject = URL.createObjectURL(stream);
      }
      console.log('DONE');
    }).catch((err) => {
      console.log(err.name + ': ' + err.message);
    });
  }

  private createCanvasFromVideo(video: HTMLVideoElement) {
    let canvas;

    if (!this.context) {
      canvas = document.createElement('canvas');

      canvas.height = video.videoWidth;
      canvas.width = video.videoWidth;

      this.canvas = canvas;
      this.context = this.canvas.getContext('2d');
    }

    return canvas;
  }
}
</script>

<style lang="scss" scoped>

    .video-wrapper {
        width: 100%;
        /*clip-path: circle(60px at center);*/
        height: 100vw;
        position: relative;
        overflow: hidden;

        video {
            margin-top: -30vw;
        }
    }

    .photo-element {
        //margin-top: -50%;
    }

    .camera-controls {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 24px;
        width: 100%;
        z-index: 999;

        /*.camera-button {*/
        /*    width: 20vw;*/
        /*    height: 20vw;*/
        /*}*/

    }
</style>
