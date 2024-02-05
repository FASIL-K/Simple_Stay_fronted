import React from "react";

function UserChat() {
  return (
    <div
      className="mx-auto flex justify-center items-center "
      style={{ overflowY: "auto" }}
    >
      <div className="border-black rounded-2xl shadow grid grid-cols-[20rem,1fr] w-full  ">
        <div className="border-e grid grid-rows-[5rem,1fr] bg-[#262626]  ">
          <div className="flex justify-center items-center">
            <div className=" border-b-2 bg-[#262626] w-full grid grid-cols-[2rem,1fr,2rem] mx-3  py-2  ">
              <div className="flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
              <div>
                <input
                  placeholder="Search"
                  type="text"
                  className="bg-transparent  w-full text-gray-800 placeholder-gray-700 text-sm focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div className="mx-4 ">
            <p className="font-bold text-white">Chat</p>
            <div className="bg-blue-gray-50 cursor-pointer rounded-xl my-3 grid grid-cols-[3.5rem,1fr,2rem]">
              <div className="rounded-full flex justify-center items-center my-1 ms-2 w-10 h-10">
                <img
                  src={""} // add default profile image here
                  alt=""
                  className="rounded-full h-10 w-10 border"
                />
              </div>
              <div className="flex justify-start items-center">
                <p className="text-gray-800 capitalize">John Doe</p>
              </div>
              <div>{""}</div>
            </div>
            {/* Add more static chat list items here */}
          </div>
        </div>
        {/* Chatting section */}
        <div className="grid grid-rows-[4rem,1fr]">
          <div className="border-black flex items-center bg-[#262626]">
            <div className="rounded-full flex justify-center items-center my-1 ms-6 w-10 h-10">
              <img
                src={""} // add recipient profile image here
                alt=""
                className="rounded-full h-10 w-10"
              />
            </div>
            <p className="ms-4 text-white font-bold capitalize">
              Recipient Name
            </p>
          </div>
          <div
            className="grid grid-rows-[1fr,4rem] relative"
            style={{
              backgroundImage:
                'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="p-10 overflow-auto h-[83vh]">
              {/* Add static messages here */}
            </div>
            <div className=" flex justify-center items-center ">
              <div className="w-full mx-5 grid grid-cols-[1fr,2rem] ">
                <div className=" bg-[#262626] py-2 rounded-full w-full px-4 relative">
                  <input
                    placeholder="Type a message"
                    type="text"
                    className="bg-transparent w-full text-white placeholder-gray-700 text-sm focus:outline-none"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-white cursor-pointer"
                    >
                      <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserChat;
