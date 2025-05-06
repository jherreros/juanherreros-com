
import { TalkList } from "@/components/talks/TalkList";
import { talks } from "@/data/talks";

const Talks = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-6 text-primary">Talks & Presentations</h1>
        <p className="text-foreground">
          A collection of my talks, presentations, and workshops at conferences and meetups.
        </p>
      </div>
      
      <TalkList talks={talks} />
    </div>
  );
};

export default Talks;
