const dataSources = [{
  sourceName: 'Polsat News',
  lightColor: '#e6007e',
  darkColor: '#143266',
  logoFileName: 'polsat-news-logo.svg',
  url: '',
  sources: [{
    name: 'Wszystkie',
    url: 'https://www.polsatnews.pl/rss/wszystkie.xml',
    feed: [],
  },
  {
    name: 'Polska',
    url: 'https://www.polsatnews.pl/rss/polska.xml',
    feed: [],
  },
  {
    name: 'Świat',
    url: 'https://www.polsatnews.pl/rss/swiat.xml',
    feed: [],
  },
  {
    name: 'Wideo',
    url: 'https://www.polsatnews.pl/rss/wideo.xml',
    feed: [],
  },
  {
    name: 'Biznes',
    url: 'https://www.polsatnews.pl/rss/biznes.xml',
    feed: [],
  }]
},
{
  sourceName: 'Polska Agencja Prasowa',
  lightColor: '#e6007e',
  darkColor: '#842219',
  logoFileName: 'pap.svg',
  url: '',
  sources: [{
    name: 'Wszystkie',
    url: 'https://pap-mediaroom.pl/rss.xml',
    feed: [],
  },
  {
    name: 'Biznes i finanse',
    url: 'https://pap-mediaroom.pl/kategoria/biznes-i-finanse/rss.xml',
    feed: [],
  }]
},
{
  sourceName: 'Auto centrum',
  lightColor: '#e6007e',
  darkColor: '#1e80a4',
  logoFileName: 'autocentrum.svg',
  url: '',
  sources: [{
    name: 'Co nowego',
    url: 'https://www.autocentrum.pl/rss/co-nowego/',
    feed: [],
  },
  {
    name: 'Publikacje',
    url: 'https://www.autocentrum.pl/rss/publikacje/',
    feed: [],
  }]
}];

export default dataSources;