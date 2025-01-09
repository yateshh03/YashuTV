import notfound from "/404.gif";

const NotFound = () => {
  return (
    <div className="w-screen h-[100vh] flex justify-center items-center">
      <img className="w-full h-full object-cover" src={notfound} alt="" />
    </div>
  );
};

export default NotFound;
