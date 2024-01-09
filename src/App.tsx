import { useEffect, useState } from 'react';
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
  name: string;
  url: string;
  mainIdx: number;
  sourceIdx: number;
  feed: FeedItem[];
};


function App() {
  const [feed, setFeed] = useState<Feed[]>([]);
  const [mainData, setMainData] = useState(dataSources);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    dataSources.forEach((mainItem, idx) => {
      mainItem.sources.forEach((source, index) => {
        parse(source.url).then((feed) => {
          setFeed(prev => [...prev, {
            ...dataSources[idx].sources[index],
            mainIdx: idx,
            sourceIdx: index,
            feed: feed.items as FeedItem[]
          }]);
        }).catch((err) => { console.log(err); });
      });
    });
  }, []);

  useEffect(() => {
    const updatedDataSources = [...dataSources];

    feed.forEach((feedItem) => {
      const { mainIdx, sourceIdx, feed } = feedItem;
      (updatedDataSources[mainIdx].sources[sourceIdx].feed as FeedItem[]) = feed;
    });

    // console.log(updatedDataSources);
    setMainData(updatedDataSources);
  }, [feed]);



  // console.log(feed);


  return (
    <div className="font-open-sans font-light min-h-screen min-w-full p-6 bg-white dark:bg-slate-800 dark:text-white">
      <Header menuOpen={menuOpen} handleMenuClick={handleMenuClick}/>
      <Menu menuOpen={menuOpen} />
      <main>
        {mainData.map((source) => (
          <div key={source.sourceName} style={{backgroundColor: source.darkColor}}>
            <div className="p-5 text-center grid justify-items-center	gap-3">
              <h1 className="font-bold text-lg">{source.sourceName}</h1>
              <img src={`/logos/${source.logoFileName}`} alt="News feed logo" className='h-12'/>
            </div>
            <div className="flex flex-wrap gap-4 justify-center p-5 items-start">
            {
              source.sources.map((item) => (
                <div key={`${source.sourceName}_${item.name}`} className="grid gap-1 max-w-96 min-w-60 pt-4 items-start">
                  <div className="font-semibold">Nazwa kanału: {item.name}</div>
                  <div className="text-sm">Źródło: <a className="hover:text-slate-300" href={item.url}>{item.url}</a></div>
                  {
                   item.feed.map((feed: FeedItem) => (
                    <div key={feed.title} className="grid gap-2 max-w-96 min-w-60 pt-4 items-start">
                      <h3 className="font-bold">{feed.title}</h3>
                      <p className="text-sm">{moment(feed.created).format('DD/MM/YYYY hh:mm')}</p>
                      <p className="indent-2">{feed.description}</p>
                      <a className="text-sm hover:text-slate-300" href={feed.link}>Czytaj artykuł</a>
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
