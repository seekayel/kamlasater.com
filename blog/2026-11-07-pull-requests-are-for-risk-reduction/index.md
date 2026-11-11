---
date: 2026-11-07
title: Pull Requests are for Risk Reduction
slug: pull-requests-are-for-risk-reduction
authors: [kam]
tags: [engineering, ai]
---

I've been programming long enough to remember code review before pull requests. Review was looking over a colleague's shoulder. Or sitting in a meeting while someone walked through an architecture diagram and a few code blocks on a projector. Then everyone went back to their desks and every commit was a YOLO merge and a force push to main.

<!-- truncate -->

In that world most of the "review" happened in our rules of thumb. Keep modules small. Separate concerns. Hide implementation behind interfaces. Don't share mutable state. We called it clean, modular design, but what it really was is risk reduction. When something breaks in a small, well-bounded module, less breaks with it and it's easier to find.

GitHub pull requests made review a step in the workflow instead of an event on the calendar. Over time the PR turned into a ritual: a human reads every line and clicks approve. With AI writing a growing share of the code, that ritual doesn't scale. I can generate more diff in an afternoon than I can carefully read in a week. So it's worth going back to first principles. What is the PR actually for?

## The cost of a defect

Every defect has a cost. I think about it as three numbers multiplied together:

**Cost = Frequency × Severity × Duration**

- **Frequency**: how many times the bug is encountered
- **Severity**: how bad it is each time it's encountered
- **Duration**: how long it's left in production

A bug that hits every user but only misaligns a button is cheap. A bug that corrupts data once a month and goes unnoticed for a year is expensive. Because it's multiplication, shrinking any one term shrinks the whole thing.

## Who handles which term

CI/CD already does a good job on duration. Small changes, deployed often, with a fast rollback and someone watching the dashboards, means a bad change doesn't live in production very long. I've [written before](/blog/deploy-now) about why deploying often matters.

The PR is where we go after the other two. Before a change merges we want to lower how often it will fail and how bad it will be when it does. That's the job. Not "did a human read every line," but did we reduce the frequency and severity of the defects this change could introduce?

Framed that way, a human reading the diff is one tool among many. And we can build systems that do a lot more of the work.

## Techniques

Here's what I've been using, or have seen work:

**Unit tests.** Still the foundation. Cheap to run on every change, and an AI will happily write them for you. Which leads to the problem: who checks the tests?

**Mutation testing.** Change the code on purpose (flip a `>` to a `>=`, delete a line) and see if the tests fail. If they still pass, the tests weren't testing anything. This used to be too slow and noisy to bother with. When an AI is writing both the code and the tests, it's how you know the tests have teeth.

**Coverage.** Not as a number to hit, but as a map. Which paths did nothing exercise? That's where frequency hides.

**Adversarial code review through sub agents.** Spin up a separate agent whose only job is to break the change. Find the edge case, the race condition, the unhandled error. Then have another agent verify each finding so you aren't drowning in false positives.

**Blind review.** Give the reviewer the diff and the requirements, nothing else. No author conversation, no "here's what I was going for." A reviewer that sees the author's reasoning tends to agree with it. Same thing happens with people.

**Third-party code review tools.** A different model, built by a different team, with different blind spots. Diversity of reviewers is the point.

## Agentic validation

Tests check the code. Validation checks the behavior. Have an agent check out the branch, run the app, and actually use the feature. Click the buttons, hit the API, try the weird input. Then attach the evidence to the PR: screenshots, logs, the requests it made. The reviewer is now looking at proof that it works instead of a claim that it should.

## Agentic risk rating and mitigation

This is the part I'm most excited about. Not every PR deserves the same scrutiny. A copy change and a database migration shouldn't get the same review.

Have an agent read the change and rate its risk against the three terms:

- **Frequency**: how many users or code paths does this touch?
- **Severity**: what's the blast radius if it's wrong? Cosmetic, data loss, security, money?
- **Duration**: how fast would we notice, and how fast could we roll it back?

Then have it suggest mitigations. Put it behind a feature flag. Ship it to a canary. Add a test for this specific path. Split the migration from the code change. Add an alert.

Low risk changes go through on the automated checks. High risk changes get the scarce resource: a human who knows the system, focused on the parts that matter.

## The question changes

Review used to ask "is this code good?" The better question was always "what happens if this is wrong, and what have we done to make that smaller?" AI didn't change that. It just made it impossible to keep pretending that reading every line was the answer.
