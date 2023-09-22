import React, { useState } from "react";
import './PokemonRandomizer.css';
import getPokemonImg from '../../assets/WhichPokemon.jpg'

export default function PokemonButton() {
    const [pokemon, setPokemon] = useState();

    const getPokemon = () => {
      const randID = randomIntFromInterval(0,151);
      return fetch("https://pokeapi.co/api/v2/pokemon/"+ randID +"/").then(
        (response) => response.json())
        .then((data) => {
          setPokemon(data);
        });
    };

    function randomIntFromInterval(min, max) { 
      return Math.floor(Math.random() * (max - min + 1) + min)
    }

    return (
      <div className="container">
        <img src={pokemon ? pokemon.sprites.front_default : getPokemonImg} alt="" width="150" height="150" />
        {pokemon ? pokemon['name'] : "Random Pokemon"}
        <button onClick={getPokemon}>Catch Pokemon</button>
      </div>
    );
  }
  