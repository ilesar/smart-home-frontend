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
            <a-input v-model="model.name" @blur="() => {$refs.name.onFieldBlur()}" />
        </a-form-model-item>
        <a-form-model-item label="Cijena" prop="price" ref="price">
            <a-input type="number" v-model="model.name" @blur="() => {$refs.name.onFieldBlur()}" />
        </a-form-model-item>
        <a-form-model-item label="Tip plaćanja" prop="type" ref="type">
            <a-select v-model="model.paymentTag" placeholder="please select your zone">
                <a-select-option value="shanghai">
                    Zone one
                </a-select-option>
                <a-select-option value="beijing">
                    Zone two
                </a-select-option>
            </a-select>
        </a-form-model-item>
        <a-form-model-item label="Učestalost" prop="period" ref="period">
            <a-input v-model="model.name" @blur="() => {$refs.name.onFieldBlur()}" />
        </a-form-model-item>
        <a-form-model-item label="Trenutak aktivacije" prop="activationTime" ref="activationTime">
            <a-date-picker
                    v-model="model.activationTimeDate"
                    show-time
                    type="date"
                    placeholder="Pick a date"
                    style="width: 100%;"
            />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ offset: 6 }">
            <a-button type="primary" @click="() => {}">
                Stvori plaćanje
            </a-button>
            <a-button style="margin-left: 10px;" @click="closeForm">
                Odustani
            </a-button>
        </a-form-model-item>
    </a-form-model>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch, Emit} from 'vue-property-decorator';
  import RecurringPayment from '@/api/models/RecurringPayment';

  @Component({
    name: 'RecurringPaymentForm',
  })
  export default class RecurringPaymentForm extends Vue {
    private _model: RecurringPayment;

    private rules = {};

    private labelCol = { span: 6 };
    private wrapperCol = { span: 18 };

    public get model() {
      if (this._model === undefined) {
        this._model = new RecurringPayment();
      }

      return this._model;
    }

    @Emit('on-cancel')
    public closeForm() {

    }
  }
</script>

<style lang="scss">

</style>
