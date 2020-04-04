export const ApiRoutes = {
    login: '/auth/login',
    refreshToken: '/auth/refresh-token',
    getGroceryItems: '/grocery/items/',
    getGroceryItemsWithImages: '/grocery/items/?include=image&sort=id',
    addGroceryToShoppingList: '/shopping/list/items/',
    deleteShoppingItem: '/shopping/list/items',
    getShoppingItems: '/shopping/list/items/?include=groceryItem,groceryItem.image&filter[isResolved]=0',
    getResolvedShoppingItems: '/shopping/list/items/?include=groceryItem,groceryItem.image&filter[isResolved]=1',
    patchShoppingItem: '/shopping/list/items',

    getRecurringPayments: '/recurring/payments/',

    getRooms: '/rooms/',
};
