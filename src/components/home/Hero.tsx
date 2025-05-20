
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Hero() {
  return (
    <div className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-10 md:mb-0 md:max-w-xl">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
              Hi, I'm Juan
            </h1>
            <p className="text-xl text-muted-foreground">
              Platform Engineering Manager with a passion for building high-performing teams 
              and scalable, developer-friendly infrastructure.
            </p>
            <div className="mt-8 flex gap-4">
              <Button asChild>
                <Link to="/blog">Read My Blog</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/resume">View My Resume</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-2/5">
            <div className="bg-gradient-to-br from-green-200 to-green-400 dark:from-green-700 dark:to-green-900 p-1 rounded-lg shadow-lg">
              <div className="aspect-square w-full overflow-hidden rounded-md bg-background">
                <Avatar className="h-full w-full rounded-md">
                  <AvatarImage 
                    src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                    alt="Juan Herreros" 
                    className="object-cover h-full w-full" 
                  />
                  <AvatarFallback className="text-4xl h-full w-full">JH</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
