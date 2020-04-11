<template>
    <div class="mobile-form">
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
        <a-form-model-item prop="image" ref="image">
            <a-upload-dragger
                    v-if="!model.imageForUploadBase64"
                    name="file"
                    listType="picture"
                    :customRequest="onPhotoDrop"
                    @change="handleChange"
                    :fileList="[]"
            >
                <p class="ant-upload-drag-icon">
                    <a-icon type="arrow-down" />
                </p>
                <p class="ant-upload-text">Uploadaj fotku</p>
                <p class="ant-upload-hint">
                    Ili ju povuci ovdje ili klikni pa odaberi sa svojeg uređaja
                </p>
            </a-upload-dragger>
            <img :src="model.imageForUploadBase64" class="image-preview"/>
        </a-form-model-item>

        <a-divider></a-divider>
        <a-form-model-item>
            <a-button type="primary" @click="onSubmit(model)">
                {{ submitButtonText }}
            </a-button>
            <a-button style="margin-left: 10px;" @click="$emit('on-cancel')">
                Odustani
            </a-button>
        </a-form-model-item>
    </a-form-model>
    </div>
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

  // private labelCol = { span: 6 };
  // private wrapperCol = { span: 18 };

  public handleChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      // @ts-ignore
      this.$refs.ruleForm.validateField('image');
      this.$message.success(`Fotka dodana`);
    } else if (status === 'error') {
      this.$message.error(`Nešto je pošlo po krivu.`);
    }
  }

  public onPhotoDrop(photo: any) {
    this.model.imageForUpload = photo.file;


    const reader = new FileReader();
    reader.readAsDataURL(photo.file);
    reader.onload = () => {
      this.model.imageForUploadBase64 = reader.result as string;
      this.$forceUpdate();
    };
    reader.onerror = error => {
      console.error('IMAGE UPLOAD');
      console.error(error);
    }
  }

  public get rules() {
    return {
      name: [
        { required: true, message: 'Upiši naziv proizvoda', trigger: 'blur' },
        { min: 3, message: 'Napiši malo više od 3 slova', trigger: 'blur' },
      ],
      price: [
        { required: true, message: 'Upiši cijenu', trigger: 'blur' },
        { validator: (rule, value, callback) => {
            if (value < 3) {
              callback(new Error());
            } else {
              callback();
            }
          }, message: 'A bar 4 kn', trigger: 'blur' }
      ],
      image: [
        { validator: (rule, value, callback) => {
            if (!this.model.imageForUploadBase64) {
              callback(new Error());
            } else {
              callback();
            }
          }, message: 'Moraš uploadati sliku', trigger: 'blur' }
      ],
    }
  }

  public onSubmit(model: GroceryItem) {
    const form = this.$refs['ruleForm'];

    form.validate((valid: boolean) => {
      if (valid) {
        this.submitButtonCallback(this, model);
      } else {
        console.log('FORM ERROR');
        return false;
      }
    });
  }

}
</script>

<style lang="scss" scoped>
    .mobile-form {
        text-align: center;
    }

    .image-preview {
        width: 30vw;
    }
</style>
