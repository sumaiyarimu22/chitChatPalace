import { BiMessageRoundedDetail } from "react-icons/bi";
import AuthForm from "./components/AuthForm";
const HomePage = () => {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <span>
          <BiMessageRoundedDetail className="w-10 h-10 text-sky-500 mx-auto" />
        </span>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          sign in to your account
        </h2>
      </div>

      {/* AUTH FORM */}
      <AuthForm />
    </div>
  );
};

export default HomePage;
