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
            <a-input v-model="model.name" @blur="() => {$refs.name.onFieldBlur()}" placeholder="unesi naziv plaćanja"/>
        </a-form-model-item>
        <a-form-model-item label="Cijena" prop="price" ref="price">
            <a-input type="number" v-model="model.price" placeholder="unesi iznos plaćanja" addonAfter="KN" />
        </a-form-model-item>
        <a-form-model-item label="Tip plaćanja" prop="type" ref="type">
            <a-select v-model="model.paymentTag" placeholder="odaberi tip plaćanja">
                <a-select-option v-for="type in model.types" :value="type.value" :key="model.id">
                    {{ type.name }}
                </a-select-option>
            </a-select>
        </a-form-model-item>
        <a-form-model-item label="Učestalost" prop="period" ref="period">
            <a-select v-model="model.period" placeholder="Odaberi učestalost plaćanja" defaultValue="adasd">
                <a-select-option v-for="period in model.periods" :value="period.value" :key="model.id">
                    {{ period.name }}
                </a-select-option>
            </a-select>
        </a-form-model-item>
        <a-form-model-item label="Trenutak aktivacije" prop="activationTime" ref="activationTime">
            <a-date-picker
                    v-model="model.activationTimeDate"
                    show-time
                    type="date"
                    placeholder="Odaberi datum kada je potrebno izvršiti plaćanje"
                    style="width: 100%;"
            />
        </a-form-model-item>
        <a-form-model-item label="Automatizirano">
            <a-switch v-model="model.isAutomated" />
        </a-form-model-item>
        <a-divider></a-divider>
        <a-form-model-item :wrapper-col="{ offset: 6 }">
            <a-button type="primary" @click="submitButtonCallback(model)">
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
  import RecurringPayment from '@/api/models/RecurringPayment';
  import GroceryItem from '@/api/models/GroceryItem';

  @Component({
    name: 'RecurringPaymentForm',
  })
  export default class RecurringPaymentForm extends Vue {
    @Prop()
    private submitButtonText!: string;
    @Prop()
    private submitButtonCallback!: (model: GroceryItem) => void;
    @Prop()
    private model!: RecurringPayment;

    private rules = {};

    private labelCol = { span: 6 };
    private wrapperCol = { span: 18 };

    // @Emit('on-cancel')
    // public closeForm() {
    //     console.log
    // }
  }
</script>

<style lang="scss" scoped>

</style>
