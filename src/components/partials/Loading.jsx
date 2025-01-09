import loader from "/loader.gif";

const Loading = () => {
  return (
    <div className="w-screen h-[100vh] flex justify-center items-center">
      <img className="w-full h-full object-cover" src={loader} alt="" />
    </div>
  );
};

export default Loading;
