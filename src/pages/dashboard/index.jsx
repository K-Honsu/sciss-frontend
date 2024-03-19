import { usebackendStore } from "../../store/store";
import InputBox from "../../components/common/InputBox";
import DropdownMenu from "../../components/common/DropdownMenu";
import { useAuthenticatedLinks } from "../../hooks/useGetLinks";
import { CreateLink } from "../../hooks/useCreateLink";
import AuthHeader from "./header";
import { useState, useEffect } from "react";

function Dashboard() {
  const accessToken = usebackendStore((state) => state.accessToken);
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [alias, setAlias] = useState("");
  const { createLink } = CreateLink();
  const { links, loading, error } = useAuthenticatedLinks(accessToken);
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAliasChange = (e) => {
    setAlias(e.target.value);
  };

  const handleCreateLink = () => {
    createLink(url, description, alias);
  };

  useEffect(() => {
    const searchInput = document.getElementById(".searchInput");
    const linkPosts = document.querySelectorAll(".link-post");

    const handleSearchInput = () => {
      const searchValue = searchInput.value;
      console.log({ search: searchValue });

      linkPosts.forEach((linkPost) => {
        const linkDescription = linkPost
          .querySelector(".link-description")
          .textContent.toLowerCase();
        const linkUrl = linkPost
          .querySelector(".link-url")
          .textContent.toLowerCase();
        const linkAlias = linkPost
          .querySelector(".link-alias")
          .textContent.toLowerCase();

        if (
          linkDescription.includes(searchValue) ||
          linkUrl.includes(searchValue) ||
          linkAlias.includes(searchValue)
        ) {
          linkPost.style.display = "block";
        } else {
          linkPost.style.display = "none";
        }
      });
    };

    if (searchInput) {
      // Ensure searchInput is not null before adding event listener
      searchInput.addEventListener("input", handleSearchInput);

      return () => {
        searchInput.removeEventListener("input", handleSearchInput);
      };
    }
  }, [links]);
  return (
    <>
      {/* <AuthHeader /> */}
      <header className="flex items-center justify-between px-8 py-4 border-b-2">
        <div>
          <img width={140} height={61.5} alt="logo" src="/images/logo.svg" />
        </div>
        <div id="searchInput">
          <InputBox placeholder="search" />
        </div>
        <DropdownMenu />
      </header>
      <div className="overflow-hidden h-full flex-1 grid grid-cols-3 [&>*]:border-primary-100 [&>*]:border-2 [&>*]:-m-[1px] -mt-[2px]">
        <aside className="p-8">
          <h1 className="text-dark-500 text-xl font-semibold pb-4">
            Create new link
          </h1>
          <div>
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-2">
                <span>Description</span>
                <input
                  className="p-4 border-2 transition-colors ease-in border-neutral rounded-lg focus:border-primary outline-none"
                  placeholder="Description for your link"
                  name="url"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <span>Paste URL</span>
                <input
                  className="p-4 border-2 transition-colors ease-in border-neutral rounded-lg focus:border-primary outline-none"
                  placeholder="https://www.a-really-long-url/to-short"
                  name="url"
                  value={url}
                  onChange={handleUrlChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <span>
                  Enter a back-half<span>(optional)[alias]</span>
                </span>
                <input
                  className="p-4 border-2 transition-colors ease-in border-neutral rounded-lg focus:border-primary outline-none"
                  placeholder="https://www.a-really-long-url/to-short"
                  name="url"
                  value={alias}
                  onChange={handleAliasChange}
                />
              </div>
              <button className="btn-primary" onClick={handleCreateLink}>
                {loading ? "Creating Link..." : "Create Link"}
              </button>
              {error && <p>Error: {error}</p>}
            </div>
          </div>
        </aside>
        <div className="-order-1 col-span-2 py-8 px-8 overflow-x-hidden">
          <h1 className="text-dark-600 text-4xl font-bold mb-8">
            Active Links
          </h1>
          <div className="flex-col flex gap-4" id="link-post">
            {links.map((link) => (
              <div
                key={link.id}
                className="p-4 border-2 flex justify-between rounded-lg hover:bg-neutral-100 transition-colors"
                id="link-post"
              >
                <span className="px-2 flex flex-col justify-between">
                  <h2 className="py-2 text-dark-500 text-3xl font-semibold">
                    {link.description}
                  </h2>
                  <span>
                    <p className="text-neutral-500 text-sm">{link.url}</p>
                    <p className="text-neutral-500 text-sm">{link.alias}</p>
                    <p className="text-neutral-500 text-sm">
                      Created {link.created_at}
                    </p>
                  </span>
                </span>
                <span className="flex flex-col gap-y-4">
                  <button className="btn-sm">View analytics</button>
                  <button className="btn-sm-2">Configure</button>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
