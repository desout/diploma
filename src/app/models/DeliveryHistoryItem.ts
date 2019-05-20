export interface DeliveryHistoryItem {
  id: number;
  count: number;
  cost: number;
  date: string;
  Providers_idProvider: number;
  Ingredients_idIngredient: number;
  ingredientName?: string;
  providerName?: string;
}
