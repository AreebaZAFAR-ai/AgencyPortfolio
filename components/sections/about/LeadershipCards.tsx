// import { leadership } from "@/data/team";
// import { Container } from "@/components/common/Container";
// import { SectionTitle } from "@/components/common/SectionTitle";
// import { PlaceholderMedia } from "@/components/common/PlaceholderMedia";
// import { ScrollReveal } from "@/components/animations";

// export function LeadershipCards() {
//   return (
//     <section className="border-t border-ah-muted/10 py-section-sm md:py-section">
//       <Container>
//         <SectionTitle eyebrow="Leadership" title="Meet the people leading AH Growth." size="display" className="mb-14" />
//         <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
//           {leadership.map((leader, index) => (
//             <ScrollReveal key={leader.name} as="div" delay={index * 0.1} className="flex flex-col gap-5">
//               <PlaceholderMedia variant="avatar" initials={leader.initials} className="h-24 w-24" />
//               <div>
//                 <h3 className="font-heading text-h3 font-semibold text-ah-ink">{leader.name}</h3>
//                 <span className="text-sm text-ah-muted">{leader.role}</span>
//               </div>
//               <p className="max-w-md text-ah-ink/85">{leader.bio}</p>
//             </ScrollReveal>
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// }
