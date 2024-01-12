export type MenuItem = {
  sourceName: string;
  active: boolean;
  sources: MenuItemSource[];
};

type MenuItemSource = {
  name: string;
  active: boolean;
};

export type DataSource = {
  sourceName: string;
  lightColor: string;
  darkColor: string;
  logoFileName: string;
  url: string;
  active: boolean;
  sources: Source[];
};

type Source = {
  name: string;
  url: string;
  feed: FeedItem[]; 
  active: boolean;
};

export type FeedItem = {
  title: string;
  created: string;
  description: string;
  enclosures: { url: string }[];
  link: string;
};