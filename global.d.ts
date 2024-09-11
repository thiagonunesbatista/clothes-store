export interface ClothesInterface {
  id: number;
  name: string;
  price: number;
  highlight: boolean;
  photo: string;
  clothingBrandId: number;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  clothingBrand: {
    id: number;
    name: string;
  };
}
