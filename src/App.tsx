import { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import moment from "moment";
import parse from "rss-to-json";
import dataSources from './utils/data-sources';
import Menu from './components/Menu/Menu';
import Header from './components/Header/Header';

type FeedItem = {
  title: string;
  created: string;
  description: string;
  link: string;
};

type Feed = {
  title: string;
  description: string;
  link: string;
  items: FeedItem[];
};


function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [feed, setFeed] = useState<Feed[] | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const promisees = dataSources[2].sources.map((source) => parse(source.url));

    Promise.all(promisees).then((values) => {
      console.log(values);
      setFeed(values as unknown as Feed[]);
    }).catch((err) => { console.log(err); })
  }, []);


  return (
    <div className="font-open-sans font-light min-h-screen min-w-full p-6 bg-white dark:bg-slate-800 dark:text-white">
      <Header menuOpen={menuOpen} handleMenuClick={handleMenuClick}/>
      <Menu menuOpen={menuOpen} />
      <main>
        {dataSources.map((source) => (
          <div key={source.sourceName} style={{backgroundColor: source.darkColor}}>
            <div className="p-5 text-center grid justify-items-center	gap-3">
              <h1 className="font-bold text-lg">{source.sourceName}</h1>
              <img src={`/logos/${source.logoFileName}`} alt="News feed logo" className='h-12'/>
            </div>
            <div className="flex flex-wrap gap-4 justify-center p-5 items-start">
            {
              source.sources.map((source) => (
                <div key={source.name} className="grid gap-1 max-w-96 min-w-60 pt-4 items-start">
                  <div className="font-semibold">Nazwa kanału: {source.name}</div>
                  <div className="text-sm">Źródło: <a className="hover:text-slate-300" href={source.url}>{source.url}</a></div>
                  {/* {
                  source.items.map((item) => (
                    <div key={item.title} className="grid gap-2 max-w-96 min-w-60 pt-4 items-start">
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="text-sm">{moment(item.created).format('DD/MM/YYYY hh:mm')}</p>
                      <p className="indent-2">{item.description}</p>
                      <a className="text-sm hover:text-slate-300" href={item.link}>Czytaj artykuł</a>
                    </div>
                  ))} */}
                </div>
              ))
            }
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}

export default App
