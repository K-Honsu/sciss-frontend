import { useState } from "react";
import { useLogin } from "../../../hooks/useLogin";
import { baseUrl } from "../../../config";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import InputBox from "../../../components/common/InputBox";
import { Link } from "react-router-dom";

function Login() {
  const [formBody, setFormBody] = useState({
    email: "",
    password: "",
  });
  const { login } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "POST",
        url: `${baseUrl}/auth/`,
        headers: { "Content-Type": "application/json" },
        data: formBody,
      };

      const response = await axios.request(options);
      if (response.status === 200) {
        toast.success("Login successfully");
        login(formBody.email, formBody.password);
        setTimeout(() => {
          window.location.href = "/app";
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    window.history.back();
  };
  return (
    <div className="flex h-screen *:basis-full *:flex *:h-full">
      <div className="bg-neutral relative">
        <img src={"images/login.svg"} alt="login illustration" fill={true} />
      </div>
      <div className="p-8 flex-col ">
        <div className="flex self-end justify-self-start">
          <ArrowLeft size={55} className="mt-4 rounded-md bg-green-600 mr-80" onClick={handleGoBack} />
          <img
            width={140}
            height={61.5}
            alt="logo"
            src="/images/logo.svg"
            quality={100}
          />
        </div>
        <div className="flex h-full justify-center flex-col">
          <form className="flex flex-col gap-y-16" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-y-4">
              <InputContainer>
                <label>Email</label>
                <InputBox
                  required
                  name="email"
                  placeholder="Enter your email"
                  value={formBody.email}
                  onChange={(e) =>
                    setFormBody((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </InputContainer>
              <InputContainer>
                <label>Password</label>
                <InputBox
                  required
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formBody.password}
                  onChange={(e) =>
                    setFormBody((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </InputContainer>
            </div>
            <button className="btn-primary">Login</button>
          </form>
          <div className="flex gap-60">
            <h3 className="items-center justify-center px-5 py-3 mt-4">
              Do not have an account ?{" "}
            </h3>
            <div className="Sign">
              <Link
                to="/signup"
                className="mt-4 w-full flex items-center justify-center gap-2 px-5 py-3 font-medium rounded-md bg-orange-400"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function InputContainer({ children }) {
  return <div className="flex flex-col">{children}</div>;
}

export default Login;
