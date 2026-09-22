// import { teamMembers } from "@/data/team";
// import { Container } from "@/components/common/Container";
// import { SectionTitle } from "@/components/common/SectionTitle";
// import { PlaceholderMedia } from "@/components/common/PlaceholderMedia";
// import { ScrollReveal } from "@/components/animations";

// export function TeamGrid() {
//   return (
//     <section className="border-t border-ah-muted/10 py-section-sm md:py-section">
//       <Container>
//         <SectionTitle eyebrow="Team" title="The people doing the work." size="display" className="mb-14" />
//         <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
//           {teamMembers.map((member, index) => (
//             <ScrollReveal key={member.name} as="div" delay={(index % 4) * 0.05} className="flex flex-col gap-4">
//               <PlaceholderMedia variant="avatar" initials={member.initials} className="h-20 w-20" />
//               <div>
//                 <h3 className="font-heading text-base font-semibold text-ah-ink">{member.name}</h3>
//                 <span className="text-sm text-ah-muted">{member.role}</span>
//               </div>
//               <div className="flex flex-wrap gap-1.5">
//                 {member.skills.map((skill) => (
//                   <span key={skill} className="rounded-full border border-ah-muted/20 px-2.5 py-1 text-xs text-ah-muted">
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </ScrollReveal>
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// }
