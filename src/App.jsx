import React, { useState, useEffect } from "react";
import "./styles.css";

function App() {
    const [drinksData, setDrinks] = useState([]);
    const [searchTerm, setsearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState({ status: false, msg: '' })

    const URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

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
       
        <form>
            <div className="nav">
            <center>  <input type="text" name="search" id="search" placeholder="search Drinks, Cocktails... " value={searchTerm} onChange={(e) => { setsearchTerm(e.target.value) }} /></center>
            <br></br>

</div>
           
            {/* <h1>Cocktails : {drinksData.length}</h1> */}
            
        
            
            {loading && !isError?.status && <h2> Loading....</h2>}
            {isError?.status && <h2 style={{ color: "red" }}>{isError.msg}</h2>}
            
            {!loading && !isError?.status &&
                <ul className="cocktail-info">
                  
                    {
                        drinksData.map((obj) => {
                            const { idDrink, strDrink, strDrinkThumb, strGlass, strAlcoholic } = obj
                            console.log(obj);
                            return <li key={idDrink}>
                                <div className="container">
                                    <div>
                                        <img src={strDrinkThumb} alt="img drink" className="cocktail-img" />
                                    </div>
                                    <div><h3>ID:{idDrink}</h3></div>
                                    <div><h3>{strDrink}</h3></div>
                                    <div><h3>{strGlass}</h3></div>

                                </div>
                            </li>
                        })
                    }
                </ul>}
                
        </form>
    </div>
   
};

export default App;