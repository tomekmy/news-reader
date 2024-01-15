export type MenuItem = {
  id: string;
  sourceName: string;
  active: boolean;
  sources: MenuItemSource[];
};

type MenuItemSource = {
  id: string;
  name: string;
  active: boolean;
};

export type DataSource = {
  id: string;
  sourceName: string;
  lightColor: string;
  darkColor: string;
  logoFileName: string;
  url: string;
  active: boolean;
  sources: Source[];
};

type Source = {
  id: string;
  name: string;
  url: string;
  feed: FeedItem[]; 
  active: boolean;
};

export type FeedItem = {
  id: string;
  title: string;
  created: string;
  description: string;
  enclosures: { url: string }[];
  link: string;
};