
import { TalkList } from "@/components/talks/TalkList";
import { talks } from "@/data/talks";
import { useMemo } from "react";

const Talks = () => {
  // Sort talks by date, newest first
  const sortedTalks = useMemo(() => {
    return [...talks].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-6 text-primary">Talks & Presentations</h1>
        <p className="text-foreground">
          A collection of my talks, presentations, and workshops at conferences and meetups.
        </p>
      </div>
      
      <TalkList talks={sortedTalks} />
    </div>
  );
};

export default Talks;
