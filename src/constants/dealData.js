import { productsData } from "./productsData";

// Extract explicit IDs dynamically from productsData for Deal of the Day
const dealIds = [1, 5, 10, 15, 23, 28, 34, 38, 41, 43];

export const dealData = productsData.filter(product => dealIds.includes(product.id));
