import { useEffect, useState } from 'react';
import moment from "moment";
import parse from "rss-to-json";
import { useLocalStorage } from "@uidotdev/usehooks";
import dataSources from './utils/data-sources';
import Menu from './components/Menu/Menu';
import Header from './components/Header/Header';
import striptags from 'striptags';

type FeedItem = {
  title: string;
  created: string;
  description: string;
  enclosures: { url: string }[];
  link: string;
};

type Feed = {
  name: string;
  url: string;
  mainIdx: number;
  sourceIdx: number;
  feed: FeedItem[];
};


function App() {
  const [feed, setFeed] = useState<Feed[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, saveData] = useLocalStorage("data", dataSources);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    console.log('data', data);
    data.forEach((mainItem, idx) => {
      mainItem.sources.forEach((source, index) => {
        source.active && parse(source.url).then((feed) => {
          setFeed(prev => [...prev, {
            ...data[idx].sources[index],
            mainIdx: idx,
            sourceIdx: index,
            feed: feed.items as FeedItem[]
          }]);
        }).catch((err) => { console.log(err); });
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const updatedDataSources = [...data];

    feed.forEach((feedItem) => {
      const { mainIdx, sourceIdx, feed } = feedItem;
      (updatedDataSources[mainIdx].sources[sourceIdx].feed as FeedItem[]) = feed;
    });

    saveData(updatedDataSources);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feed]);

  // console.log(data.map((source) => source.active ));

  return (
    <div className="font-open-sans font-light min-h-screen min-w-full p-6 bg-white dark:bg-slate-800 dark:text-white">
      <Header menuOpen={menuOpen} handleMenuClick={handleMenuClick}/>
      <Menu menuOpen={menuOpen} />
      <main>
        {data.map((source) => (source.active || source.sources.some(item => item.active)) ? (
          <div key={source.sourceName} style={{backgroundColor: source.darkColor}}>
            <div className="p-5 text-center grid justify-items-center	gap-3">
              <h1 className="font-bold text-lg text-red-400">{source.sourceName}</h1>
              <img src={`/logos/${source.logoFileName}`} alt="News feed logo" className='h-12'/>
            </div>
            <div className="flex flex-wrap gap-4 justify-center p-5 items-start">
            {
              source.sources.map((item) => item.active ? (
                <div key={`${source.sourceName}_${item.name}`} className="grid gap-1 max-w-96 min-w-60 pt-4 items-start">
                  <div className="font-semibold text-red-300">Nazwa kanału: {item.name}</div>
                  <div className="text-sm text-red-100">Źródło: <a className="hover:text-slate-300" href={item.url}>{item.url}</a></div>
                  {
                   item.feed.map((feed: FeedItem) => (
                    <div key={feed.title} className="grid gap-2 max-w-96 min-w-60 pt-4 items-start">
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
      </main>
    </div>
  )
}

export default App
