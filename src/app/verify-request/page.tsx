export default function VerifyRequest() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6">
          <svg
            className="h-8 w-8 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Check your email
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          We've sent a verification link to your email address. Please click the
          link in the email to verify your account before logging in.
        </p>

        <p className="text-sm text-gray-500">
          Didn't receive an email? Check your spam folder.
        </p>
      </div>
    </div>
  );
}
