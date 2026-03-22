/**
 * Centralized Franchise Data
 * This is the source of truth for all franchise listings in the application.
 */

export const franchiseData = [
  {
    id: "1",
    name: "Cafe Aroma",
    brand: "Cafe Aroma",
    category: "Food",
    investment: 30,
    land: 400,
    city: "Delhi",
    cities: ["Delhi", "Gurgaon"],
    lat: 28.6139,
    lng: 77.2090,
    description: "Cafe Aroma is a premium café chain focused on high-quality beverages and snacks. We provide the best blend of Arabica and Robusta beans sourced directly from estates.",
    roi: 25,
    breakeven: 18,
    royaltyFee: 5,
    established: 2015,
    totalOutlets: 120,
    term: 5
  },
  {
    id: "2",
    name: "Burger Hub",
    brand: "Burger Hub",
    category: "Food",
    investment: 45,
    land: 600,
    city: "Mumbai",
    cities: ["Mumbai", "Pune"],
    lat: 19.0760,
    lng: 72.8777,
    description: "Burger Hub is a fast-growing QSR brand with a strong youth presence, known for its flame-grilled burgers and unique spice blends.",
    roi: 30,
    breakeven: 14,
    royaltyFee: 6,
    established: 2018,
    totalOutlets: 85,
    term: 7
  },
  {
    id: "3",
    name: "Urban Wear",
    brand: "Urban Wear",
    category: "Clothing",
    investment: 25,
    land: 300,
    city: "Bangalore",
    cities: ["Bangalore", "Hyderabad"],
    lat: 12.9716,
    lng: 77.5946,
    description: "Urban Wear is a modern clothing brand targeting urban millennials with sustainable and stylish everyday fashion.",
    roi: 22,
    breakeven: 24,
    royaltyFee: 4,
    established: 2019,
    totalOutlets: 40,
    term: 5
  },
  {
    id: "4",
    name: "FitZone Gym",
    brand: "FitZone Gym",
    category: "Fitness",
    investment: 50,
    land: 900,
    city: "Pune",
    cities: ["Pune", "Mumbai"],
    lat: 18.5204,
    lng: 73.8567,
    description: "FitZone Gym offers state-of-the-art fitness equipment and personal training services with a focus on holistic wellness and community.",
    roi: 35,
    breakeven: 12,
    royaltyFee: 8,
    established: 2020,
    totalOutlets: 25,
    term: 10
  }
];

export const getFranchiseById = (id) => {
  return franchiseData.find((f) => f.id === String(id));
};

export const categories = ["All", "Food", "Clothing", "Fitness"];
