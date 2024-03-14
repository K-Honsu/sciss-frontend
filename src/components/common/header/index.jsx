import { Link } from "react-router-dom";
function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4">
      <div>
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
      <div className="flex gap-x-8">
        <Link href="login">
            <button className='btn-secondary'>
              Login
            </button>
          </Link>
          <Link href="signup">
            <button className="btn-primary">Sign up</button>
          </Link>
      </div>
    </header>
  );
}

export default Header;