<template>
    <div class="mobile-form">
        <div class="steps-wrapper">
            <a-steps  :current="currentStep" progressDot class="grocery-steps" >
                <a-step title="Fotkaj"/>
                <a-step title="Provjeri"/>
                <a-step title="Ispuni"/>
            </a-steps>
        </div>
        <div class="steps-content" v-if="currentStep === 2">
            <a-form-model
                    ref="ruleForm"
                    :model="model"
                    :rules="rules"
                    layout="vertical"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol"
                    style="padding: 24px"
            >
                <img :src="image" class="image-preview"/>
                <a-form-model-item label="Naziv" prop="name" ref="name">
                    <a-input v-model="model.name" @blur="() => {$refs.name.onFieldBlur()}" placeholder="unesi naziv namirnice"/>
                </a-form-model-item>
                <a-form-model-item label="Cijena" prop="price" ref="price">
                    <a-input type="number" v-model="model.price" placeholder="unesi cijenu namirnice" addonAfter="KN"/>
                </a-form-model-item>
                <a-divider></a-divider>
                <a-form-model-item :wrapper-col="{ }">
                    <a-button type="primary" @click="submitButtonCallback(instance, model)">
                        {{ submitButtonText }}
                    </a-button>
                    <a-button style="margin-left: 10px;" @click="onPhotoRetaken">
                        Ipak druga fotka
                    </a-button>
                </a-form-model-item>
            </a-form-model>
        </div>
        <Camera class="cam-view" @on-photo="onPhotoTaken" @on-retake-photo="onPhotoRetaken" @on-confirm-photo="onPhotoConfirm" v-if="currentStep !== 2"></Camera>
        <a-button type="danger" @click="$emit('on-cancel')" class="cancel-button">Odustani</a-button>
<!--        <div class="steps-action">-->
<!--            <a-button v-if="currentStep < steps.length - 1" type="primary" @click="next">-->
<!--                Next-->
<!--            </a-button>-->
<!--            <a-button-->
<!--                    v-if="currentStep == steps.length - 1"-->
<!--                    type="primary"-->
<!--                    @click="$message.success('Processing complete!')"-->
<!--            >-->
<!--                Done-->
<!--            </a-button>-->
<!--            <a-button v-if="currentStep>0" style="margin-left: 8px" @click="previous">-->
<!--                Previous-->
<!--            </a-button>-->
<!--        </div>-->
<!--        <Camera @on-photo="onPhotoTaken" @on-retake-photo="onPhotoRetaken" @on-confirm-photo="onPhotoConfirm" v-if="currentStep !== 2"></Camera>-->
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch, Emit} from 'vue-property-decorator';
import GroceryItem from '@/api/models/GroceryItem';
import Camera from '@/components/Camera.vue';

@Component({
  name: 'GroceryItemMobileForm',
  components: {
    Camera,
  },
})
export default class GroceryItemMobileForm extends Vue {
  @Prop()
  private submitButtonText!: string;
  @Prop()
  private submitButtonCallback!: (form: GroceryItemMobileForm, model: GroceryItem) => void;
  @Prop()
  private model!: GroceryItem;

  private image = null;
  private rules = {};
  private currentStep = 0;
  private labelCol = { span: 6 };
  private wrapperCol = { span: 18 };

  // @Emit('on-cancel')
  // public closeForm() {
  //
  // }

  public get instance() {
    return this;
  }

  public onPhotoTaken() {
    this.currentStep = 1;
  }

  public onPhotoRetaken() {
    this.currentStep = 0;
  }

  public onPhotoConfirm(image) {
    this.image = image;
    this.currentStep = 2;
  }


  public get steps() {
    return [
      {
        title: 'First',
      },
      {
        title: 'Second',
      },
      {
        title: 'Last',
      },
    ];
  }

  public next() {
    this.currentStep++;
  }

  public previous() {
    this.currentStep--;
  }
}
</script>

<style lang="scss" scoped>
    .mobile-form {
        text-align: center;
    }
    .steps-wrapper {
        text-align: left;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px 30px 20px 30px;
    }

    .grocery-steps {
        width: 100vw;
        zoom: 0.9;
    }

    .cam-view {
        margin-bottom: 16px;
    }

    .image-preview {
        width: 30vw;
    }
</style>
