'use client';
import { AnimatePresence,motion } from 'framer-motion';import { useEffect,useState } from 'react';
const slides=['Welcome to MegaPrep','Admission Open 2026','Exam Routine Available'];
export default function Display(){const [i,setI]=useState(0);useEffect(()=>{const t=setInterval(()=>setI(v=>(v+1)%slides.length),5000);return()=>clearInterval(t)},[]);return <main className="h-screen w-screen bg-black text-white tv-safe-area"><AnimatePresence mode="wait"><motion.div key={i} className="h-full grid place-items-center text-6xl font-bold" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>{slides[i]}</motion.div></AnimatePresence></main>}
