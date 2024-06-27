---
title: AI Engineer Worlds Fair - Some Thoughts
description: 'Thoughts and Such'
date: "2024-06-27"
authors: [kam]
tags: [engineering, ai]
# image: ./tag-compatibility.jpeg
---

<!-- ![Tag compatibility grid](./tag-compatibility.jpeg) -->

Interesting conference vibes. There were a few really interesting people doing interesting things. There were also a whole raft of really ambitious people wanting to tell you about the product/company they were launching.

<!-- truncate -->

## LLMs only understand language

They can bring the whole weight of all cultural experience to bear. They can understand code better if variables are named `trailing_12_month_revenue_by_product` vs `revenue`. It lets them access all the other knowlege in the world about accounting and finance. You can also do this in prompts `write the script for a who done it where each function is a character. They should each suspect the others of being malicous and causing the program to fail`


## The cultural shift hasn't even started

We have reached the flat spot in the sigmoid for the adoption of mobile apps and using internet connected devices to interact and facilitate work. Visicalc was first published in 1979, Mosaic in 1993, first iPhone in 2007.

Would the company you work at, or your coworkers, be comfortable with:
- every zoom call being transcribed and placed in a searchable datastore.
- A notion page of the summary of any discussion being created.
- Any todo's or ideas for software changes being logged automatically to jira and Teams Tasks.
- Draft emails being created for any questions that you had from the meeting.
- An AI management coach suggesting that based on your calendar you haven't had 1-on-1's with half your team at an average of 0.8 / person / week
- Being told by an effectiveness coach that your communications with female colleges is more abrupt and domaneering than with male colleges.

All of these are possible now. Think if the work place is ready for them, legally, practically or socially.


## Source Code is becoming Disposable

The marginal value in knowing how to write a line of code is going to zero very quickly. This is making the skill of knowing what to write more valuable while the skill of knowing how to write software less valuable. I'm unclear if the knowing the why is changing in value.

We seem to be in an awkward transition between all source code being a generated artifact (ala compiled binaries) and the source code still being the highest order description of the system.


## Text is still the universal interface

The [Unix Philosophy](https://en.wikipedia.org/wiki/Unix_philosophy) really nailed it:

  > Write programs to handle text streams, because that is a universal interface.

Also in light of the ease of writing single use scripts via llms this also still rings true:

  > Use tools in preference to unskilled help to lighten a programming task, even if you have to detour to build the tools and expect to throw some of them out after you've finished using them.

I feel that I need to build out my commandline tooling/facility with llms and the text/prompt piping. One tool that I've found useful so far is [llm (cli for calling llms)](https://github.com/simonw/llm). Another technic is to slurp all the sub-files in a directory into the context and submit those as part of the prompt (hat tip to [Manuel Odendahl](https://github.com/wesen)).