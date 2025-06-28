// types/food.ts
export interface Food {
  id: number;
  name: string;
  image?: string;
  nutrition?: {
    nutrients: Array<{
      name: string;
      amount: number;
      unit: string;
    }>;
  };
}
