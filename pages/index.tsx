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
import { abiObject } from "../contracts/abi.mjs";
import TwitterBlueInu from "assets/images/TwitterBlueInu.png";
import "@uniswap/widgets/fonts.css";
import { useWeb3React } from "@web3-react/core";
import { SwapWidget, darkTheme, lightTheme, Theme } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import Swal from "sweetalert2";
import { BigNumber } from "@ethersproject/bignumber";
import { formatEther, parseEther } from "@ethersproject/units";

const Home: NextPage = () => {
  const { account, chainId, active } = useWeb3React();
  const showConnectAWallet = Boolean(!account);
  const context = useWeb3React();
  const [loading, setLoading] = useState(false);
  const { library } = context;
  const [pendingreflections, setpendingreflections] = useState(Number);
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

    async function PendingReflections() {
      try {
        setLoading(true);
        const abi = abiObject;
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const contractaddress = "0x103b603D95F769a8184c1e7cd49c81Bc826aB6E8"; // "clienttokenaddress"
        const contract = new Contract(contractaddress, abi, provider);
        const rewardToken = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
        const Reflections = await contract.withdrawableDividendOf(
          account,
          rewardToken
        ); //.claim()
        //const FinalReflections = BigNumber.from(Reflections)
        // const test = formatEther(String(Reflections))
        const finalnumber = Number(Reflections);
        setpendingreflections(finalnumber);
        console.log(Reflections);

        return finalnumber;
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    PendingReflections();
    setProvider().then((result) => setuniswapprivder(result as any));
  }, [account]);

  async function Claim() {
    if (!account) {
      Swal.fire({
        icon: "error",
        title: "Connect Your Wallet to Claim Your Reflections",
        timer: 5000,
      });
    }
    if (pendingreflections <= 0) {
      Swal.fire({
        icon: "error",
        title: "Currently You Do Not Have Any Reflections",
        timer: 5000,
      });
    }
    try {
      setLoading(true);
      const abi = abiObject;
      const provider = new Web3Provider(
        library?.provider as ExternalProvider | JsonRpcFetchFunc
      );
      const signer = provider.getSigner();
      const contractaddress = "0x103b603D95F769a8184c1e7cd49c81Bc826aB6E8"; // "clienttokenaddress"
      const contract = new Contract(contractaddress, abi, signer);
      const ClaimTokens = await contract.claim(); //.claim()
      const signtransaction = await signer.signTransaction(ClaimTokens);
      const Claimtxid = await signtransaction;
      console.log(Claimtxid);

      return Claimtxid;
      /////
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  function formatMoney(n: any) {
    return '$ ' + (Math.round(n * 100) / 100).toLocaleString()
  }
  function numberWithCommas(num: any) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  function insertDecimal(num: any) {
    return Number((num / 1000000).toFixed(3))
  }
  console.log(insertDecimal(pendingreflections))
  const test2 = insertDecimal(pendingreflections)
  const formattedBalance = numberWithCommas(test2)

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
          <p className={"my-4"}></p>
        <p
          style={{ fontFamily: "Merriweather" }}
          className="mt-4 text-4xl drop-shadow-lg sm:text-4xl text-4xl text-center text-gray-100 md:text-4xl lg:text-5xl"
        >
          Twitter Blue INU
        </p>

        <p className={"my-4"}></p>

        <div className={"mx-10 flex flex col justify-center"}>
          <Image
            className={'rounded-full'}
            src={TwitterBlueInu}
            alt="fire"
          ></Image>
        </div>

        <p className={"my-4"}></p>

        <div className={"justify-center"}>
          <div
            style={{
              background:
                "linear-gradient(135deg, #F7F7F7 0%, #C4C4C4 0%, #7C77C5 100%)",
            }}
            className={
              "border rounded-xl drop-shadow-lg justify-center text-center w-fit h-fit py-10 px-20 md:px-40 lg:px-60"
            }
          >
            <p style={{fontFamily: 'Merriweather'}} className={"self-center text-xl text-black"}>
              Pending Reflections
            </p>
            <div
              style={{ fontFamily: "Merriweather" }}
              className="text-gray-100 bg-gradient-to-r from-blue-700 to-blue-900 focus:ring-4
              focus:outline-none focus:ring-gray-300 justify-center rounded-xl text-xl px-3 py-3 text-center mr-2 mb-2 md:w-52 lg:w-64"
            >
              ${formattedBalance}  USDC
            </div>
          </div>
        </div>

        <p className={"my-4"}></p>

        <div className={"justify-center"}>
          <div
            style={{
              background:
                "linear-gradient(135deg, #F7F7F7 0%, #C4C4C4 0%, #7C77C5 100%)",
            }}
            className={
              "border rounded-xl drop-shadow-lg justify-center text-center w-fit h-fit py-10 px-20 md:px-40 lg:px-60"
            }
          >
            <p style={{fontFamily: 'Merriweather'}}
             className={"self-center text-xl text-black"}>Claim Reflections</p>
            <button
              onClick={() => Claim()}
              style={{ fontFamily: "Merriweather" }}
              type="button"
              className="text-gray-100 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-500 hover:to-blue-700 focus:ring-4
              focus:outline-none focus:ring-gray-300 rounded-lg text-xl px-3 py-3 text-center mr-2 mb-2 w-28 md:w-52 lg:w-64"
            >
              Claim
            </button>
          </div>
        </div>

        <div
          className={
            " mx-auto justify-center self-center px-6 text-center mt-10 mb-10 md:mt-0 md:mb-0"
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
                    style={{ fontFamily: "Merriweather" }}
                    className="text-center my-6 text-2xl sm:text-2xl md:text-3xl mx-6 text-gray-100 dark:text-white"
                  >
                    Purchase TwitterBlueInu here! <br />
                    Start earning reflections in USDC <br />
                    Use your reflections to purchase your first <br />
                    Twitter Blue Subscription
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
            <p className={'my-12'}></p>
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #F7F7F7 0%, #C4C4C4 0%, #7C77C5 100%)",
                }}
                className={
                  "border rounded-xl drop-shadow-lg justify-center text-center w-fit h-fit py-10 px-20 md:px-40 lg:px-60"
                }
              >
                <p style={{fontFamily: 'Merriweather'}} 
                className={"text-xl self-center drop-shadow-md text-black"}>
                  Please Connect Wallet to Purchase TwitterBlueInu
                </p>
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
