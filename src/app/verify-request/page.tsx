import Link from "next/link";

const VerifyRequest = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-white">
      <div className="h-[100px] w-[500px] flex flex-col justify-center items-center">
        <p className="text-2xl">&#128200;</p>
        <h1 className="font-semibold text-center">
          A login link has been sent to your email. If you don&#39;t receive it,
          please confirm you entered the correct email address.
        </h1>
      </div>
      <Link className="text-indigo-500 font-medium" href="/login">
        Go back to login
      </Link>
    </div>
  );
};

export default VerifyRequest;
