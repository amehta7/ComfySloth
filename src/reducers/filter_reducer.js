import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((p) => p.price);

    maxPrice = Math.max(...maxPrice);
    //console.log(maxPrice);
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: {
        ...state.filters,
        max_price: maxPrice,
        price: maxPrice,
      },
    };
  }

  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
    };
  }

  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      grid_view: false,
    };
  }

  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload,
    };
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;

    let tempProducts = [...filtered_products];

    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === "price-highest") {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === "name-a") {
      tempProducts = tempProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    return {
      ...state,
      filtered_products: tempProducts,
    };
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return {
      ...state,
      filters: {
        ...state.filters,
        [name]: value,
      },
    };
  }

  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    const { text, category, company, color, price, shipping } = state.filters;

    let tempProducts = [...all_products];

    //text filter
    if (text) {
      tempProducts = tempProducts.filter((t) =>
        t.name.toLowerCase().startsWith(text.toLowerCase())
      );
    }

    //category filter
    if (category !== "all") {
      tempProducts = tempProducts.filter((t) => t.category === category);
    }

    //company filter
    if (company !== "all") {
      tempProducts = tempProducts.filter((t) => t.company === company);
    }

    //color filter
    if (color !== "all") {
      tempProducts = tempProducts.filter((t) =>
        t.colors.find((c) => c === color)
      );
      //tempProducts = tempProducts.filter((t) => t.colors.includes(color));
    }

    //price filter
    if (price) {
      tempProducts = tempProducts.filter((t) => t.price <= price);
    }

    //shipping filter
    if (shipping) {
      tempProducts = tempProducts.filter((t) => t.shipping === true);
    }

    return {
      ...state,
      filtered_products: tempProducts,
    };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        category: "all",
        company: "all",
        color: "all",
        // min_price: 0,
        // max_price: 0,
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
