import { ChangeEvent, FC } from "react";
import { MenuItem } from "../../types";

type Props = {
  menuOpen: boolean;
  menuItems: MenuItem[];
  handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Menu: FC<Props> = (props) => {
  const { menuOpen, menuItems, handleCheckboxChange } = props;

  return (
    <nav className={`sticky ${!menuOpen ? 'max-h-0 border-none opacity-0' : 'max-h-96 border-solid opacity-100'} p-2 overflow-y-auto bg-slate-200 text-black w-full border-2 border-sky-500 font-normal transition-all`}>
      <div className="grid">
        <ul className="flex flex-wrap gap-x-5">
          {menuItems.map(item => (
            <li key={item.id}>
              {item.sourceName}
              {!!item.sources.length && (
                <ul className="pl-3 pb-2">
                  {item.sources.map(source => (
                    <li key={source.id}>
                      <input
                        className="cursor-pointer accent-neutral-800"
                        type="checkbox"
                        id={source.id}
                        name={source.id}
                        value={source.name}
                        checked={source.active}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        className="cursor-pointer pl-2"
                        htmlFor={source.id}
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