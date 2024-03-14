"use client"
import InputBox from "../../../components/common/InputBox";

function Signup() {
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
          <form className="flex flex-col gap-y-16">
            <div className="flex flex-col gap-y-4">
              <div className="flex gap-4 *:basis-full">
                <InputContainer>
                  <label>First name</label>
                  <InputBox name="first_name" placeholder="Enter your first name" />
                </InputContainer>
                <InputContainer>
                  <label>Last name</label>
                  <InputBox name="last_name" placeholder="Enter your last name" />
                </InputContainer>
              </div>
              <div className="flex gap-4 *:basis-full">
                <InputContainer>
                  <label>Username</label>
                  <InputBox name="username" placeholder="Create a username" />
                </InputContainer>
                <InputContainer>
                  <label>Email</label>
                  <InputBox name="email" placeholder="Enter your email" />
                </InputContainer>
              </div>
              <div className="flex gap-4 *:basis-full">
                <InputContainer>
                  <label>Password</label>
                  <InputBox name="password" type="password" />
                </InputContainer>
                <InputContainer>
                  <label>Confirm Password</label>
                  <InputBox name="confirm_password" type="password" />
                </InputContainer>
              </div>
            </div>
            <button className='btn-primary'>
              Sign up now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
function InputContainer({ children }) {
  return (
    <div className="flex flex-col">
      {children}
    </div>
  )
}

export default Signup;