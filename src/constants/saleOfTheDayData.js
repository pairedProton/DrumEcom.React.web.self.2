import { productImages } from "../assets/images";

const {
  leaves,
  ashwa,
  triphla,
  faceWash,
  roseToner,
  greenTea2,
  tulsigreentea: tulsiGreentea,
  teaHibiscus,
} = productImages;

export const saleOfTheDayData = [
  {
    id: 9,
    name: "Chamomile Relaxation Tea",
    image: leaves,
    price: 529,
    sale_price: 449,
  },
  {
    id: 10,
    name: "Ashwagandha Powder",
    image: ashwa,
    price: 999,
    sale_price: 799,
  },
  {
    id: 11,
    name: "Triphala Powder",
    image: triphla,
    price: 699,
    sale_price: 599,
  },
  {
    id: 15,
    name: "Turmeric Face Wash",
    image: faceWash,
    price: 599,
    sale_price: 499,
  },
  {
    id: 16,
    name: "Rose Toner",
    image: roseToner,
    price: 499,
    sale_price: 399,
  },
  {
    id: 1,
    name: "Detox Green Tea",
    image: greenTea2,
    price: 599,
    sale_price: 499,
  },
  {
    id: 2,
    name: "Tulsi Green Tea",
    image: tulsiGreentea,
    price: 549,
    sale_price: 449,
  },
  {
    id: 3,
    name: "Hibiscus Tea",
    image: teaHibiscus,
    price: 499,
    sale_price: 399,
  }
];