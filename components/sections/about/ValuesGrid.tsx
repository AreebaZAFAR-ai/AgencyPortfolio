// import { cultureValues } from "@/data/team";
// import { Container } from "@/components/common/Container";
// import { SectionTitle } from "@/components/common/SectionTitle";
// import { ScrollReveal } from "@/components/animations";

// export function ValuesGrid() {
//   return (
//     <section className="border-t border-ah-muted/10 py-section-sm md:py-section">
//       <Container>
//         <SectionTitle eyebrow="Culture" title="What we hold ourselves to." size="display" className="mb-14" />
//         <div className="flex flex-col">
//           {cultureValues.map((value, index) => (
//             <ScrollReveal
//               key={value.title}
//               as="div"
//               delay={index * 0.08}
//               className="flex flex-col gap-2 border-t border-ah-muted/10 py-6 md:flex-row md:items-baseline md:gap-8"
//             >
//               <span className="font-heading text-lg text-ah-muted md:w-12">
//                 {String(index + 1).padStart(2, "0")}
//               </span>
//               <h3 className="font-heading text-h3 font-semibold text-ah-ink md:w-56">{value.title}</h3>
//               <p className="max-w-lg text-ah-muted">{value.description}</p>
//             </ScrollReveal>
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// }
