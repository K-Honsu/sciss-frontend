import { usebackendStore } from "../../store/store";
import InputBox from "../../components/common/InputBox";
import React from "react";
import DropdownMenu from "../../components/common/DropdownMenu";
import { Pencil, Trash2, Copy } from "lucide-react";
import { useAuthenticatedLinks } from "../../hooks/useGetLinks";
import { DeleteLink } from "../../hooks/useDelete";
import { CreateLink } from "../../hooks/useCreateLink";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import styles from "./styles/styles.module.css";
import Modal from "../../components/modals/qrCode";
function Dashboard() {
  const accessToken = usebackendStore((state) => state.accessToken);
  const MemoizedPaginatedItems = React.memo(PaginatedItems);
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [alias, setAlias] = useState("");
  const { createLink } = CreateLink();
  const { links, loading, error } = useAuthenticatedLinks(
    accessToken,
    searchQuery
  );
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAliasChange = (e) => {
    setAlias(e.target.value);
  };

  const handleCreateLink = () => {
    createLink(url, description, alias);
  };

  return (
    <>
      {/* <AuthHeader /> */}
      <header className="flex items-center justify-between px-8 py-4 border-b-2">
        <div>
          <img width={140} height={61.5} alt="logo" src="/images/logo.svg" />
        </div>
        <InputBox placeholder="search" onChange={handleSearchInputChange} />
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
        <div className="flex flex-col -order-1 col-span-2 py-8 px-8 overflow-x-hidden">
          <h1 className="text-dark-600 text-4xl font-bold mb-8">
            Active Links
          </h1>
          <div className="flex-col flex-1 flex gap-4" id="link-post">
            <MemoizedPaginatedItems items={links} itemsPerPage={5} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

function Links({ currentItems }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedAlias, setSelectedAlias] = useState("");
  const { deleteLink } = DeleteLink();
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/analytics/${id}`);
  };

  const handleDeleteButton = (id) => {
    deleteLink(id);
  };

  const handleQRCodeClick = (alias) => {
    setSelectedAlias(alias);
    setShowModal(true);
  };

  const copyToClip = async (text) => {
    // Copy the text inside the text field
    await navigator.clipboard.writeText(text);

    // Alert the copied text
    toast("Copied to clipboard", {
      position: "top-center",
      type: "success",
      autoClose: 3000,
    });
  };

  return (
    <>
      {currentItems.length === 0 ? (
        <b>No Link Shortened yet</b>
      ) : (
        currentItems.map((link) => (
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
                <p className="text-neutral-500 text-sm">
                  {link.url.length > 40
                    ? link.url.substring(0, 55) + "..."
                    : link.url}
                </p>
                <div className="flex items-center">
                  <a
                    href={link.alias}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p className="text-neutral-500 text-sm">
                      Shortened Link: <u>{link.alias}</u>
                    </p>
                  </a>
                  <button onClick={() => copyToClip(link.alias)}>
                    <Copy size={15} className="ml-2" />
                  </button>
                </div>
                <p className="text-neutral-500 text-sm">
                  Created {link.created_at}
                </p>
              </span>
            </span>
            <span className="flex flex-col gap-y-4">
              <button className="btn-sm" onClick={() => handleClick(link.id)}>
                View analytics
              </button>
              <button
                className="btn-sm"
                onClick={() => handleQRCodeClick(link.alias.split("/").pop())}
              >
                QR Codes
              </button>
              <div className="flex gap-11">
                <button onClick={() => handleDeleteButton(link.id)}>
                  <Trash2 />
                </button>
                <button>
                  <Pencil />
                </button>
              </div>
              {showModal && (
                <Modal
                  onClose={() => setShowModal(false)}
                  alias={selectedAlias}
                />
              )}
            </span>
          </div>
        ))
      )}
    </>
  );
}

function PaginatedItems({ items, itemsPerPage }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Links currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className={styles.pagination}
        previousClassName={styles.previous}
        nextClassName={styles.next}
        disabledClassName={styles.disabled}
        activeClassName={styles.selected}
      />
    </>
  );
}
