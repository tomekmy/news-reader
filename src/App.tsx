import { useEffect, useState } from 'react'
import parse from "rss-to-json";
import './App.css'
import dataSources from './utils/data-sources';

function App() {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const promisees = dataSources[0].sources.map((source) => parse(source.url));
    Promise.all(promisees).then((values) => {
      console.log(values);
      setData(values);
    });
  }, []);


  return (
    <>
      {JSON.stringify(data)}
    </>
  )
}

export default App
