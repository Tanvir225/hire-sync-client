import errorImg from "../../assets/images/404.jpg"
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  //useRouterError
  const error = useRouteError();

  return (
    <div className="flex space-y-4 flex-col justify-center items-center mt-16">
      <h1 className="font-bold text-4xl text-blue-500">Oops!</h1>
      <Link to={"/"} className="btn btn-outline text-blue-500">Go to Home</Link>
        <figure className="h-72">
            <img className="w-full h-full object-cover" src={errorImg} alt="404 image" />
        </figure>

      <p className="text-red-500 border-2 p-3 rounded-lg font-semibold text-lg">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};


export default ErrorPage;
