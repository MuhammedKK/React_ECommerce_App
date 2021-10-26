import {React, useState, useEffect} from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from "./components/Navbar/Navbar";
import {commerce} from './components/Commerce/Commerce';
import Products from "./components/Products/products";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/CheckoutForm/Checkout/Checkout";


const App = () => {

    // Init The useState Hook To Fetch The Product's Data To My State
    const [products, setProducts] = useState([]);
    // Init The useState Hook To Fetch The Cart's Data To My State
    const [cart, setCart] = useState({}); 
    // Hook Of Order
    const [order, setOrder] = useState({})
    // Hook Of Errors
    const [error, setError] = useState('');

    // Here We Fetch The Data From The commerce object that we get from the import to put it in the state
    const FetchData = async () => {
        const {data} = await commerce.products.list();

        setProducts(data);
    }

    // Fetch The Items In Cart
    const FetchCartItem = async () => {
        setCart(await commerce.cart.retrieve());
    }

    const addItemToCart = async (proId, quantity) => {
        const item = await commerce.cart.add(proId, quantity);

        setCart(item.cart);
    }

    // Handle Update in cart
    const updateItemInCart = async (proId, quantity) => {
        const item = await commerce.cart.update(proId, {quantity});

        setCart(item.cart);
    }

    const removeItemInCart = async (proId) => {
        const item = await commerce.cart.remove(proId);

        setCart(item.cart);
    }

    const removeAllInCart = async () => {
        const items = await commerce.cart.empty();

        setCart(items.cart);
    }

    // Refersh Cart After Creating Order
    const refershcCart = async () => {
        const newCart = await commerce.cart.refresh();

        setCart(newCart);
    }

    // Handle Capture 

    const handleCapture = async (tokenId, newOrder) => {
        try {
            const comingOrder = await commerce.checkout.capture(tokenId, newOrder);

            setOrder(comingOrder);
            refershcCart();   
        } catch (error) {
            setError(error.data.error.message)
        }
    }

    // This Hook Is Just To Fetch The Data When The Component Rendering Just Like componentDidMount & The Dependencis is empty array just run on rendering the component Without updating
    useEffect(() => {
        FetchData();
        FetchCartItem();
    }, []);

    return (
        <Router>
            <Navbar totalItems={cart.total_items}/>
            <Switch>
                <Route exact path="/">
                    <Products products={products} onAddToCart={addItemToCart} />
                </Route>
                <Route exact path="/cart">
                    <Cart 
                        Cart={cart}
                        onUpdate={updateItemInCart}
                        onDelete={removeItemInCart}
                        onDeleteAll={removeAllInCart}
                    />
                </Route>
                <Route exact path="/checkout">
                    <Checkout cart={cart} handleCapture={handleCapture} order={order} error={error} refershcCart={refershcCart}/>
                </Route>
            </Switch>
        </Router>
    )
};

export default App;