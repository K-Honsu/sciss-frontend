import InputBox from "../../../components/common/InputBox";
import DropdownMenu from "../../../components/common/DropdownMenu";
function AuthHeader() {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b-2">
      <div>
        <img
          width={140}
          height={61.5}
          alt="logo"
          src="/images/logo.svg"
        />
      </div>
      <InputBox placeholder="search" />
      <DropdownMenu />
    </header>
  );
}

export default AuthHeader;