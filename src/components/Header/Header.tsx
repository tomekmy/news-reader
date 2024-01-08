import { FC } from "react";

type Props = {
  menuOpen: boolean;
  handleMenuClick: () => void;
};

const Header: FC<Props> = (props) => {
  const { menuOpen, handleMenuClick } = props;
  
  return (
    <header className="grid grid-cols-[250px_1fr] h-16">
      <div className="grid grid-cols-[60px_1fr]">
        <img src="/favicon.svg" alt="logo" className="h-12" />
        <div>
          <h1 className="font-bold text-xl">Read Point</h1>
          <h2 className="text-sm">News aggregator</h2>
        </div>
      </div>
      <div className="justify-self-end">
        <button className=" p-2 font-normal" onClick={handleMenuClick}>
          {menuOpen ? (
            <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;