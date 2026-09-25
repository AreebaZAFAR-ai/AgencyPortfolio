import Image from "next/image";
import type { TeamMember } from "@/data/types";

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div className="group flex w-40 shrink-0 flex-col items-center gap-5 text-center sm:w-48 lg:w-56">
      <div className="relative aspect-square w-full overflow-hidden rounded-full ring-1 ring-ah-border transition-[box-shadow] duration-500 group-hover:ring-ah-ink/50">
        <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.08]">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="(min-width: 1024px) 224px, (min-width: 640px) 192px, 160px"
              draggable={false}
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-ah-ink/[0.05]">
              <span className="font-heading text-[clamp(2rem,3.5vw,3rem)] text-ah-ink/70">
                {member.initials}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-heading text-body font-semibold text-ah-ink/80 transition-colors duration-300 group-hover:text-ah-ink">
          {member.name}
        </span>
        <span className="text-caption text-ah-muted">{member.role}</span>
      </div>
    </div>
  );
}
