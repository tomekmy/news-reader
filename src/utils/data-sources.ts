const dataSources = [{
  sourceName: 'Polsat News',
  lightColor: '#e6007e',
  darkColor: '#143266',
  logoFileName: 'polsat-news-logo.svg',
  url: '',
  sources: [{
    name: 'Wszystkie',
    url: 'https://www.polsatnews.pl/rss/wszystkie.xml',
  },
  {
    name: 'Polska',
    url: 'https://www.polsatnews.pl/rss/polska.xml',
  },
  {
    name: 'Świat',
    url: 'https://www.polsatnews.pl/rss/swiat.xml',
  },
  {
    name: 'Wideo',
    url: 'https://www.polsatnews.pl/rss/wideo.xml',
  },
  {
    name: 'Biznes',
    url: 'https://www.polsatnews.pl/rss/biznes.xml',
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
  },
  {
    name: 'Biznes i finanse',
    url: 'https://pap-mediaroom.pl/kategoria/biznes-i-finanse/rss.xml',
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
  },
  {
    name: 'Publikacje',
    url: 'https://www.autocentrum.pl/rss/publikacje/',
  }]
}];

export default dataSources;