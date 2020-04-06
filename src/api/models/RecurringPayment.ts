import {Model, BelongsTo} from '@vuex-orm/core';
import {keys} from 'lodash';
import {ApiRoutes} from '@/enums/ApiRoutes';
import {RecurringPaymentType} from '@/enums/RecurringPaymentType';
import {RecurringPaymentPeriod} from '@/enums/RecurringPaymentPeriod';

export default class RecurringPayment extends Model {
  public static entity = 'recurringpayment';

  public static primaryKey = 'id';

  public static apiConfig = {
    actions: {
      fetch: {
        method: 'get',
        url: ApiRoutes.RefreshToken,
      },
    },
  };

  public static fieldsKeys() {
    return keys(this.fields());
  }

  public static relationFields() {
    /**
     * fields that has relations
     * return {Array} fields which value are BelongsTo
     */
    return keys(this.fields()).reduce((list, field) => {
      if (this.fields()[field] instanceof BelongsTo) {
        list.push(`${field}id`);
        list.push(field);
      }
      return list;
    }, []);
  }

  public static fields() {
    return {
      id: this.string(null),
      name: this.string(undefined),
      price: this.number(undefined),
      period: this.string(undefined),
      activationTime: this.string(undefined),
      paymentTag: this.string(undefined),
      isAutomated: this.boolean(false),
      createdAt: this.string(undefined),
      updatedAt: this.string(undefined),
    };
  }

  public get types() {
    return [
      {
        name: 'Auto',
        value: RecurringPaymentType.Car,
      },
      {
        name: 'Kuća',
        value: RecurringPaymentType.HouseHold,
      },
      {
        name: 'Zdravlje',
        value: RecurringPaymentType.Health,
      },
      {
        name: 'Banka',
        value: RecurringPaymentType.Bank,
      },
    ];
  }

  public get periods() {
    return [
      {
        name: 'Jednom mjesečno',
        value: RecurringPaymentPeriod.Month,
      },
      {
        name: 'Jednom godišnje',
        value: RecurringPaymentPeriod.Year,
      },
    ];
  }

  public id;
  public price;
  public activationTimeDate;
  public activationTime;
  public name;
  public period;
  public paymentTag;
  public isAutomated;

}
