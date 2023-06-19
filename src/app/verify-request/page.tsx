import Link from "next/link";

const VerifyRequest = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-white">
      <h1>Check your email!</h1>
      <h2>
        A login link has been sent to your email. If you don&#39;t receive it,
        please confirm you entered the correct email address.
      </h2>
      <Link href="/login">Go back to homepage.</Link>
    </div>
  );
};

export default VerifyRequest;
