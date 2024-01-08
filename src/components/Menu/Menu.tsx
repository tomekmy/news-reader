import { FC } from "react";
import dataSources from "../../utils/data-sources";

type Props = {
  menuOpen: boolean;
};

const Menu: FC<Props> = (props) => {
  const { menuOpen } = props;
  const sources = localStorage.getItem("sources") ?? '';
  
  const handleCheckboxChange = (event) => {
    console.log('event', event);
  };

  return (
    <nav className={`sticky ${!menuOpen ? 'max-h-0 border-none opacity-0' : 'max-h-96 border-solid opacity-100'} p-2 overflow-hidden bg-slate-200 text-black w-full border-2 border-sky-500 font-normal transition-all`}>
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