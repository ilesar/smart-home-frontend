export const ApiRoutes = {
    login: '/auth/login',
    refreshToken: '/auth/refresh-token',
    getGroceryItems: '/grocery/items/?filter[isDeleted]=0',
    patchGroceryItem: '/grocery/items',
    getGroceryItemsWithImages: '/grocery/items/?include=image&sort=id&filter[isDeleted]=0',
    addGroceryToShoppingList: '/shopping/list/items/',
    deleteShoppingItem: '/shopping/list/items',
    getShoppingItems: '/shopping/list/items/?include=groceryItem,groceryItem.image&filter[isResolved]=0',
    getResolvedShoppingItems: '/shopping/list/items/?include=groceryItem,groceryItem.image&filter[isResolved]=1',
    patchShoppingItem: '/shopping/list/items',

    getRecurringPayments: '/recurring/payments/?filter[isDeleted]=0',
    deleteRecurringPayment: 'recurring/payments',

    getRooms: '/rooms/?include=devices',

    getExpenses: '/expenses/?include=recurringPayment',
    patchExpense: '/expenses',
    getResolvedExpenses: '/expenses/?include=recurringPayment&filter[isResolved]=1',


};
