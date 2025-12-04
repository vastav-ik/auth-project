export default function VerifyRequest() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100 text-black">
      <h1 className="text-4xl font-bold mb-4">Check your email</h1>
      <p className="text-lg text-center max-w-md">
        We've sent a verification link to your email address. <br />
        Please click the link in the email to verify your account before logging
        in.
      </p>
    </div>
  );
}
