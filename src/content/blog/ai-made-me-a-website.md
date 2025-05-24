---
title: AI made me a website
slug: "ai-made-me-a-website"
date: "2025-05-24"
author: Juan Herreros Elorza
excerpt: I have re-done this website with the help of an AI toll
tags: ["AI", "LLM", "Web"]
---

I have had this website to keep my CV and a small blog since I first built it almost five years ago, as part of the [Cloud Resume challenge](https://juanherreros.com/blog/the-cloud-resume-challenge). Other than adding a few posts and talks, I had not made many changes to it, so I thought it was time for a new look.

I was looking at new Gatsby templates as well as other frameworks, like Hugo. But then I thought: What if instead of using a template, I just use an LLM-based service? After all, creating a static website is a fairly simple task, and the idea of telling an AI to change this or that element, and seeing it change without having to go through all that hassle myself sounded very appealing.

So I started “vibe coding”. I decided to use [Lovable](https://lovable.dev/) because I find it provides the best user experience (at least among the ones I’ve tried) and because it tries to fix errors without counting those as prompts (you get 5 free prompts a day, so that’s very handy). And hey, it’s European (based in Stockholm).

This was my initial prompt:

```
I want to create my personal website. I'm a Platform Engineer, now turned Engineering Manager, and I'd like to showcase what I can do to anyone that wants to check.

The website will be hosted at juanherreros.com, and should include (at least):

- A blog
- A page showing the talks I have delivered at different events in the last years, including videos where available (maybe a picture for those that I don't have a video)
- My CV
- Links to my GitHub and LinkedIn profiles
- Anything else you may deem necessary/relevant

The page should have a modern look, use shades of green and have light/dark modes.

I need to be able to easily edit the CV, blog, etc using only markdown. It would be great if I can add more sections in a simple way too.
```

This was the initial result (as you can see, it already looks very similar to the final version):

![New web](/new-web.png)

It even included some talks it found on youtube, made up a CV, wrote some blog posts… just on one prompt, it looked pretty good! I was not particularly happy with the dark mode, though, and I was able to refine it by passing it a screenshot of a website which was using the palette I was more or less looking for. It understood the picture, and changed the colors of my dark mode. I was very, very happy with the AI website builder until here.

At that point, I needed some minor changes, but I thought I was ready to bring the real content of my website to my new version of it. I connected Lovable to Github and started doing that, and that’s when I noticed something odd: I was adding my markdown files with the contents of my blog, I had removed the ones the LLM had written… and still, the ones being displayed were the old posts. I started investigating how that could happen (looking at the source code, so it’s probably fair to say at this point I stopped vibe coding) and I noticed that the AI was cheating: It had introduced the contents of the 3 blog posts it had written as markdown files, but those were not used at all. Instead, the content of those had been duplicated, verbatim, on a different file.

So I tried to fix that:

```
The content of the blog is not picked from the markdown files in src/content/blog, but rather from src/data/blogPosts.ts. Fix that so that the source of truth is the src/content/blog folder.

I also want to be able to write the resume in markdown.
```

Now, that turned out to be a much more challenging task for the AI. The next few iterations couldn’t even build, and I found myself clicking the “Fix it” button again and again, hoping for the best. Eventually, I managed, and what helped here was looking at the errors individually, instead of asking it to fix all of them at once.

However, even when the website was functional again, I still wouldn’t get the content of my blogposts displayed correctly. Now, this is arguably a worse situation to be in, because, since this is this incorrect functionality but not an error coming from the code, every attempt to fix it is counted as a prompt (and again, in the free plan I only get 5 per day, so they are very scarce).

It took a while, but eventually I got it to load all the content from those markdown files, for the blog and the CV. I also got it to fix some other minor issues I found. Sometimes, I found myself giving it several things to fix at once, which probably didn’t help… however I tried to get the most out of those 5 daily prompts. For example:

```
There are 3 errors:

1. On all blogposts, dates are shown as today - The date indicated in the markdown is not correctly loaded
2. Tags are not loaded (at least not displayed) for blogposts
3. On the home page, the “recent talks” section displays the 2 oldest talks, instead of the 2 newest ones
```

All in all, the experience was fun! There are some parts of it that felt frustrating and where I had to look at the source code, but for most of it AI was able to build the site I wanted just following my prompts. Again, this is just a very simple static website, so I remain a bit skeptical of the feasibility of vibe coding anything bigger, at least the possibility of doing that from just one of these services.

For those more complex cases, the way to go is probably to combine these with different models or tools, but even then, I think it might take a while until we just need prompts.

Thanks for reading the post, I hope you found it interesting!
