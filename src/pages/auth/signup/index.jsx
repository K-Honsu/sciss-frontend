"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { baseUrl } from "../../../config";
import InputBox from "../../../components/common/InputBox";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      console.log(response.data);
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
        </div>
      </div>
    </div>
  );
}
function InputContainer({ children }) {
  return <div className="flex flex-col">{children}</div>;
}

export default Signup;
