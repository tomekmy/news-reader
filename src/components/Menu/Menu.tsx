"use client";
import dataSources from "../../utils/data-sources";

const Menu = () => {
  const sources = localStorage.getItem("sources") ?? '';
  
  const handleCheckboxChange = (event) => {
    console.log('event', event);
  };

  return (
    <nav className="sticky bg-slate-200 text-black w-full p-2 border-solid border-2 border-sky-500 font-normal">
      <ul>
        {dataSources.map(item => (
          <li key={item.sourceName}>
            {item.sourceName}
            {!!item.sources.length && (
              <ul className="pl-3 pb-2">
                {item.sources.map(source => (
                  <li key={`${item.sourceName}_${source.name}`}>
                    <input
                      className="cursor-pointer accent-neutral-800"
                      type="checkbox" id={`${item.sourceName}_${source.name}`}
                      name={`${item.sourceName}_${source.name}`}
                      value={source.name}
                      checked={!sources}
                      onChange={handleCheckboxChange}
                    />
                    <label
                      className="cursor-pointer pl-2"
                      htmlFor={`${item.sourceName}_${source.name}`}
                    >
                      {source.name}
                    </label>
                  </li>
                ))}
              </ul>)}
          </li>

        ))}
      </ul>
    </nav>
  );
};

export default Menu;