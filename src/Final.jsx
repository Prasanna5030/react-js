import React , {useState , useEffect} from "react";

function Final(){
//     const [drinks , setDrinks]= useState([]);
//     const URL= "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=l";

//    async function fetchDrinks(apiURL){
//         const response=await fetch(apiURL);
//         const data= await response.json();
//         console.log(data)
//     }

    return (<div>
        <h1>Drinks</h1>
        </div>);
}

export default Final;




<ul className="cocktail-info">
{  
drinks.map((obj)=>{
        const {idDrink , strDrink ,strDrinkThumb }=obj
        return <li key={idDrink}>
            <div>
                <img src={strDrinkThumb} alt="img drink" className="cocktail-img"/>
            </div>
            <div><h3>{strDrink}</h3></div>
        </li>
    })
}
</ul>