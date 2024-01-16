import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className="fixed grid justify-center items-center left-0 top-0 bg-slate-400/50 w-full h-full">
      <div className={styles['lds-roller']}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  );
};

export default Loading;