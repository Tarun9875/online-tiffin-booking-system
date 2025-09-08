import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../../store/slices/cartSlice";
import { placeOrder } from "../../api/customerApi";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user.user);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = async () => {
    if (!user) {
      alert("Please login to place an order!");
      navigate("/customer/login");
      return;
    }

    try {
      const orderData = {
        userId: user._id,
        items: cartItems,
        totalAmount,
      };

      await placeOrder(orderData);
      alert("Order placed successfully!");
      dispatch(clearCart());
      navigate("/customer/orders");
    } catch (error) {
      console.error(error);
      alert("Failed to place order. Try again.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. Go to <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/customer/menu")}>Tiffin Menu</span></p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-4 border rounded-lg shadow"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>₹{item.price} x {item.qty}</p>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 p-4 border rounded-lg shadow">
            <h3 className="font-semibold">Total: ₹{totalAmount}</h3>
            <button
              onClick={handleCheckout}
              className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
