import {React, useState, useEffect} from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from "./components/Navbar/Navbar";
import {commerce} from './components/Commerce/Commerce';
import Products from "./components/Products/products";


const App = () => {

    // Init The useState Hook To Fetch The Data To My State
    const [products, setProducts] = useState([]);

    // Here We Fetch The Data From The commerce object that we get from the import to put it in the state
    const FetchData = async () => {
        const {data} = await commerce.products.list();

        setProducts(data);
    }

    // This Hook Is Just To Fetch The Data When The Component Rendering Just Like componentDidMount & The Dependencis is empty array just run on rendering the component Without updating
    useEffect(() => {
        FetchData();
    },[]);

    console.log(products);

    return (
        <>
            <Navbar />
            <Products products={products}/>
        </>
    )
};

export default App;