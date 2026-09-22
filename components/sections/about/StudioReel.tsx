// "use client";

// import { useEffect, useRef, useSyncExternalStore } from "react";
// import Image from "next/image";
// import { Container } from "@/components/common/Container";
// import { SectionTitle } from "@/components/common/SectionTitle";
// import { ScrollReveal } from "@/components/animations";
// import { cultureValues } from "@/data/team";
// import { gsap, ScrollTrigger } from "@/lib/gsap";
// import { cn } from "@/lib/utils";

// function subscribeReducedMotion(onChange: () => void) {
//   const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
//   mql.addEventListener("change", onChange);
//   return () => mql.removeEventListener("change", onChange);
// }

// function getReducedMotionSnapshot() {
//   return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
// }

// function getReducedMotionServerSnapshot() {
//   return false;
// }

// // Each item dwells, then steps to the next over STEP_DURATION.
// const DWELL = 1.2;
// const STEP_DURATION = 0.6;

// interface ReelItem {
//   image: string;
//   title: string;
//   description: string;
// }

// // Real studio photography paired with the same culture values ValuesGrid
// // spells out further down the page -- show it here, say it there.
// const reel: ReelItem[] = [
//   { image: "/assets/images/about/about1.jpg", ...cultureValues[0] }, // Innovation
//   { image: "/assets/images/about/about2.jpg", ...cultureValues[3] }, // Growth
//   { image: "/assets/images/about/about3.jpg", ...cultureValues[2] }, // Transparency
//   { image: "/assets/images/about/about4.jpg", ...cultureValues[1] }, // Quality
// ];

// const count = reel.length;
// // One extra clone of the first item appended, so the filmstrip can step
// // straight through it and snap back to 0 invisibly -- same trick as the
// // horizontal marquees (TechStrip/ServicesStrip) duplicating their list.
// const slides: ReelItem[] = [...reel, reel[0]];

// export function StudioReel() {
//   const reducedMotion = useSyncExternalStore(
//     subscribeReducedMotion,
//     getReducedMotionSnapshot,
//     getReducedMotionServerSnapshot
//   );

//   const sectionRef = useRef<HTMLElement>(null);
//   const filmstripRef = useRef<HTMLDivElement>(null);
//   const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const textRefs = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     if (reducedMotion) return;

//     const section = sectionRef.current;
//     const filmstrip = filmstripRef.current;
//     if (!section || !filmstrip) return;

//     const ctx = gsap.context(() => {
//       const mm = gsap.matchMedia();

//       mm.add({ isDesktop: "(min-width: 1024px)" }, (context) => {
//         const { isDesktop } = context.conditions as { isDesktop: boolean };
//         if (!isDesktop) return undefined;

//         gsap.set(filmstrip, { yPercent: 0 });
//         bgRefs.current.forEach((el, i) => el && gsap.set(el, { opacity: i === 0 ? 1 : 0 }));
//         textRefs.current.forEach(
//           (el, i) => el && gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 12 })
//         );

//         const period = DWELL + STEP_DURATION;
//         const slotPercent = 100 / slides.length;

//         const tl = gsap.timeline({ repeat: -1, paused: true });

//         for (let i = 0; i < count; i += 1) {
//           const nextIndex = (i + 1) % count;
//           const startTime = i * period + DWELL;

//           tl.to(filmstrip, { yPercent: -slotPercent * (i + 1), duration: STEP_DURATION, ease: "power3.inOut" }, startTime);
//           tl.to(textRefs.current[i], { opacity: 0, y: -12, duration: STEP_DURATION * 0.7 }, startTime);
//           tl.to(
//             textRefs.current[nextIndex],
//             { opacity: 1, y: 0, duration: STEP_DURATION * 0.7 },
//             startTime + STEP_DURATION * 0.15
//           );
//           tl.to(bgRefs.current[i], { opacity: 0, duration: STEP_DURATION }, startTime);
//           tl.to(bgRefs.current[nextIndex], { opacity: 1, duration: STEP_DURATION }, startTime);
//         }

//         // Final dwell on the cloned (wrapped) slide, then snap back to slide 0
//         // at the exact moment the timeline repeats -- invisible since the
//         // clone is pixel-identical to the real slide 0.
//         tl.set(filmstrip, { yPercent: 0 }, count * period + DWELL);

