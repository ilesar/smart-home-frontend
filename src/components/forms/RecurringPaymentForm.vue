<template>
    <div class="desktop-form">
        <a-form-model
                ref="ruleForm"
                :model="model"
                :rules="rules"
                layout="vertical"
                :label-col="labelCol"
                :wrapper-col="wrapperCol"

        >
            <a-form-model-item label="Naziv" prop="name" ref="name">
                <a-input v-model="model.name" @blur="() => {$refs.name.onFieldBlur()}"
                         placeholder="unesi naziv plaćanja"/>
            </a-form-model-item>
            <a-form-model-item label="Cijena" prop="price" ref="price">
                <a-input type="number" v-model="model.price" placeholder="unesi iznos plaćanja" addonAfter="KN"/>
            </a-form-model-item>
            <a-form-model-item label="Tip plaćanja" prop="paymentTag" ref="paymentTag">
                <a-select v-model="model.paymentTag" placeholder="odaberi tip plaćanja">
                    <a-select-option v-for="modelType in model.types" :value="modelType.value" :key="modelType.name">
                        {{ modelType.name }}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item label="Učestalost" prop="period" ref="period">
                <a-select v-model="model.period" placeholder="Odaberi učestalost plaćanja" defaultValue="adasd">
                    <a-select-option v-for="period in model.periods" :value="period.value" :key="period.name">
                        {{ period.name }}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item label="Trenutak aktivacije" prop="activationTimeDate" ref="activationTimeDate">
                <a-date-picker
                        v-model="model.activationTimeDate"
                        show-time
                        type="date"
                        placeholder="Odaberi datum kada je potrebno izvršiti plaćanje"
                        style="width: 100%;"
                />
            </a-form-model-item>
            <a-form-model-item label="Automatizirano">
                <a-switch v-model="model.isAutomated"/>
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
    import RecurringPayment from '@/api/models/RecurringPayment';
    import GroceryItem from '@/api/models/GroceryItem';

    @Component({
        name: 'RecurringPaymentForm',
    })
    export default class RecurringPaymentForm extends Vue {
        @Prop()
        private submitButtonText!: string;
        @Prop()
        private submitButtonCallback!: (form: RecurringPaymentForm, model: RecurringPayment) => void;
        @Prop()
        private model!: RecurringPayment;

        public onSubmit(model: RecurringPayment) {
            const form = this.$refs['ruleForm'];

            // @ts-ignore
            form.validate((valid: boolean) => {
                if (valid) {
                    this.submitButtonCallback(this, model);
                } else {
                    console.log('FORM ERROR');
                    return false;
                }
            });
        }

        public get rules() {
            return {
                name: [
                    {required: true, message: 'Upiši naziv proizvoda', trigger: ['change', 'blur']},
                    {min: 3, message: 'Napiši malo više od 3 slova', trigger: ['change', 'blur']},
                ],
                price: [
                    {required: true, message: 'Upiši cijenu', trigger: ['change', 'blur']},
                    {
                        validator: (rule, value, callback) => {
                            if (value < 3) {
                                callback(new Error());
                            } else {
                                callback();
                            }
                        }, message: 'A bar 4 kn', trigger: 'blur'
                    }
                ],
                paymentTag: [
                    {required: true, message: 'Odaberi tip plaćanja', trigger: 'change'},
                ],
                period: [
                    {required: true, message: 'Odaberi učestalost plaćanja', trigger: 'change'},
                ],
                activationTimeDate: [
                    {required: true, message: 'Odaberi trenutak aktivacije', trigger: 'change'},
                ],
            }
        }

    }
</script>

<style lang="scss" scoped>
    .desktop-form {
        /*text-align: center;*/
    }
</style>
