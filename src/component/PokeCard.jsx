import axios from "axios";
import React, { useEffect, useState } from "react";
import { LazyImage } from "./LazyImage";
import { Link } from "react-router-dom";

export default function PokeCard({ url, name }) {
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    fetchPokeDetailData(url);
  }, [url]);

  async function fetchPokeDetailData(url) {
    try {
      const response = await axios.get(url);
      const pokemonData = formatPokemonData(response.data);
      setPokemon(pokemonData);
    } catch (err) {
      console.error(err);
    }
  }

  function formatPokemonData(params) {
    const { id, types, name } = params;
    const PokeData = {
      id,
      name,
      type: types[0].type.name,
    };
    return PokeData;
  }

  const bg = `bg-${pokemon?.type}`;
  const border = `border-${pokemon?.type}`;
  const text = `text-${pokemon?.type}`;

  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`;
  return (
    <>
      {pokemon && (
        <Link
          aria-label='{name}'
          to={`/pokemon/${name}`}
          className={`box-border rounded-lg ${border} w-[8.5rem] z-0 bg-slate-800 justify-between items-center`}
        >
          <div className={`${text} basis h-[1.5rem] text-ws w-full pt-1 px-2 text-right rounded-t-lg`}>
            #{pokemon.id.toString().padStart(3, "00")}
          </div>

          <div className={`w-full f-6 flex items-center justify-center`}>
            <div className={`box-border relative flex w-full h-[5.5rem] basis justify-center items-center`}>
              <LazyImage url={img} alt={name} />
            </div>
          </div>
          <div
            className={`${bg} basis h-[1.5rem] w-full text-xs text-zinc-100
            font-medium flex items-center justify-center rounded-d-lg uppercase text-center`}
          >
            {pokemon.name}
          </div>
        </Link>
      )}
    </>
  );
}
