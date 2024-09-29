export interface ImageSet {
    mobile: string;
    tablet: string;
    desktop: string;
  }
  
  export interface Includes {
    quantity: number;
    item: string;
  }
  
  export interface Gallery {
    first: ImageSet;
    second: ImageSet;
    third: ImageSet;
  }
  
  export interface OtherProduct {
    slug: string;
    name: string;
    image: ImageSet;
  }
  
  export interface Product {
    id: number;
    slug: string;
    name: string;
    image: ImageSet;
    category: string;
    categoryImage: ImageSet;
    new: boolean;
    price: number;
    description: string;
    features: string;
    includes: Includes[];
    gallery: Gallery;
    others: OtherProduct[];
  }
  
  export type ProductData = Product[];
  