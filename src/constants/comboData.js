import { productsData } from "./productsData";

// Extract explicit IDs dynamically from productsData for Combo Offers
const comboIds = [2, 6, 11, 16, 24, 29, 35, 39, 42, 3];

export const comboData = productsData.filter(product => comboIds.includes(product.id));
