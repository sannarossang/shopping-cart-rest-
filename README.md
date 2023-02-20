# shopping-cart-rest-

## ROUTES

### Products

## GET
- getAllProducts: http://localhost:4000/api/v1/products/
- getProductById: http://localhost:4000/api/v1/products/:productId

### ShoppingCart

## GET
- getAllShoppingCart: http://localhost:4000/api/v1/shoppingCarts/
- getAllShoppingCartsById: http://localhost:4000/api/v1/shoppingCarts/:shoppingCartId

## POST:
- createtNewShoppingCart: http://localhost:4000/api/v1/shoppingCarts

## PUT: 
- updateShoppingCartById: http://localhost:4000/api/v1/shoppingCarts/:shoppingCartId

Body: {
	"productId": "63eb5d5550272ab5cef5af1e",
	"quantity": "2"
}

## DELETE:
- deleteShoppingCartById: http://localhost:4000/api/v1/shoppingCarts
- deleteShoppingCartByCartItemId: http://localhost:4000/api/v1/shoppingCarts/:shoppingCartId/:productId


