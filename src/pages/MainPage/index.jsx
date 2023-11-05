import { useEffect, useState } from "react";
import axios from "axios";
import PokeCard from "../../component/PokeCard";
import { AutoComplete } from "../../component/AutoComplete";

function MainPage() {
  // 모든 포켓몬 데이터를 가지고 있는 state
  const [allpokemons, setAllpokemons] = useState([]);
  // 실제로 리스트로 보여주는 포켓몬 데이터를 가지고 있는 state
  const [displayedPokemons, setDisplayedPokemons] = useState([]);

  // 한번에 보여주는 포켓몬수
  const limitNum = 20;
  const url = "https://pokeapi.co/api/v2/pokemon/?limit=1008&offset=0";

  // const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    fetchPokeData();
  }, []);

  function filterDisplayedPokemonData(allpokemonsData, displayedPokemons = []) {
    const limit = displayedPokemons.length + limitNum;
    //모든 포켓몬 데이터에서 limitNum만큼 더 가져오기
    const array = allpokemonsData.filter((pokemon, index) => index + 1 <= limit);
    return array;
  }

  const fetchPokeData = async () => {
    try {
      const response = await axios.get(url);
      setAllpokemons(response.data.results);
      setDisplayedPokemons(filterDisplayedPokemonData(response.data.results));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <article>
        <header className='flex flex-col gap-2 w-full px-4 z-50'>
          <AutoComplete allpokemons={allpokemons} setDisplayedPokemons={setDisplayedPokemons} />
        </header>
        <section className='pt-6 flex flex-col justify-content items-center overflow-auto z-0'>
          <div className='flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl'>
            {displayedPokemons.length > 0 ? (
              displayedPokemons.map(({ url, name }, index) => <PokeCard key={url} url={url} name={name} />)
            ) : (
              <h2 className='font-medium text-lg text-slate-900 mb-1'>포켓몬이 없습니다.</h2>
            )}
          </div>
        </section>
        <div className='text-center'>
          {/* 더보기 버튼을 보여주려면 */}
          {/* 모든 포켓몬 수가 보여주고 있는 포켓몬 수보다 많고 
            보여주는게 하나일 때가 아니여야 함 (검색 결과를 볼떄)
          */}
          {allpokemons.length > displayedPokemons.length && displayedPokemons.length !== 1 && (
            <button
              className='bg-slate-800 px-6 py-2 my-4 text-base
                    font-bold rounded-lg text-white'
              onClick={() => setDisplayedPokemons(filterDisplayedPokemonData(allpokemons, displayedPokemons))}
            >
              더보기
            </button>
          )}
        </div>
      </article>
    </>
  );
}

export default MainPage;
