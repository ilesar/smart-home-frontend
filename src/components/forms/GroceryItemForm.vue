<template>
    <a-form-model
            ref="ruleForm"
            :model="model"
            :rules="rules"
            layout="vertical"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
    >
        <a-form-model-item label="Naziv" prop="name" ref="name">
            <a-input v-model="model.name" @blur="() => {$refs.name.onFieldBlur()}" placeholder="unesi naziv namirnice"/>
        </a-form-model-item>
        <a-form-model-item label="Cijena" prop="price" ref="price">
            <a-input type="number" v-model="model.price" placeholder="unesi cijenu namirnice" addonAfter="KN"/>
        </a-form-model-item>
        <a-upload-dragger
                name="file"
                :multiple="true"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                :customRequest="onPhotoDrop"
                @change="handleChange"
        >
            <p class="ant-upload-drag-icon">
                <a-icon type="arrow-down" />
            </p>
            <p class="ant-upload-text">Uploadaj fotku</p>
            <p class="ant-upload-hint">
                Ili ju povuci ovdje ili klikni pa odaberi sa svojeg uređaja
            </p>
        </a-upload-dragger>
        <a-divider></a-divider>
        <a-form-model-item>
            <a-button type="primary" @click="submitButtonCallback(instance, model)">
                {{ submitButtonText }}
            </a-button>
            <a-button style="margin-left: 10px;" @click="$emit('on-cancel')">
                Odustani
            </a-button>
        </a-form-model-item>
    </a-form-model>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch, Emit} from 'vue-property-decorator';
import GroceryItem from '@/api/models/GroceryItem';
import Camera from '@/components/Camera.vue';

@Component({
  name: 'GroceryItemForm',
  components: {
    Camera,
  },
})
export default class GroceryItemForm extends Vue {
  @Prop()
  private submitButtonText!: string;
  @Prop()
  private submitButtonCallback!: (form: GroceryItemForm, model: GroceryItem) => void;
  @Prop()
  private model!: GroceryItem;

  private rules = {};

  private labelCol = { span: 6 };
  private wrapperCol = { span: 18 };

  // @Emit('on-cancel')
  // public closeForm() {
  //
  // }

  public get instance() {
    return this;
  }

  public handleChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      this.$message.success(`Fotka dodana`);
    } else if (status === 'error') {
      this.$message.error(`Nešto je pošlo po krivu.`);
    }
  }

  public onPhotoDrop(photo: File) {
    this.model.imageForUpload = photo;
  }
}
</script>

<style lang="scss" scoped>

</style>
