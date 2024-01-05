import { useEffect, useState } from 'react';
import moment from "moment";
import parse from "rss-to-json";
import dataSources from './utils/data-sources';
import Menu from './components/Menu/Menu';

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
  const [feed, setFeed] = useState<Feed[] | null>(null);

  useEffect(() => {
    const promisees = dataSources[0].sources.map((source) => parse(source.url));
    Promise.all(promisees).then((values) => {
      console.log(values);
      setFeed(values as unknown as Feed[]);
    });
  }, []);


  return (
    <div className="min-h-screen min-w-full p-6 bg-white dark:bg-slate-800 dark:text-white">
      <Menu />
      <main>
        {dataSources.map((source) => (
          <div key={source.sourceName} style={{backgroundColor: source.darkColor}}>
            <div className="p-5 text-center grid justify-items-center	gap-3">
              <h1 className="font-bold text-lg">{source.sourceName}</h1>
              <img src={`/logos/${source.logoFileName}`} alt="News feed logo" className='h-12'/>
            </div>
            <div className="flex flex-wrap gap-4 justify-center p-5 items-start">
            {
              feed?.map((source) => (
                <div key={source.title} className="grid gap-1 max-w-96 min-w-60 pt-4 items-start">
                  <div className="font-semibold">Nazwa kanału: {source.title}</div>
                  <div className="font-semibold">Opis kanału: {source.description}</div>
                  <div className="text-sm">Źródło: <a className="hover:text-slate-300" href={source.link}>{source.link}</a></div>
                  {
                  source.items.map((item) => (
                    <div key={item.title} className="grid gap-2 max-w-96 min-w-60 pt-4 items-start">
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="text-sm">{moment(item.created).format('DD/MM/YYYY hh:mm')}</p>
                      <p className="indent-2">{item.description}</p>
                      <a className="text-sm hover:text-slate-300" href={item.link}>Czytaj artykuł</a>
                    </div>
                  ))}
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
