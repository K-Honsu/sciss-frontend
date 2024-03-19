import AuthHeader from "./header";
import { toast } from 'react-toastify';
function Dashboard() {
  const copyToClip = (text) => {
     // Copy the text inside the text field
    navigator.clipboard.writeText(text);
  
    // Alert the copied text
    toast("Copied to clipboard", {position: "top-center", type: "success", autoClose: 3000})
  } 
  return (
    <>  
      <AuthHeader />
      <div className="overflow-hidden h-full flex-1 grid grid-cols-3 [&>*]:border-primary-100 [&>*]:border-2 [&>*]:-m-[1px] -mt-[2px]">
        <aside className="p-8">
          <h1 className='text-dark-500 text-xl font-semibold pb-4'>Create new link</h1>
          <div>
            <div className='flex flex-col gap-y-4'>
              <div className='flex flex-col gap-2'>
                <span>Paste URL</span>
                <input className='p-4 border-2 transition-colors ease-in border-neutral rounded-lg focus:border-primary outline-none' placeholder='https://www.a-really-long-url/to-short' name='url' />
              </div>
              <div className='flex flex-col gap-2'>
                <span>Enter a back-half<span>(optional)</span></span>
                <input className='p-4 border-2 transition-colors ease-in border-neutral rounded-lg focus:border-primary outline-none' placeholder='https://www.a-really-long-url/to-short' name='url' />
              </div>
              <button className="btn-primary">Create Link</button>
              
            </div>
          </div>
        </aside>
        <div className="-order-1 col-span-2 py-8 px-8 overflow-x-hidden">
          <h1 className="text-dark-600 text-4xl font-bold mb-8">Active Links</h1>
          <div className="flex-col flex gap-4">
            {Array.from({length: 30}, (i) => i + 1).map(() => {
              return (
                <div className="p-4 border-2 flex justify-between rounded-lg hover:bg-neutral-100 transition-colors gap-x-4">
                  <span className="px-2 flex flex-col justify-between mr-auto">
                    <h2 className="py-2 text-dark-500 text-3xl font-semibold">Portfolio link</h2>
                    <span>
                      <p className="text-neutral-500 text-sm">https://myportfolio.com</p>
                      <p className="text-neutral-500 text-sm">Created 15th, February, 2024</p>
                    </span>
                  </span>
                  <span className="flex flex-col justify-around">
                    <span className="w-8 h-8 block p-1 hover:bg-neutral-200 rounded-lg" title="copy url" onClick={() => copyToClip("https://myportfolio.com")}>
                      <img className="w-full h-full object-contain" src="icons/dashboard/copy.png"/>
                    </span>
                    <span className="w-8 h-8 block p-1 hover:bg-neutral-200 rounded-lg" title="view QR">
                      <img className="w-full h-full object-contain" src="icons/dashboard/qr-code.png"/>
                    </span>
                  </span>
                  <span className="flex flex-col gap-y-4">
                    <button className="btn-sm">View analytics</button>
                    <button className="btn-sm-2">Configure</button>
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;