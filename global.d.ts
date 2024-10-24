interface ClothesInterface {
  id: number;
  name: string;
  price: number;
  description: string;
  size: string;
  highlight: boolean;
  photo: string;
  clothingBrand: {
    name: string;
  };
  ratings: Array<{
    id: number;
    score: number;
    user: {
      name: string;
    };
  }>;
  comments: Array<{
    id: number;
    content: string;
    user: {
      name: string;
    };
  }>;
}
