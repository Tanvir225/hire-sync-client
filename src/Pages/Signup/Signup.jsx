import { Link, useLocation, useNavigate } from "react-router-dom";
import signImage from "../../assets/images/signin.jpg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import useAuth from "../../Hook/useAuth";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import useAxios from "../../Hook/useAxios";

const Signup = () => {
  //state
  const [toggle, setToggle] = useState(false);

  //useAuth & useAxios hooks
  const { createUser } = useAuth();
  const axios = useAxios()
  //navigate
  const navigate = useNavigate();

  //location
  const location = useLocation();

  //handleSubmit functionality
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = event.target;
    const name = formData.name.value;
    const photo = formData.photo.value;
    const email = formData.email.value;
    const password = formData.password.value;

    //toasId
    const toastId = toast.loading("logging in ..");

    //create user
    createUser(email, password)
      .then((res) => {
        const user = res.user;
        console.log(user);

        //update user
        updateProfile(user, {
          displayName: name,
          photoURL: photo,
        });
        toast.success("User crated Successfully", { id: toastId });
        formData.reset();

        //jwt user post
        axios.post("/jwt", { email: user?.email }).then((res) => {
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

  return (
    <div className="bg-base-100 h-fit flex flex-col justify-center items-center bg-opacity-90">
      {/* helmet provider */}
      <Helmet>
        <title>Hire Sync | Signup</title>
      </Helmet>
      {/* end */}

      <div className="flex flex-col items-center justify-center gap-10 lg:flex-row-reverse px-5 md:mt-10 lg:px-20 ">
        <div className="lg:w-[45%] space-y-5">
          <h2 className="text-3xl font-bold text-center">
            Signup to <span className="text-blue-600">Hire Sync</span>
          </h2>
          <p className="text-base font-semibold text-center text-gray-500">
            Now You can <span className="text-blue-600">post</span> and{" "}
            <span className="text-blue-600">apply</span> for your dream job in{" "}
            <span className="text-blue-600">Hire Sync</span>
          </p>

          {/* signup in form */}
          <div>
            <form className="" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="ex: Tanvir Rehman"
                  name="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo Url</span>
                </label>
                <input
                  type="text"
                  name="photo"
                  placeholder="ex: http://imgbb/tanvir.jpg"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
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
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
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
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-outline text-blue-600 ">
                  Register
                </button>
              </div>
            </form>
            <div className="py-3">
              <p className="font-semibold text-end">
                Already have any account?
                <Link to={"/login"} className="text-blue-500 hover:underline">
                  Login
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

export default Signup;
