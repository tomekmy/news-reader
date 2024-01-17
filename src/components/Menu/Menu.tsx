import { ChangeEvent, FC } from "react";
import { MenuItem } from "../../types";

type Props = {
  menuOpen: boolean;
  menuItems: MenuItem[];
  limit: number;
  handleChangeLimit: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Menu: FC<Props> = (props) => {
  const { menuOpen, menuItems, handleCheckboxChange, limit, handleChangeLimit } = props;

  return (
    <nav className={`sticky ${!menuOpen ? 'max-h-0 border-none opacity-0' : 'max-h-96 border-solid opacity-100'} p-2 overflow-y-auto bg-slate-200 text-black max-w-3xl border-2 border-blue-700 font-normal transition-all ml-auto mb-5`}>
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
        <div className="grid grid-flow-col">
          <label htmlFor="limit">Limit: </label>
          <input
            type="tel"
            id="limit"
            name="limit"
            value={limit || ''}
            onChange={handleChangeLimit}
            />
        </div>
      </div>
    </nav>
  );
};

export default Menu;