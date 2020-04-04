import Token from '@/api/models/Token';
import ShoppingItem from '@/api/models/ShoppingItem';
import GroceryItem from '@/api/models/GroceryItem';

export default class GroceryItemRepository {
    public static getAll(): GroceryItem[] {
        return GroceryItem
          .query()
          .with('image')
          .limit(30)
          .all();
    }
}
