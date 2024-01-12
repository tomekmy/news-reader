import { ChangeEvent, FC } from "react";
import { MenuItem } from "../../types";

type Props = {
  menuOpen: boolean;
  menuItems: MenuItem[];
  setMenuItems: (menuItems: MenuItem[]) => void;
};

const Menu: FC<Props> = (props) => {
  const { menuOpen, menuItems, setMenuItems } = props;
  
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newMenuItems = menuItems.map(item => {
      if (item.sourceName === event.target.name.split('_')[0]) {
        return {
          ...item,
          sources: item.sources.map(source => {
            if (source.name === event.target.name.split('_')[1]) {
              return {
                ...source,
                active: !source.active,
              }
            }
            return source;
          }),
        }
      }
      return item;
    });

    setMenuItems(newMenuItems);
  };

  return (
    <nav className={`sticky ${!menuOpen ? 'max-h-0 border-none opacity-0' : 'max-h-96 border-solid opacity-100'} p-2 overflow-y-auto bg-slate-200 text-black w-full border-2 border-sky-500 font-normal transition-all`}>
      <div className="grid">
        <ul className="flex flex-wrap gap-x-5">
          {menuItems.map(item => (
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
        <a className="justify-self-end" href="#">Ustawienia</a>
      </div>
    </nav>
  );
};

export default Menu;