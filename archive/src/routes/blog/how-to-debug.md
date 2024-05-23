---
title: How to Debug
date: "2022-06-08"
tags:
  - tech
---
We all hit bugs that feel impossible to diagnose. The hardest ones to debug are intermittent or inconsistent. How do I fix what works sometimes? If a line of code always breaks then the fix is direct. The system is linear. The action leads to a failure.

How do I debug a bug that is intermittent? How do I debug something that works sometimes?

Here are some reminders to myself next time I encounter a baffling debugging session.

## Contents

## Choose Learning

My greatest learnings come from debugging. This bug is an opportunity for me to learn more about this system. If I already knew what was causing the problem then I wouldn't have a bug. The fact that I have a bug that isn’t obvious to me on how to fix, by definition means I have a chance to learn.

The system is giving me the gift of the chance to learn.

Choose to take the opportunity to learn.


## Chase the Error

Answer the question: "how do I make this fail every single time?"

Instead of continuing to make the system work. Instead make the system fail. Go straight at the error. Maximize it. Increase the error rate. Trigger the error repeatedly.

Focus on driving the error rate to 100%. Only then can I be sure any success is from my action and not inconsistency.

Make predictions to test my understanding: "The system will fail, now (pushes button)"


## Simplify

Once I can create the error on demand, I isolate. I begin simplifying the steps to trigger. Remove steps or hard code responses. Trim excess complexity not needed to cause error.

If it takes 6 steps to reproduce, try turning each one off in order.

Find the minimum degrees of freedom to still reproduce the error.


## Assess the Inverse

Reminder: the error is not caused by something I understand. Look explicitly for areas where I assume the system is working.

What are the parts of the system that I am sure are working? What if they weren’t working as I expected? Verify the components are actually working as I expect.

Reminder: It’s not what we don’t know that gets us into trouble, it is what we know for sure that isn't true


## Devise a Conclusive Measure

Brainstorm what report, measure, logging or data would definitely tell me what is causing the error. Maybe this won't tell me “why” the error is happening, but point me closer to "where" the error is being caused.

Question: What piece of information would conclusively tell me what the problem was?


## Take a Break

I might be making things worse. If I don’t know what causes the error I don’t know if I’m making it worse. If the situation allows for it, take a break.

Get some air. Go for a walk. Breath.

A clear relaxed mind is open for new ideas.

Sleep on it. Pick it up tomorrow.

## Explain How to Reproduce

Say it out loud.

Talk to myself.

Explain the steps to reproduce.

Start at the beginning.

Back up three steps and explain again.

Slower this time.

## Summary

Hopefully this helps you debug an issue you are struggling with. If you have other techniques or improvements to these let me know: twitter.com/seekayel

For those who jump to the end, here is the tldr:

1. Choose Learning
1. Chase the Error
1. Simplify
1. Assess the Inverse
1. Devise a Conclusive Measure
1. Take a Break
1. Explain How to Reproduce
