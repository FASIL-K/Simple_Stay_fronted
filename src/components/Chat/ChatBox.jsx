import React, { useState, useEffect, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  PaperAirplaneIcon,
  XMarkIcon,
  ChatBubbleLeftIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid";
// import chatIcon from "../../assets/image/chatIcon.png";
import { UserAxiosInstant } from "../../utils/axiosUtils";
import {jwtDecode} from "jwt-decode";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Typography } from "@material-tailwind/react";
import { Websocket } from "../../Constants/Constants";
import profile from"../../assets/profileavatar.png";

export default function ChatBox({ PostData }) {
  const [senderdetails, setSenderDetails] = useState({});
  const [recipientdetails, setRecipientDetails] = useState({});
  const [clientState, setClientState] = useState(null);
  const [messages, setMessages] = useState([]);
  const messageRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const { owner_detail } = PostData;

  const onClose = () => {
    setIsOpen(false);
  };

  const RecieverChat = async () => {
    try {
     
      setRecipientDetails({
        id: owner_detail.id,
        email: owner_detail.email,
        profile_image: owner_detail.profile_photo,
      });

      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      
      setSenderDetails({
        id: decoded.user_id,
        email: decoded.email,
      });

    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    RecieverChat();
  }, []);
   


  const onButtonClicked = () => {
    if (messageRef.current.value.trim() == "") {
      return;
    }
    clientState.send(
      JSON.stringify({
        message: messageRef.current.value,
        senderUsername: senderdetails.email,
        receiverUsername: recipientdetails.email,
      })
    );
    messageRef.current.value = "";
  };

  const setUpChat = () => {
    

    UserAxiosInstant
      .get(
        `chat/user-previous-chats/${senderdetails.id}/${recipientdetails.id}/`
      )
      .then((response) => {
        if (response.status === 200) {
          setMessages(response.data);
        }
      });

    const client = new W3CWebSocket(
      `${Websocket}${senderdetails.id}/?${recipientdetails.id}`
    );

    setClientState(client);
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log('Received message from server:', dataFromServer);
      if (dataFromServer) {
        const isNewMessage = !messages.some(
          (msg) => msg.message === dataFromServer.message
        );
 
        if (isNewMessage) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              message: dataFromServer.message,
              sender_email: dataFromServer.senderUsername,

            },
          ]);
         
          console.log('New message added to state:', dataFromServer.message);

        }
      }
    };

    client.onclose = (event) => {
      console.log("Websocket disconnected", event.reason);
    };

    return () => {
      client.close();
    };
  };

  useEffect(() => {
     if (senderdetails.id != null && recipientdetails.id != null) {
      setUpChat();
    }
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [senderdetails, recipientdetails]);
  
  


  return (
    <Fragment>
      <div>
        <button onClick={() => setIsOpen(!isOpen)}>
        <div className=" gap-3 cursor-pointer w-[15rem] h-12 bg-light-green-400 rounded-md flex justify-center items-center text-white mt-4 mr-8  ">
        <Typography>Message Owner</Typography>
        </div>
        </button>
        <Transition show={isOpen}>
          <Dialog
            as="div"
            className="fixed inset-0 flex items-center justify-center z-50"
            onClose={onClose}
          >
            <div className="w-96 h-108 bg-gray-50 rounded-lg shadow-lg">
              <div className="bg-black w-full h-14 rounded-t-lg">
                <div className="flex justify-between mx-4 text-white items-center">
                  <h2 className="text-2xl font-bold mt-3">Chat</h2>
                  <button onClick={onClose} className="mt-3">
                    <XMarkIcon className="w-6 h-6 text-white font-bold" />
                  </button>
                </div>
              </div>
              <div className="h-80 overflow-y-auto mt-4 p-4">
                   {messages.map((message, index) =>
                    senderdetails.email === message.sender_email ? (
                      <>
                        <div class="flex justify-end mb-2" key={index}>
                          <div class=" shadow  text-white  bg-[#262626] py-1 px-4 rounded-md max-w-xs">
                            {message.message}
                          </div>
                          <div className="rounded-full flex justify-center items-center -me-3 ms-2 w-10 h-10 ">
                            <img
                              src={
                                senderdetails.profile_image
                                  ? senderdetails.profile_image
                                  : profile
                              }
                              alt=""
                              className="rounded-full w-10 h-10"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div class="flex mb-2" key={index}>
                          <div className="rounded-full flex justify-center items-center -ms-4 me-1 w-10 h-10 ">
                            <img
                              src={
                                recipientdetails.profile_image
                                  ? recipientdetails.profile_image
                                  : ''
                              }
                              alt=""
                              className="rounded-full w-10 h-10"
                            />
                          </div>
                          <div class="shadow py-1 px-4  text-white bg-[#262626] rounded-md max-w-xs">
                            {message.message}
                          </div>
                        </div>
                      </>
                    )
                  )}
                </div>

              <div className="mt-4 flex mb-3 p-4">
                <input
                  type="text"
                  ref={messageRef}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-md focus:outline-none"
                />
                <button
                  onClick={onButtonClicked}
                  className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </Fragment>
  );
}
