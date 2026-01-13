---
date: 2026-01-13
title: Crawl Walk Run
slug: crawl-walk-run
authors: [kam]
tags: []
image: ./crawl-walk-run.png
---

![Description of the image](./crawl-walk-run.png)


 Everyone wants an agent that can do the work at their company. An agent that specializes in their problem domain. The trouble is there's no manual on how to generically build an agent that can solve their problems. This [presentation on cyber security](https://docs.google.com/presentation/d/1D1gWFuT6AT3kLOqM1xl5YHKPvAhJh-VW) presents a framework that can work under any business domain. Crawl Walk, then Run.

 I've seen it work and am excited to go through the process again.

<!-- truncate -->


## Crawl

> No training data, no evals, optimize agent scaffolding against a handful of examples, ship based on vibes.

Speed and ease of iteration is the only metric that matters. Aim for daily or twice daily tweaks making it to production. I have been surprised how far this can go in creating an agent that performs well on 90%+ of tasks.


## Walk

> No fine tuning, but good, statistically significant evals so engineers can hill climb and compare results.

During the crawl phase begin collecting samples of desirable traces. I've been surprised by what even 25-50 examples can do to give a rough baseline. I have also experimented with using simulation for this step. In that case even being able to describe the expected behavior to allow an LLM to judge the results was helpful directionally.


## Run

> Continuously refreshed annotated production data, online A/B testing, just like mature AI organizations do for mature capabilities.

I haven't reached this mountain top but it is the clear target out on the horizon. As an extension I can imagine using something like Modern Portfolio Theory to balance between a collection of agent configs.
