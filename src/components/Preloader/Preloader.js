import "./Preloader.css";
const Preloader = () => {
  return (
    <div className="circle">
      <div className="circle-preloader"></div>
      <p className="circle__texts">Searching for news...</p>
    </div>
  );
};
export default Preloader;
