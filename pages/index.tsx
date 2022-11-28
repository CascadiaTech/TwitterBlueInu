import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import HeaderComponent from "../components/Header/HeaderComponent";
import "tailwindcss-elevation";
import FooterComponent from "../components/Footer/FooterComponent";
import DualCardComponent from "../components/DualCards/DualCardComponent";
import ScrollpositionAnimation from "../hooks/OnScroll";
import { useEffect, useState } from "react";
import "@uniswap/widgets/fonts.css";
import { useWeb3React } from "@web3-react/core";
import { SwapWidget, darkTheme, lightTheme, Theme } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from "@ethersproject/providers";
const Home: NextPage = () => {
  const { account, chainId, active } = useWeb3React();
  const showConnectAWallet = Boolean(!account);
  const context = useWeb3React();
  const { library } = context;
  const [uniswaprovider, setuniswapprivder] = useState();
  const Runeaddress = "0xc68a4c68f17fed266a5e39e7140650acadfe78f8";

  useEffect(() => {
    async function setProvider() {
      if (account) {
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        return provider;
      } else {
        return;
      }
    }

    async function ScrollpositionAnimation() {
      const targets = document.querySelectorAll(".js-show-on-scroll");
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
          // Is the element in the viewport?
          if (entry.isIntersecting) {
            // Add the fadeIn class:
            entry.target.classList.add("motion-safe:animate-fadeIn");
          } else {
            // Otherwise remove the fadein class
            entry.target.classList.remove("motion-safe:animate-fadeIn");
          }
        });
      });
      // Loop through each of the target
      targets.forEach(function (target) {
        // Hide the element
        target.classList.add("opacity-0");

        // Add the element to the watcher
        observer.observe(target);
      });
      ScrollpositionAnimation();
    }
    setProvider().then((result) => setuniswapprivder(result as any));
  }, [account]);

  const jsonRpcUrlMap = {
    1: ["https://mainnet.infura.io/v3/fc5d70bd4f49467289b3babe3d8edd97"],
    3: ["https://ropsten.infura.io/v3/<YOUR_INFURA_PROJECT_ID>"],
  };

  return (
    <div className="">
      <main className={styles.main}>
        <header>
          {" "}
          <HeaderComponent></HeaderComponent>
        </header>

        <p
          style={{ fontFamily: "Orbitron" }}
          className="mt-12 text-4xl sm:text-4xl text-4xl text-center text-gray-100 md:text-4xl lg:text-5xl"
        >
          Most Spectacular Title
        </p>

        <p className={"my-4"}></p>

        <div className={"flex flex row"}>

          <div className={"flex flex col"}>
            <div
              style={{
                background:
                  "linear-gradient(135deg, #E10000 0%, #AE0000 50%, #730707 100%)",
              }}
              className={
                "animate-waving-hand border rounded-xl justify-center text-center w-84 h-fit py-40 px-40 mx-10 sm:px-10 md:px-40"
              }
            ></div>
          </div>
          <div className={"flex flex col"}>
            <div
              style={{
                background:
                  "linear-gradient(135deg, #E10000 0%, #AE0000 50%, #730707 100%)",
              }}
              className={
                "border rounded-xl justify-center text-center w-84 h-fit py-40 px-40 mx-10 sm:px-10 md:px-40"
              }
            ></div>
          </div>

        </div>

        <div
          className={
            "flex flex-col mx-auto justify-center self-center px-6 text-center mt-10 mb-10 md:mt-0 md:mb-0"
          }
        >
          {uniswaprovider ? (
            <>
              <div className={"w-100% h-120%"}>
                <div
                  className={
                    "flex flex-col content-center text-center justify-center"
                  }
                >
                  <h5
                    style={{ fontFamily: "Orbitron, sans-serif" }}
                    className="text-center my-6 text-2xl sm:text-2xl md:text-3xl mx-6 text-gray-100 dark:text-white"
                  >
                    Purchase Marsereum here to become a member <br /> start
                    propsing and voting on certain matters within <br />
                    The Marsereum Decentralized Autonomous Organization
                  </h5>
                  <div className="Uniswap mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
                    <SwapWidget
                      theme={darkTheme}
                      width={"100%"}
                      jsonRpcUrlMap={jsonRpcUrlMap}
                      provider={uniswaprovider}
                      defaultOutputTokenAddress={Runeaddress}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={"flex flex col justify-center"}>
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, #E10000 0%, #AE0000 50%, #730707 100%)",
                  }}
                  className={
                    "border rounded-xl justify-center text-center w-1/2 h-fit py-10 px-6 mx-10 sm:px-10 md:px-10"
                  }
                >
                  <p
                    className="text-center text-2xl sm:text-2xl md:text-3xl text-gray-100"
                    style={{ fontFamily: "Orbitron, sans-serif" }}
                  >
                    Please connect wallet to purchase
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <FooterComponent></FooterComponent>
    </div>
  );
};

export default Home;

//style={{ background: 'linear-gradient(135deg, #E10000 0%, #AE0000 50%, #730707 100%)' }}
