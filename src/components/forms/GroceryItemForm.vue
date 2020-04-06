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
        <a-divider></a-divider>
        <a-form-model-item :wrapper-col="{ offset: 6 }">
            <a-button type="primary" @click="submitButtonCallback(instance, model)">
                {{ submitButtonText }}
            </a-button>
            <a-button style="margin-left: 10px;" @click="closeForm">
                Odustani
            </a-button>
        </a-form-model-item>
    </a-form-model>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch, Emit} from 'vue-property-decorator';
  import GroceryItem from '@/api/models/GroceryItem';
  import RecurringPayment from '@/api/models/RecurringPayment';

  @Component({
    name: 'GroceryItemForm',
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

    @Emit('on-cancel')
    public closeForm() {

    }

    public get instance() {
      return this;
    }
  }
</script>

<style lang="scss">

</style>
