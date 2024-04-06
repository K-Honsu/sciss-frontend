import { useState } from "react";
import { useLogin } from "../../../hooks/useLogin";
import { baseUrl } from "../../../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import InputBox from "../../../components/common/InputBox";

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
  return (
    <div className="flex h-screen *:basis-full *:flex *:h-full">
      <div className="bg-neutral relative">
        <img src={"images/login.svg"} alt="login illustration" fill={true} />
      </div>
      <div className="p-8 flex-col ">
        <div className="flex self-end justify-self-start">
          <img
            width={140}
            height={61.5}
            alt="logo"
            src="/images/logo.svg"
            quality={100}
          />
        </div>
        <div className="flex h-full justify-center flex-col">
          <form className="flex flex-col gap-y-16">
            <div className="flex flex-col gap-y-4">
              <InputContainer>
                <label>Email</label>
                <InputBox
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
            <button onClick={handleSubmit} className="btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
function InputContainer({ children }) {
  return <div className="flex flex-col">{children}</div>;
}

export default Login;
