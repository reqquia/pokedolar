import { useState, useEffect } from "react";
import axios from "axios";

interface Pokemons {
  name: string;
  id: bigint;
}

interface Money {
  high: any;
  bid: any;
}

const App: React.FC = () => {

  const [pokemon, setPokemon] = useState<Pokemons>();
  const [usd, setUsd] = useState<Money>();

  useEffect(() => {
    axios
      .get("https://economia.awesomeapi.com.br/all/USD")
      .then((response) => {
        setUsd(response.data.USD);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [usd]);

  let high = Math.floor(usd?.bid * 100) / 100;
  let dolar = Math.floor(high * 100) / 100;
  let idpokemon = dolar * 100;
  let price = Number(usd?.bid);

  console.log(usd?.bid);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${idpokemon}`)
      .then((result) => {
        setPokemon(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [idpokemon]);

  return (
    <>
      <section className="p-4">
        <img
          className="pt-5 pb-5 w-60 mx-auto rounded-xl flex items-center"
          src="/logo.png"
          alt="logo"
        />
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div>
            <div className="p-8">
              <img
                className="w-60 mx-auto"
                src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon?.id}.png`}
                alt={pokemon?.name}
              />
              <h1 className="text-5xl pt-2 uppercase tracking-wide text-center font-bold text-blue-500">
                {pokemon?.name}
              </h1>
              <h1 className="text-4xl pt-2 pb-3 text-center uppercase tracking-wide font-bold">
                $1 = R$ { price.toLocaleString("pt-BR", {})}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-md mx-auto overflow-hidden">
        <div className="pb-4">
          <div className="px-5">
            <p className="text-center">
              ?? 2022. <b>PokeD??lar</b> <small>desenvolvido por R??qquia.</small>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default App