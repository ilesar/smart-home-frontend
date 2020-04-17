export const ApiRoutes = {
    Login: '/auth/login',
    RefreshToken: '/auth/refresh-token',

    GroceryItem: '/grocery/items',
    GroceryItems: '/grocery/items/?include=image&sort=-updatedAt&filter[isDeleted]=0',

    ShoppingItem: '/shopping/list/items',
    ShoppingItems: '/shopping/list/items?include=groceryItem,groceryItem.image&filter[isResolved]=0',
    ResolvedShoppingItems: '/shopping/list/items?include=groceryItem,groceryItem.image&filter[isResolved]=1',
    addGroceryToShoppingList: '/shopping/list/items',

    RecurringPayment: '/recurring/payments',
    RecurringPayments: '/recurring/payments?filter[isDeleted]=0',

    Rooms: '/rooms?include=devices,devices.configuration,devices.configuration.items,devices.configuration.templates,devices.configuration.templates.items,devices.configuration.templates.items.configurationItem',

    Expense: '/expenses',
    Expenses: '/expenses?include=recurringPayment',
    ResolvedExpenses: '/expenses?include=recurringPayment&filter[isResolved]=1',

    Image: '/images',

};
