"use client";
import InvestorCard from "@/components/common/investorcard";
import ProfileEdit from "@/components/dashboard/ProfileEdit";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { walletAddressShortn } from "@/lib/actions";
import { userAtom } from "@/services/jotai/atom";
import { TInvestorDetails } from "@/types/common";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useAtom } from "jotai";
import Image from "next/image";
import React, { useState } from "react";
import { Address } from "viem";
import { useAccount } from "wagmi";
import UserLiquidity from "../profile/liquidity";
import ProfileBanner from "../profile/bannner";
import UserInvestments from "../profile/investment";
import UserRewards from "../profile/winnedrewards";
import Partners from "../profile/partners";
import { Button } from "../ui/button";
import { useWeb3Modal } from "@web3modal/wagmi/react";

type Props = {
  userInfo: TInvestorDetails;
  self: boolean;
};
enum ETab {
  Description,
  Pitches,
  Investments,
  Analytics,
}

const Dashboard = ({ userInfo, self }: Props) => {
  const [user] = useAtom(userAtom);
  const [showTab, setshowTab] = useState<ETab>(ETab.Description);
  const { address } = useAccount();
  const { open } = useWeb3Modal();
  if (!address) {
    return  <div className=" w-full min-h-screen flex justify-center items-center flex-col bg-black">
    <h1 className=" text-xl font-paps font-bold">
      To access detalks functionality you need to
    </h1>
    <Button
      className=" mt-4"
      onClick={() => {
        open();
      }}
    >
      Connect Wallet
    </Button>
  </div>
  }
  return (
    <main className=" w-full min-h-screen  flex flex-row flex-wrap  justify-evenly ">
      <ProfileBanner
        walletAddress={userInfo.walletAddress}
        bannerImage={"/content/tempo.png"}
        name={userInfo?.name}
        profileImage={userInfo?.image}
        discord={userInfo?.discord}
        twitter={userInfo?.twitter}
        bio={userInfo.bio}
        opensea={userInfo.opensea}
        self={true}
      />

      <div className=" flex w-full px-4 my-4 flex-row space-x-6">
        <button
          onClick={() => setshowTab(ETab.Description)}
          className={
            showTab === ETab.Description
              ? "text-white border-b border-white"
              : "text-gray-600"
          }
        >
          Description
        </button>
        <button
          onClick={() => setshowTab(ETab.Pitches)}
          className={
            showTab === ETab.Pitches
              ? "text-white border-b border-white"
              : "text-gray-600"
          }
        >
          Pitches
        </button>
        <button
          onClick={() => setshowTab(ETab.Investments)}
          className={
            showTab === ETab.Investments
              ? "text-white border-b border-white"
              : "text-gray-600"
          }
        >
          Investments
        </button>
        <button
          onClick={() => setshowTab(ETab.Analytics)}
          className={
            showTab === ETab.Analytics
              ? "text-white border-b border-white"
              : "text-gray-600"
          }
        >
          Analytics
        </button>
      </div>

      { showTab === ETab.Description ? (
        <>
        <UserLiquidity liquidity={userInfo.liquiditys} self={self}/>
        </>
      ): showTab === ETab.Investments ? (
        <div className=" w-full min-h-screen flex flex-col">
          {userInfo.investments[0] ? (
            <UserInvestments investment={userInfo.investments[0]} />
          ):(
            <div className=" w-full h-[400px] flex justify-center items-center flex-col">
             <Image src={"/content/empty.png"} width={400} height={400} alt="" className=" w-[400px] h-[300px]  object-contain rounded-2xl" />
              <h1> No Investment created yet</h1>
            </div>
          )}
          {/* <Partners investments={userInfo.}  /> */}
        </div>
      ): showTab === ETab.Pitches ? (
        <div className=" w-full min-h-screen flex flex-col">
          {userInfo.investments[0] ? (
            <UserInvestments investment={userInfo.investments[0]} />
          ):(
            <div className=" w-full h-[400px] flex justify-center items-center flex-col">
             <Image src={"/content/empty.png"} width={400} height={400} alt="" className=" w-[400px] h-[300px]  object-contain rounded-2xl" />
              <h1> Not pitched any investment</h1>
            </div>
          )}
          {/* <Partners investments={userInfo.}  /> */}
        </div>
      ) : (
        <div className=" w-full min-h-screen flex flex-col">
          {userInfo.campaigns.length > 1 ? (
            <UserRewards winned={userInfo.campaigns} />
          ):(
            <div className=" w-full h-[400px] flex justify-center items-center flex-col">
             <Image src={"/content/empty.png"} width={400} height={400} alt="" className=" w-[400px] h-[300px]  object-contain rounded-2xl" />
              <h1> Not winned any campaign to show analytics.</h1>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default Dashboard;
