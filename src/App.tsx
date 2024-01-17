import { ChangeEvent, useEffect, useState } from 'react';
import moment from "moment";
import { useLocalStorage } from "@uidotdev/usehooks";
import axios from 'axios';
import Menu from './components/Menu/Menu';
import Header from './components/Header/Header';
import striptags from 'striptags';
import { DataSource, FeedItem, MenuItem } from './types';
import Loading from './components/Loading/Loading';
import CookieInfo from './components/CookieInfo/CookieInfo';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [limit, setLimit] = useLocalStorage('limit', 50);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useLocalStorage<MenuItem[]>("menuItems", []);
  const [data, setData] = useState<DataSource[]>([]);
  const [loading, setLoading] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleChangeLimit = (event: ChangeEvent<HTMLInputElement>) => {
    setLimit(+event.target.value);
  };

  const getItemsById = async (menu: MenuItem[]) => {
    const activeSources = menu.map((item) => ({
      sourceName: item.sourceName,
      sources: item.sources.filter((source) => source.active),
    }));

    const activeSourcesNames = activeSources.map((item) => item.sources.map((source) => source.id)).flat();
    try {
      setLoading(true);
      const { data }: { data: DataSource[] } = await axios.get(`http://localhost:5000/feed?limit=${limit}&sources=${activeSourcesNames.join(',')}`);
      setData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newMenuItems = menuItems.map(item => {
      return {
        ...item,
        sources: item.sources.map(source => {
          if (source.id === event.target.id) {
            return {
              ...source,
              active: !source.active,
            }
          }
          return source;
        }),
      }
    });

    setMenuItems(newMenuItems);
    getItemsById(newMenuItems).catch((err) => { console.log(err); })
  };
  
  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      const newColorScheme = event.matches ? "dark" : "light";
      if (newColorScheme === 'dark') {
        setDarkMode(true);
      } else {
        setDarkMode(false);
      }
    });

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }

    const fetchData = async () => {
      if (!menuItems.length) {
        try {
          setLoading(true);
          const { data }: { data: DataSource[] } = await axios.get('http://localhost:5000/feed');
          setData(data);
          setMenuItems(
            data.map((item) => ({
              id: item.id,
              sourceName: item.sourceName,
              active: item.active,
              sources: item.sources.map((source) => ({
                id: source.id,
                name: source.name,
                active: source.active,
              })),
            }))
          );
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      } else {
        await getItemsById(menuItems);
      }
    }
    fetchData().catch((err) => { console.log(err); })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="font-open-sans font-light min-h-screen min-w-full p-3 sm:p-6 bg-white dark:bg-slate-800 dark:text-white">
      <Header menuOpen={menuOpen} handleMenuClick={handleMenuClick}/>
      {!!menuItems.length && (
        <Menu
          menuOpen={menuOpen}
          menuItems={menuItems}
          handleCheckboxChange={handleCheckboxChange}
          limit={limit}
          handleChangeLimit={handleChangeLimit}
        />
      )}
      <main>
        {loading && <Loading />}
        {data.map((source) => (source.active || source.sources.some(item => item.active)) ? (
          <div key={source.id} style={{backgroundColor: darkMode ? source.darkColor : source.lightColor}}>
            <div className="p-5 text-center grid justify-items-center gap-3">
              <h1 className="font-bold text-lg text-slate-100">{source.sourceName}</h1>
              <img src={`/logos/${source.logoFileName}`} alt="News feed logo" className='h-12'/>
            </div>
            <div className="flex flex-wrap gap-4 justify-center p-3 sm:p-5 items-start">
            {
              source.sources.map((item) => item.active ? (
                <div key={item.id} className="grid gap-1 max-w-96 min-w-60 pt-4 items-start">
                  <div className="font-semibold text-slate-200">Nazwa kanału: {item.name}</div>
                  <div className="text-sm text-slate-300">Źródło: <a className="hover:text-slate-300" href={item.url}>{item.url}</a></div>
                  {
                   item.feed.map((feed: FeedItem) => (
                    <div key={feed.id} className="grid gap-2 max-w-96 min-w-60 pt-4 items-start border-solid border-2 border-blue-700 p-3">
                      <h3 className="font-bold">{feed.title}</h3>
                      {!!feed.enclosures.length && <img src={feed.enclosures[0].url} alt="Grafika artykułu" />}
                      <p className="text-sm">{moment(feed.created).isValid() ? moment(feed.created).format('DD/MM/YYYY hh:mm') : feed.created || 'Błąd odczytu daty'}</p>
                      <p className="indent-2">{striptags(feed.description)}</p>
                      <a className="text-sm hover:text-slate-300" href={feed.link}>Czytaj artykuł</a>
                    </div>
                  ))}
                </div>
              ): null)
            }
            </div>
          </div>
        ): null)}
        <CookieInfo />
      </main>
    </div>
  )
}

export default App
