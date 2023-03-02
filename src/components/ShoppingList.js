import { plantList } from "../data/plantList";
import PlantItem from "./PlantItem";
import "../styles/ShoppingList.css";
import { useEffect, useState } from "react";

function ShoppingList({ cart, updateCart }) {
    const categories = plantList.reduce(
        (acc, plant) =>
            acc.includes(plant.category) ? acc : acc.concat(plant.category),
        []
    );

    function addToCart(name, price) {
        const currentPlantAdded = cart.find((plant) => plant.name === name);

        if (currentPlantAdded) {
            const cartFilteredCurrentPlant = cart.filter(
                (plant) => plant.name !== name
            );
            updateCart([
                ...cartFilteredCurrentPlant,
                { name, price, amount: currentPlantAdded.amount + 1 },
            ]);
        } else {
            updateCart([...cart, { name, price, amount: 1 }]);
        }
    }

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch("https://swapi.dev/api/people/?format=json")
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.results);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, []);

    // return (
    //     <div className="lmj-shopping-list">
    //         <ul>
    //             {categories.map((cat) => (
    //                 <li key={cat}>{cat}</li>
    //             ))}
    //         </ul>
    //         <ul className="lmj-plant-list">
    //             {plantList.map(({ id, cover, name, water, light, price }) => (
    //                 <div key={id}>
    //                     <PlantItem
    //                         cover={cover}
    //                         name={name}
    //                         water={water}
    //                         light={light}
    //                     />
    //                     <button onClick={() => addToCart(name, price)}>
    //                         Ajouter
    //                     </button>
    //                 </div>
    //             ))}
    //         </ul>
    //     </div>
    // );

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item.name}</li>
                ))}
            </ul>
        );
    }
}

export default ShoppingList;
