import Link from "next/link";

const Login = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-white">
      <form action="">
        <div className="h-[400px] w-[500px] flex flex-col justify-around items-center rounded-md shadow-gray-200 shadow-lg">
          <h3 className="text-2xl">Sign in to your account</h3>
          <div className="flex flex-col justify-around w-4/5">
            <label className="text-sm" htmlFor="">
              Email
            </label>
            <input
              className="my-2 border border-slate-300 rounded-md py-2 px-2"
              type="text"
            />
            <label className="text-sm" htmlFor="">
              Password
            </label>
            <input
              className="my-2 border border-slate-300 rounded-md py-2 px-2"
              type="text"
            />
          </div>
          <button className="h-[50px] w-4/5 bg-indigo-500 text-white rounded-md">
            Continue
          </button>
        </div>
      </form>
      <div className="m-5">
        Don&#39;t have an account?{" "}
        <Link className="text-indigo-500" href="/register">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
