import React from 'react';
import { useEffect, useState } from 'react';
import ConsoleItem from './ConsoleComponents/ConsoleItem';
import GameItem from './GameComponents/GamesItem';
import ShirtItem from './ShirtComponents/ShirtItem';

export default function ItemListContainer(props) {

   let [consoleList, setConsoleList] = useState([]);
   let [gamesList, setGamesList] = useState([]);
   let [tShirtList, setTShirtList] = useState([]);

    useEffect(() => {

        // getting all Consoles
        fetch("http://localhost:8080/consoles")
          .then(response => response.json())
        //   .then(result => console.log(result))
          .then(response => setConsoleList(response))
        .catch(console.log(consoleList));


        // getting all T-Shirts
        fetch("http://localhost:8080/shirts")
          .then(response => response.json())
        //   .then(result => console.log(result))
          .then(response => setTShirtList(response))
        .catch(console.log(consoleList));


            // getting all games        
        fetch("http://localhost:8080/games")
          .then(response => response.json())
        //   .then(result => console.log(result))
          .then(response => setGamesList(response))
        .catch(console.log(consoleList));



    }, []);

 

    if(consoleList && gamesList && tShirtList)
    return (
            <>
                    <ul>
                        {
                       consoleList.map(console => <ConsoleItem key = {console.id}  props= {console}/>)
                        }
                    </ul>

                    <ul>
                        {
                       gamesList.map(game => <GameItem key = {game.id}  props= {game}/>)
                        }
                    </ul>

                    <ul>
                        {
                       tShirtList.map(shirt => <ShirtItem key = {shirt.id}  props= {shirt}/>)
                        }
                    </ul>
                           
            </>
         )
}