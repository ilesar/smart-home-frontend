import ShoppingItem from '@/api/models/ShoppingItem';

export default class ShoppingItemRepository {
    public static getAll(): ShoppingItem[] {
        return ShoppingItem
          .query()
          .with('groceryItem.image')
          .all();
    }
    public static getResolved(): ShoppingItem[] {
        return ShoppingItem
          .query()
          .with('groceryItem.image')
          .where('isResolved', true)
          .all();
    }
    public static getUnresolved(): ShoppingItem[] {
        return ShoppingItem
          .query()
          .with('groceryItem.image')
          .where('isResolved', false)
          .all();
    }
    public static getUnresolvedPriceSum(): number {
        return ShoppingItem
          .query()
          .with('groceryItem.image')
          .where('isResolved', false)
          .all()
          .reduce((aggregator: number, shoppingItem: ShoppingItem) => {
              return aggregator + parseFloat(shoppingItem.quantity) * shoppingItem.groceryItem.price;
          }, 0);
    }
}
