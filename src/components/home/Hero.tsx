
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <div className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-10 md:mb-0 md:max-w-xl">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
              Hi, I'm Juan Herreros
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
              <div className="bg-background rounded-md p-6">
                <h2 className="text-lg font-semibold mb-2 text-foreground">Latest Updates</h2>
                <ul className="space-y-3">
                  <li className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">New Blog Post:</span> Building a Modern Cloud Infrastructure
                  </li>
                  <li className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Recent Talk:</span> Building Internal Developer Platforms at KubeCon
                  </li>
                  <li className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Open Source:</span> Contributing to Kubernetes SIG Docs
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
