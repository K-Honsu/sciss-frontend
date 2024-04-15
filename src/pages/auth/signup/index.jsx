"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import { baseUrl } from "../../../config";
import InputBox from "../../../components/common/InputBox";
import { Link } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoBack = (e) => {
    e.preventDefault()
    window.history.back()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "POST",
        url: `${baseUrl}/user`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { username, email, password },
      };

      const response = await axios.request(options);
      if (response.status === 201) {
        toast.success("SignUp successfull, Redirecting to the login page!");
        setTimeout(() => {
          window.location.href = "/login";
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
        <img
          src={"images/signup.svg"}
          alt="signup illustration"
          fill={true}
          priority
        />
      </div>
      <div className="p-8 flex-col ">
        <div className="flex self-end justify-self-start">
        <ArrowLeft size={55} className="mt-4 rounded-md bg-green-600 mr-80" onClick={handleGoBack}/>
          <img
            width={140}
            height={61.5}
            alt="logo"
            src="/images/logo.svg"
            priority
            quality={100}
            unoptimized
          />
        </div>
        <div className="flex h-full justify-center flex-col">
          <form className="flex flex-col gap-y-16" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-y-4">
              <div className="flex gap-4 *:basis-full"></div>
              <div className="flex gap-4 *:basis-full">
                <InputContainer>
                  <label>Username</label>
                  <InputBox
                    required
                    name="username"
                    placeholder="Create a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </InputContainer>
                <InputContainer>
                  <label>Email</label>
                  <InputBox
                    required
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputContainer>
              </div>
              <div className="flex gap-4 *:basis-full">
                <InputContainer>
                  <label>Password</label>
                  <InputBox
                    required
                    name="password"
                    type="password"
                    placeholder="Kindly enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputContainer>
              </div>
            </div>
            <button className="btn-primary">Sign up now</button>
          </form>
          <div className="flex gap-60">
            <h3 className="items-center justify-center px-5 py-3 mt-4">
              Already have an account?{" "}
            </h3>
            <div className="Sign">
              <Link
                to="/login"
                className="mt-4 w-full flex items-center justify-center gap-2 px-5 py-3 font-medium rounded-md bg-orange-400"
              >
                Sign In
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

export default Signup;
