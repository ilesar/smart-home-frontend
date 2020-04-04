import { Model, BelongsTo } from '@vuex-orm/core';
import { keys } from 'lodash';
import GroceryItem from '@/api/models/GroceryItem';

export default class ShoppingItem extends Model {
  public static entity = 'shoppingitem';

  public static primaryKey = 'id';

  public groceryItem;
  public id;
  public quantity;
  public createdAt;

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
      quantity: this.string('quantity'),
      isResolved: this.boolean(false),
      createdAt: this.string(false),
      updatedAt: this.string(false),
      groceryItem_id: this.attr(null),
      groceryItem: this.belongsTo(GroceryItem, 'groceryItem_id'),
    };
  }
}
