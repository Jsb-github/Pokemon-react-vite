import React, { useState } from "react";

export const AutoComplete = ({ allpokemons, setDisplayedPokemons }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filterNames = (input) => {
    const value = input.toLowerCase();
    return value ? allpokemons.filter((e) => e.name.includes(value)) : [];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let text = searchTerm.trim();
    setDisplayedPokemons(filterNames(text));
    setSearchTerm("");
  };

  const checkEqualName = (input) => {
    const filteredArray = filterNames(input);
    // 검색하는 것에 정확히 일치하는 포켓몬 이름이 있으면 autocomplete 없애기
    return filteredArray[0]?.nmae === input ? [] : filteredArray;
  };

  return (
    <div className='relative z-50'>
      <form
        onSubmit={handleSubmit}
        className='relative flex justify-center items-center
    w-[20.5rem] h-6 rounded-lg m-auto'
      >
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          type='text'
          className='text-xs w-[20.5rem] h-6 px-2
      rounded-lg text-gray-300 text-center
      bg-[hsl(214,13%,47%)]'
          placeholder=' '
        />

        <button
          type='submit'
          className='fa fa-2x text-xs bg-slate-900
        text-slate-300 w-[2.5rem] h-6 px-2 py-1 rounded-r-lg text-center absolute right-0 hover:bg-slate-700 z-0'
        >
          검색
        </button>
      </form>

      {checkEqualName(searchTerm).length > 0 && (
        <div className={"w-full flex bottom-0 h-0 flex-col absolute justify-center items-center translate-y-2"}>
          <div
            className={
              "w-0 h-0 bottom-0 border-x-transparent border-x-8 border-b-[8px] border-gray-700 -translate-y-1/2"
            }
          ></div>
          <ul className={"w-40 max-h-[134px] py-1 bg-gray-700 rounded-lg absolute overflow-auto scrollbar-none"}>
            {checkEqualName(searchTerm).map((e, i) => (
              <li key={`button-${i}`}>
                <button
                  aria-label={e.name}
                  onClick={() => {
                    setSearchTerm(e.name);
                  }}
                  className={"text-base w-full hover:bg-gray-600 p-[2px] text-gray-100"}
                >
                  {e.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
