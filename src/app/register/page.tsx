import Link from "next/link";

const Register = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-white">
      <form action="">
        <div className="h-[500px] w-[500px] flex flex-col justify-around items-center rounded-md shadow-gray-200 shadow-lg">
          <div
            className="w-4/5
          "
          >
            <h3 className="text-2xl self-start">Create your Uprite account</h3>
          </div>

          <div className="flex flex-col justify-around w-4/5">
            <label className="text-sm" htmlFor="">
              First name
            </label>
            <input
              className="my-2 border border-slate-300 rounded-md py-2 px-2"
              type="text"
            />
            <label className="text-sm" htmlFor="">
              Last name
            </label>
            <input
              className="my-2 border border-slate-300 rounded-md py-2 px-2"
              type="text"
            />
            <label className="text-sm" htmlFor="">
              Email
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
        Already have an account?{" "}
        <Link className="text-indigo-500" href="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
