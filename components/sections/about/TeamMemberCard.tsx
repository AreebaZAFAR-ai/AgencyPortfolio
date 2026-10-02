import Image from "next/image";
import type { TeamMember } from "@/data/types";

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div className="group flex w-40 shrink-0 flex-col items-center gap-5 text-center sm:w-48 lg:w-56">
      <div className="relative aspect-square w-full overflow-hidden rounded-full ring-1 ring-border-subtle transition-[box-shadow] duration-500 group-hover:ring-text-secondary">
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
            <div className="flex h-full w-full items-center justify-center bg-surface">
              <span className="font-display text-[clamp(2rem,3.5vw,3rem)] text-text-secondary">
                {member.initials}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-display text-body font-semibold text-text-primary transition-colors duration-300 group-hover:text-text-primary">
          {member.name}
        </span>
        <span className="text-small text-text-secondary">{member.role}</span>
      </div>
    </div>
  );
}
