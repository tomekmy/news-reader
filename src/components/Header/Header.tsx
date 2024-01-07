const Header = () => {
  return (
    <header className="grid grid-cols-[250px_1fr]">
      <div className="grid grid-cols-[60px_1fr]">
        <img src="/favicon.svg" alt="logo" className="h-12" />
        <div>
          <h1 className="font-bold text-xl">Read Point</h1>
          <h2 className="text-sm">News aggregator</h2>
        </div>
      </div>
      <div>Menu button</div>
    </header>
  );
};

export default Header;