import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import React, { useEffect } from "react";
import {FcGoogle} from "react-icons/fc";
import axios from "axios";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";

function login() {

  const router = useRouter();

  const [{userInfo, newUser}, dispatch] = useStateProvider();


  useEffect(() => {
    if(userInfo?.id && !newUser){
      router.push("/");
    }
  }, [userInfo, newUser])


  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const { 
      user: {displayName: name, email, photoUrl: profileImage} 
    } = await signInWithPopup(firebaseAuth, provider);
    
    try {
      if(email){
        const { data } = await axios.post(CHECK_USER_ROUTE, { email });
        
        if(!data.status){
          dispatch({
            type: reducerCases.SET_NEW_USER,
            newUser: true
          });
          dispatch({
            type: reducerCases.SET_USER_INFO, 
            userInfo:{
              name,
              email, 
              profileImage, 
              status: "",
            }
          });
          router.push("/onboarding");
        }
        else{
          const {id, name, email, profilePicture: profileImage, status} = data.data;
          dispatch({
            type: reducerCases.SET_USER_INFO, 
            userInfo:{
              id, 
              name, 
              email, 
              profileImage, 
              status,
            },
          });
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    }

  }

  return <div className="flex justify-center items-center bg-panel-header-background flex-col gap-6">
    <div className="flex items-center justify-center gap-2 text-white h-[70vh]">
      <Image
        src="/logo.png"
        alt="ChatappS&A"
        height={300}
        width={300}
      />
      <span className="text-7xl">ChatappS&A</span>
    </div>
    <button className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg" onClick={handleLogin}>
      <FcGoogle className="text-4xl"/>
      <span className="text-white text-2xl">Login with Google</span>
    </button>

    <div className="footer">
      <div className="left_footer">
        <Image
          src="/logo.png"
          alt="ChatappS&A"
          height={300}
          width={300}
        />
        <span className="text-5xl">ChatappS&A</span>
      </div>
      <div className="right_footer">
        <h3 className="pb-5 text-4xl">Contact Us</h3>
        <h4 className="pb-2">
          <a href="https://github.com/skrj-gh">
          <Image
            src="/github_icon.png"
            alt="Shubham's Github"
            height={50}
            width={50}
          />
          <span className="text-3xl">Shubham Kumar Jha</span>
          </a>
        </h4>

        <h4 className="pb-2">
        <a href="https://github.com/Blaster2398">
        <Image
            src="/github_icon.png"
            alt="Aryan's Github"
            height={50}
            width={50}
          />
          <span className="text-3xl">Aryan Patel</span>
        </a>
        </h4>

        <h4 className="pb-2">
          <a href="https://www.instagram.com/_shubh.krj04/">
          <Image
            src="/insta_icon.png"
            alt="Shubham's Insta"
            height={50}
            width={50}
          />
          <span className="text-3xl">Shubham Kumar Jha</span>
          </a>
        </h4>
        <h4 className="pb-2">
          <a href="https://www.instagram.com/satoru_gojo00001/">
          <Image
            src="/insta_icon.png"
            alt="Aryan's Insta"
            height={50}
            width={50}
          />
          <span className="text-3xl">Aryan Patel</span>
          </a>
        </h4>
        <h4 className="pb-2">
          <a href="shubhkarjha533@gmail.com">
        <Image
            src="/mail_icon.png"
            alt="Shubham's Mail"
            height={50}
            width={50}
          />
          <span className="text-3xl">Shubham Kumar Jha</span>
          </a>
        </h4>
        <h4 className="pb-2">
          <a href="aryanindian366@gmail.com">
        <Image
            src="/mail_icon.png"
            alt="Aryan's Mail"
            height={50}
            width={50}
          />
          <span className="text-3xl">Aryan Patel</span>
          </a>
        </h4>
      </div>
    </div>
  </div>;
}

export default login;