//         const trigger = ScrollTrigger.create({
//           trigger: section,
//           start: "top 75%",
//           end: "bottom 25%",
//           onEnter: () => tl.play(),
//           onEnterBack: () => tl.play(),
//           onLeave: () => tl.pause(),
//           onLeaveBack: () => tl.pause(),
//         });

//         return () => {
//           trigger.kill();
//           tl.kill();
//         };
//       });
//     }, section);

//     return () => ctx.revert();
//   }, [reducedMotion]);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative overflow-hidden border-t border-ah-muted/10 py-section-sm md:py-section"
//     >
//       {/* Ambient blurred backdrop -- always matches whatever photo is active in the viewer below. */}
//       <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
//         {reel.map((item, i) => (
//           <div
//             key={item.image}
//             ref={(el) => {
//               bgRefs.current[i] = el;
//             }}
//             className="absolute inset-0 opacity-0"
//           >
//             <Image
//               src={item.image}
//               alt=""
//               fill
//               sizes="100vw"
//               className="scale-150 object-cover blur-[48px] saturate-125 brightness-75"
//             />
//           </div>
//         ))}
//         <div className="absolute inset-0 bg-ah-bg/45" />
//       </div>

//       <Container className="relative">
//         <SectionTitle
//           eyebrow="Our Culture"
//           title="What it's like inside the studio."
//           description="The values that run every engagement, in the room where they actually happen -- the reel below cycles through them on its own."
//           size="display"
//           className="mb-14"
//         />

//         {/* Desktop: the viewfinder card, filmstrip + synced corner text */}
//         <div className="relative mx-auto hidden aspect-[16/10] w-full max-w-3xl overflow-hidden rounded-2xl border border-ah-border bg-ah-surface lg:block">
//           <div
//             ref={filmstripRef}
//             className="absolute inset-x-0 top-0"
//             style={{ height: `${slides.length * 100}%` }}
//           >
//             {slides.map((item, i) => (
//               <div
//                 key={`${item.image}-${i}`}
//                 className="relative w-full"
//                 style={{ height: `${100 / slides.length}%` }}
//               >
//                 <Image
//                   src={item.image}
//                   alt={item.title}
//                   fill
//                   sizes="(min-width: 1024px) 768px, 0px"
//                   priority={i === 0}
//                   className="object-cover"
//                 />
//               </div>
//             ))}
//           </div>

//           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

//           {reel.map((item, i) => (
//             <div
//               key={item.image}
//               ref={(el) => {
//                 textRefs.current[i] = el;
//               }}
//               className={cn(
//                 "pointer-events-none absolute inset-0 flex flex-col justify-between p-6 md:p-8",
//                 i === 0 ? "opacity-100" : "opacity-0"
//               )}
//             >
//               <div className="flex items-start justify-between">
//                 <span className="text-label font-medium uppercase tracking-[0.2em] text-white/80">
//                   Our Culture
//                 </span>
//                 <span className="text-label font-medium text-white/80">
//                   {String(i + 1).padStart(2, "0")}
//                 </span>
//               </div>
//               <div className="flex flex-col gap-1">
//                 <span className="font-heading text-2xl font-semibold text-white md:text-3xl">
//                   {item.title}
//                 </span>
//                 <span className="max-w-md text-sm text-white/70 md:text-base">{item.description}</span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Mobile/tablet: calm static stack, no autoplay */}
//         <div className="flex flex-col gap-6 lg:hidden">
//           {reel.map((item, i) => (
//             <ScrollReveal
//               key={item.image}
//               as="div"
//               delay={i * 0.08}
//               className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-ah-border"
//             >
//               <Image src={item.image} alt={item.title} fill sizes="100vw" className="object-cover" />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
//               <div className="absolute inset-0 flex flex-col justify-between p-5">
//                 <div className="flex items-start justify-between">
//                   <span className="text-label font-medium uppercase tracking-[0.2em] text-white/80">
//                     Our Culture
//                   </span>
//                   <span className="text-label font-medium text-white/80">
//                     {String(i + 1).padStart(2, "0")}
//                   </span>
//                 </div>
//                 <div className="flex flex-col gap-1">
//                   <span className="font-heading text-xl font-semibold text-white">{item.title}</span>
//                   <span className="max-w-md text-sm text-white/70">{item.description}</span>
//                 </div>
//               </div>
//             </ScrollReveal>
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// }
