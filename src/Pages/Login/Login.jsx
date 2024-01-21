import { Link, useLocation, useNavigate } from "react-router-dom";
import signImage from "../../assets/images/signin.jpg";
import { AiOutlineGoogle } from "react-icons/ai";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import useAuth from "../../Hook/useAuth";
import toast from "react-hot-toast";
import useAxios from "../../Hook/useAxios";

const Login = () => {
  //state
  const [toggle, setToggle] = useState(false);

  //useAuth useAxios hooks
  const { loginUser, googleLogin } = useAuth();
  const axios = useAxios();

  //location & navigate
  const location = useLocation();
  const navigate = useNavigate();

  //handleSubmit
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = event.target;
    const email = formData.email.value;
    const password = formData.password.value;
  

    //toastId
    const toastId = toast.loading("logging in ...");

    //loginUser
    loginUser(email, password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        toast.success("User Login Successfully", { id: toastId });
        formData.reset();

        //jwt user post
        axios.post("/jwt", {email:user?.email}).then((res) => {
          if (res?.data) {
            console.log(res.data);
            navigate(location?.state ? location?.state : "/");
          }
        });
      })
      .catch((error) => {
        toast.error(error.message.slice(10, error.message.length), {
          id: toastId,
        });
      });
  };

  //handle googleLogin
  const handleGoogleLogin = (media) => {
    //toastId
    const toastId = toast.loading("logging in ...");

    media().then((result) => {
      const user = result.user;
      console.log(user);
      toast.success("User Login Successfully", { id: toastId });
      //jwt user post
      axios.post("/jwt",{email:  user?.email}).then((res) => {
        if (res?.data) {
          console.log(res.data);
          navigate(location?.state ? location?.state : "/");
        }
      });
       
    });
  };

  return (
    <div className="bg-base-100 h-fit flex flex-col justify-center items-center bg-opacity-95">
      {/* helmet provider */}
      <Helmet>
        <title>Hire Sync | Login</title>
      </Helmet>
      {/* end */}

      <div className="flex flex-col items-center justify-center gap-10 lg:flex-row-reverse px-5  md:mt-10 lg:px-20 ">
        <div className="lg:w-[45%] space-y-5">
          <h2 className="text-3xl font-bold text-center">
            Login to <span className="text-blue-600">Hire Sync</span>
          </h2>
          <p className="text-base font-semibold text-center text-gray-500">
            Now You can <span className="text-blue-600">post</span> and
            <span className="text-blue-600"> apply</span> for your dream job in
            <span className="text-blue-600"> Hire Sync</span>
          </p>
          <div>
            <button
              onClick={() => handleGoogleLogin(googleLogin)}
              className="btn text-blue-600 w-full btn-outline"
            >
              <AiOutlineGoogle className="text-xl"></AiOutlineGoogle> with
              google
            </button>
          </div>
          <div className="divider">OR</div>

          {/* log in form */}
          <div>
            <form className="" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={toggle ? "text" : "password"}
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                  required
                />

                <p
                  className="absolute top-14 right-5"
                  onClick={() => setToggle(!toggle)}
                >
                  {toggle ? (
                    <AiOutlineEye></AiOutlineEye>
                  ) : (
                    <AiOutlineEyeInvisible></AiOutlineEyeInvisible>
                  )}
                </p>
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-outline text-blue-600 ">
                  Login
                </button>
              </div>
            </form>
            <div className="py-3">
              <p className="font-semibold text-end">
                Don't have any account?{" "}
                <Link to={"/signup"} className="text-blue-500 hover:underline">
                  signup
                </Link>
              </p>
            </div>
          </div>

          {/* login form end */}
        </div>
        <div className="lg:flex-1">
          <img
            className="w-full h-full object-cover"
            src={signImage}
            alt="signinImage"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
