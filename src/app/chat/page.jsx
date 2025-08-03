import { MdAttachment, MdSend } from "react-icons/md";
export default function Home() {
  return (
    <div className="">
        {/* This is Header */}
        <header className="h-20 dark:bg-gray-900 fixed w-full  flex justify-around items-center dark:border-gray-700 shadow border py-5 rounded-br-3xl" >
              {/* room id (later we might be adding room creator's name) */}
              <div>

                  <h1 className="text-xl font-semibold" >Room : <span>Family room</span></h1>

              </div>
              {/* UserName container */}
              <div>

                  <h1 className="text-xl font-semibold" >User : <span>Aditya</span></h1>

              </div>
              {/* button : leave room */}
              <div>

                  <button className="dark:bg-red-500 dark:hover:bg-red-700 px-3 py-2 rounded-full" >Leave Room</button>

              </div>
        </header>

        <main className="pt-20 border w-2/3 mx-auto dark:bg-slate-500 h-screen overflow-auto">
            <div>
              <h1>hi</h1>
            </div>
        </main>

        {/* This is to input message */}
        <div className="fixed bottom-4 w-full h-14" >
            <div className="pr-10 gap-4 h-full flex items-center justify-between rounded-full w-1/2 mx-auto dark:bg-gray-900" >

                <input type="text" placeholder="Type Your Message" className="w-full dark:bg-gray-800 dark:border-gray-600 px-5 py-2 rounded-full h-full focus:outline-none" />
                <div className="flex gap-1">
                  <button className="dark:bg-blue-600 flex justify-center items-center h-10 w-12 rounded-full " ><MdAttachment size={20} /></button>
                  <button className="dark:bg-green-600 flex justify-center items-center h-10 w-12 rounded-full " ><MdSend size={20} /></button>
                </div>
            </div>
        </div>
    </div>
  );
}
