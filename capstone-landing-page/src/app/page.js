"use client"
import React from "react";
import Image from "next/image";
import { Button } from '@nextui-org/button';
import { SparklesCore } from "../components/ui/sparkles";
import { HoverEffect } from "../components/ui/card-hover-effect";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "../components/ui/canvas-reveal-effect";
import { WavyBackground } from "../components/ui/wavy-background";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-12 lg:p-24">
      <div className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        <h1 className="md:text-4xl text-xl lg:text-6xl font-bold text-center text-white relative z-20">
          No.1 동아리 운영 플랫폼
        </h1>
        <div className="w-[40rem] h-40 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Core component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>


          <div className="flex flex-row justify-center">
            <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </span>
              <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                <span>
                  신청하기
                </span>
                <svg
                  fill="none"
                  height="16"
                  viewBox="0 0 24 24"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.75 8.75L14.25 12L10.75 15.25"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 mb-40">
        <HoverEffect items={services} />
      </div>

      <div className="py-12 lg:py-20 flex flex-col lg:flex-row items-center justify-center bg-black w-full gap-10 mx-auto px-8">
        <Card title="Free Plan" des="desasdasd">
          <CanvasRevealEffect
            animationSpeed={5.1}
            containerClassName="bg-emerald-900"
          />
        </Card>
        <Card title="Starter Plan" des="desasdasd">
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-black"
            colors={[
              [236, 72, 153],
              [232, 121, 249],
            ]}
            dotSize={2}
          />
          {/* Radial gradient for the cute fade */}
          <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
        </Card>
        <Card title="Pro Plan" des="desasdasd">
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-sky-600"
            colors={[[125, 211, 252]]}
          />
        </Card>
      </div>

      <div className="relative max-sm:mt-52">
        <WavyBackground className="max-w-4xl mx-auto pb-20">
          <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
            지금 바로 신청하세요.
          </p>
          <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
            The all-in-one platform for clubs and organizations. Simplify event management, streamline communication, and grow your membership.
          </p>
        </WavyBackground>
      </div>
    </main>
  );
}

export const services = [
  {
    title: "부원 관리",
    description:
      "동아리 부원을 관리하세요. 부원 목록을 한눈에 보고 정리하세요. 부원 등록, 삭제, 정보 업데이트. 부원 연락처 관리 기능.",
  },
  {
    title: "문의 관리",
    description:
      "동아리 부원들과 대학생들의 QnA를 관리자 콘솔에서 손쉽게 관리하세요. 질문 등록 및 답변 모듈.",
  },
  {
    title: "가입 관리",
    description:
      "기존에 구글폼과 엑셀을 사용한 불편한 가입 관리는 그만. 하나의 플랫폼에서 손쉽게 동아리 부원을 모집하세요. 커스텀 신청서 제작 및 공유 기능. 신규 부원 수락 및 거절 기능.",
  },
  {
    title: "일정 관리",
    description:
      "동아리 임원진들과 간편하게 일정을 조율하세요. 동아리 일정 저장 및 공유 기능.",
  },
  {
    title: "과제 관리",
    description:
      "동아리 과제를 관리하세요. 과제 생성 및 제출 기능.",
  },
  {
    title: "자동화 시스템",
    description:
      "동아리 일정 출석 관리 및 과제 확인 자동화 기능을 사용하세요.",
  },
];

export const Icon = ({ className, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

const Card = ({
  title,
  des,
  children,
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-white/[0.2] group/canvas-card flex items-center justify-center  max-w-sm w-full mx-auto p-4 relative h-[30rem] relative"
    >
      <Icon className="absolute h-6 w-6 -top-3 -left-3 text-white" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-white" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 text-white" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-white" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20">
        <h2 className="dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
          {title}
        </h2>
        <div className="dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
          {des}
        </div>
      </div>
    </div>
  );
};