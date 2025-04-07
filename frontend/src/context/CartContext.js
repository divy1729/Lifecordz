import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems(prev => {
            const exists = prev.find(i => i.id === item.id);
            if (exists) {
                return prev.map(i => 
                    i.id === item.id 
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems(prev => prev.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId, quantity) => {
        setCartItems(prev => 
            prev.map(item => 
                item.id === itemId 
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{ 
            cartItems, 
            addToCart, 
            removeFromCart, 
            updateQuantity,
            cartCount 
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}; 