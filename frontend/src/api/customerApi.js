// Mock Tiffin Menu API
export const getTiffinMenu = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: [
                    { 
                        _id: "1",
                        name: "Paneer Butter Masala",
                        description: "Delicious paneer curry with roti and rice.",
                        price: 120,
                        image: "/assets/images/burger.jpg"
                    },
                    {
                        _id: "2",
                        name: "Vegetable Biryani",
                        description: "Spicy and aromatic vegetable biryani.",
                        price: 150,
                        image: "/assets/images/2.jpg"
                    },
                    {
                        _id: "3",
                        name: "Chicken Curry Meal",
                        description: "Chicken curry with rice and salad.",
                        price: 180,
                        image: "/assets/images/3.jpg"
                    },
                    {
                        _id: "4",
                        name: "Mixed Veg Curry",
                        description: "Healthy and tasty mixed vegetable curry.",
                        price: 130,
                        image: "/assets/images/4.jpg"
                    },
                    {
                        _id: "5",
                        name: "Dal Tadka",
                        description: "Protein-rich dal with steamed rice and roti.",
                        price: 110,
                        image: "/assets/images/5.jpg"
                    },
                    {
                        _id: "6",
                        name: "Masala Dosa Set",
                        description: "Crispy dosa with chutney and sambar.",
                        price: 90,
                        image: "/assets/images/8.jpg"
                    },
                    {
                        _id: "7",
                        name: "Egg Curry Meal",
                        description: "Spicy egg curry with rice and salad.",
                        price: 140,
                        image: "/assets/images/7.jpg"
                    },
                    {
                        _id: "8",
                        name: "Egg Curry Meal",
                        description: "Spicy egg curry with rice and salad.",
                        price: 140,
                        image: "/assets/images/9.jpg"
                    },
                    {
                        _id: "9",
                        name: "Egg Curry Meal",
                        description: "Spicy egg curry with rice and salad.",
                        price: 140,
                        image: "/assets/images/menu-burger.jpg"
                    }
                ]
            });
        }, 1000);
    });
};

// Mock orders database
let ordersDb = [];

// Get orders by customer
export const getOrders = async (customerId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const userOrders = ordersDb.filter(order => order.customerId === customerId);
            resolve({ data: userOrders });
        }, 500);
    });
};

// Place a new order
export const placeOrder = async (orderData) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Assign an ID and save to orders DB
            const newOrder = { ...orderData, id: ordersDb.length + 1, customerId: orderData.customerId || 1 };
            ordersDb.push(newOrder);
            console.log("Order placed:", newOrder);
            resolve({ success: true, message: "Order placed successfully!" });
        }, 500);
    });
};
