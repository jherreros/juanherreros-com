
import { Talk } from "@/lib/types";
import { TalkCard } from "./TalkCard";

interface TalkListProps {
  talks: Talk[];
}

export function TalkList({ talks }: TalkListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {talks.map((talk) => (
        <TalkCard key={talk.id} talk={talk} />
      ))}
    </div>
  );
}
