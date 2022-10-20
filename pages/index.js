import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [address, setAddress] = useState(null);
  const [accBalance, setAccBalance] = useState(0);
  const [showUI, setShowUI] = useState(false);
  const handleOnClick = () => {
    let account;
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        setShowUI(true);
        account = accounts[0];
        setAddress(account);
        ethereum
          .request({ method: "eth_getBalance", params: [account, "latest"] })
          .then((result) => {
            let wei = parseInt(result, 16);
            let balance = wei / 10 ** 18;
            setAccBalance(balance);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Head>
        <title>Metamask connect</title>
        <meta
          name="description"
          content="This is website to connect to metamask wallet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col justify-center items-center h-[75vh]">
        <button
          onClick={handleOnClick}
          className="flex space-x-4 items-center p-3 bg-orange-200 rounded-lg hover:bg-orange-300"
        >
          <img src="/metamask-logo.svg" alt="metamask-logo" className="w-10" />
          <p>Connect to Metamask</p>
        </button>
        {showUI ? (
          <div className="mt-8">
            <p className="text-lg font-semibold">
              Address: <span className="font-normal">{address}</span>
            </p>
            <p className="text-lg font-semibold">
              Balance: <span className="font-normal">{accBalance} ETH</span>
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
