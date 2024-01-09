import { ChangeEvent, FC } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import dataSources from "../../utils/data-sources";


type Props = {
  menuOpen: boolean;
};

const Menu: FC<Props> = (props) => {
  const { menuOpen } = props;
  const [data, saveData] = useLocalStorage("data", dataSources);
  
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log('event', event.target.name.split('_'));
    data.forEach(item => {
      if (item.sourceName === event.target.name.split('_')[0]) {
        item.sources.forEach(source => {
          if (source.name === event.target.name.split('_')[1]) {
            source.active = !source.active;
            console.log('data', data);
            saveData(data);
          }
        });
      }
    });
  };

  return (
    <nav className={`sticky ${!menuOpen ? 'max-h-0 border-none opacity-0' : 'max-h-96 border-solid opacity-100'} p-2 overflow-hidden bg-slate-200 text-black w-full border-2 border-sky-500 font-normal transition-all`}>
      <ul>
        {data.map(item => (
          <li key={item.sourceName}>
            {item.sourceName}
            {!!item.sources.length && (
              <ul className="pl-3 pb-2">
                {item.sources.map(source => (
                  <li key={`${item.sourceName}_${source.name}`}>
                    <input
                      className="cursor-pointer accent-neutral-800"
                      type="checkbox"
                      id={`${item.sourceName}_${source.name}`}
                      name={`${item.sourceName}_${source.name}`}
                      value={source.name}
                      checked={source.active}
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