import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";
//import CartItem from "../components/CartItem";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;

    const tempItem = state.cart.find((c) => c.id === id + color);

    if (tempItem) {
      const tempCart = state.cart.map((c) => {
        if (c.id === id + color) {
          let newAmt = c.amount + amount;

          //if quantity(amount) is more than stock
          if (newAmt > c.max) {
            newAmt = c.max;
          }

          // let newPrice = c.price + amount * product.price
          return { ...c, amount: newAmt };
        } else {
          return c;
        }
      });

      return {
        ...state,
        cart: tempCart,
      };
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color: color,
        amount: amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return {
        ...state,
        cart: [...state.cart, newItem],
      };
    }
  }

  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((c) => c.id !== action.payload);

    return {
      ...state,
      cart: tempCart,
    };
  }

  if (action.type === CLEAR_CART) {
    return {
      ...state,
      cart: [],
    };
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;

    const tempcart = state.cart.map((c) => {
      if (c.id === id) {
        if (value === "inc") {
          let newAmt = c.amount + 1;
          if (newAmt > c.max) {
            newAmt = c.max;
          }
          return { ...c, amount: newAmt };
        }

        if (value === "dec") {
          let newAmt = c.amount - 1;
          if (newAmt < 1) {
            newAmt = 1;
          }
          return { ...c, amount: newAmt };
        }
      }
      return c;
    });

    return {
      ...state,
      cart: tempcart,
    };
  }

  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem;

        total.total_items += amount;
        total.total_amount += price * amount;

        return total;
      },
      {
        total_items: 0,
        total_amount: 0,
      }
    );
    return {
      ...state,
      total_items: total_items,
      total_amount: total_amount,
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
