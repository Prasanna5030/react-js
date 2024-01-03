import React, { useState, useEffect } from "react";
import "./styles.css";
import Header from "./Header";

function App() {
    const [drinksData, setDrinks] = useState([]);
    const [showIngredients, setShowIngredients]=useState([]);
    const [showInstructions, setShowInstructions]=useState('');

    const [searchTerm, setsearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState({ status: false, msg: '' })

    const URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
    const handleClick=(id)=>{
        console.log(id);
       const drinkFound=  drinksData.find(({idDrink ,strIngredient1 , strIngredient2})=>{
            return idDrink===id;
        });
        if(drinkFound){
            const instructions=drinkFound.strInstructions;
        const ingredients= [drinkFound.strIngredient1, drinkFound.strIngredient2,drinkFound.strIngredient3];
        setShowIngredients(ingredients);
        setShowInstructions(instructions);
        alert("Instructions:"+showInstructions);

        alert("Ingredients:"+showIngredients);


    }
        else{
            console.log(`drink not found`);
        }
        
    }
    console.log(showIngredients);

    async function fetchDrinks(apiURL) {
        setLoading(true);
        setIsError({ status: false, msg: '' });
        try {
            const response = await fetch(apiURL);
            const { drinks } = await response.json();
            setDrinks(drinks);
            setLoading(false);
            setIsError({ status: false, msg: '' });
            if(!drinks) {
                throw new Error("drinks not found");
            }
        } catch (error) {

            setLoading(false);
            setIsError({ status: true, msg: error.message || 'something went wrong' });
        }
    }
    useEffect(() => {
        const searchURL = `${URL}${searchTerm}`
        fetchDrinks(searchURL);
    }, [searchTerm]);


    return <div>
       <Header />
        <form>
            <div className="nav">
            <center>  <input type="text" name="search" id="search" placeholder="Search Drinks, Cocktails here... " value={searchTerm} onChange={(e) => { setsearchTerm(e.target.value) }} /></center>
            <br></br>

</div>
           
            {/* <h1>Cocktails : {drinksData.length}</h1> */}
            
        
            
            {loading && !isError?.status && <h2> Loading....</h2>}
            {isError?.status && <h2 style={{ color: "red" }}>{isError.msg}</h2>}
            
            {!loading && !isError?.status &&
                <ul className="cocktail-info">
                  
                    {
                        drinksData.map((obj) => {
                            const { idDrink, strDrink, strDrinkThumb, strGlass, strAlcoholic,strIngredient1, strIngredient2 ,strIngredient3, strInstructions
                            } = obj
                            return <li key={idDrink}>
                                <div className="container" onClick={()=>handleClick(idDrink)}>
                                    <div>
                                        <img src={strDrinkThumb} alt="img drink" className="cocktail-img" />
                                    </div>
                                    <div><h5>ID:{idDrink}</h5></div>
                                    <div><h5>{strDrink}</h5></div>
                                    <div><h5>{strGlass}</h5></div>

                                </div>
                            </li>
                        })
                    }
                </ul>}
                
        </form>
    </div>
   
};

export default App;