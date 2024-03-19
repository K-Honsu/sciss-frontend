import { useState } from "react";
import { baseUrl } from "../../config";
import InputBox from "../../components/common/InputBox";
import DropdownMenu from "../../components/common/DropdownMenu";
import { usebackendStore } from "../../store/store";
import axios from "axios";

function AI() {
  const [prompt, setPrompt] = useState("");
  const accessToken = usebackendStore((state) => state.accessToken);
  console.log(accessToken);
  const [outputs, setOutputs] = useState([]);
  const send = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "GET",
        url: `${baseUrl}/gemini/chat`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        params: { prompt },
      };

      const response = await axios.request(options);
      console.log(response);
      // const response = await axios.get(`${baseUrl}/gemini/chat`, {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      //   data: { prompt },
      // });
      // console.log(response);
      // setOutputs(response);
    } catch (error) {
      console.error(error.response);
    }
  };
  return (
    <>
      <header className="flex items-center justify-between px-8 py-4 border-b-2">
        <div>
          <img width={140} height={61.5} alt="logo" src="/images/logo.svg" />
        </div>
        <div id="searchInput">
          <InputBox placeholder="search" />
        </div>
        <DropdownMenu />
      </header>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex flex-col justify-end flex-1">
          {outputs}
          {setOutputs}
          {/* {outputs &&
            outputs.map((output) => (
              <div className="p-4">
                <p>{output.text}</p>
              </div>
            ))} */}
        </div>
        <div className="flex gap-x-4 gap-y-4">
          <div className="flex flex-1 flex-col gap-2">
            <input
              className="p-4 border-2 transition-colors ease-in border-neutral rounded-lg focus:border-primary outline-none"
              placeholder="Enter Prompt"
              name="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          <button className="btn-primary px-4" onClick={send}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}
export default AI;
