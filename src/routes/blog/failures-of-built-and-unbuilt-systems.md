---
title: Failures of Built and Unbuilt Systems
date: "2030-01-01"
tags:
  - tech
  - meta
---

As a software engineer I found it intuitive to describe the nature of a system after being described its constraints. These types of blank sheet design sessions are rare. Most systems are designed inside of organizations that already have systems "in production".

This means as a designer or architect you have not only the constraints of the system you are designing but the additional constraints of the other systems and organization inside which you are working. Inside of any organization there are three types of software systems. Essential, Necessary, and Vestigial.

## Essential

These are the money makers. These are the systems that people get woken up in the middle of the night to fix. Emails get sent to customers. Even with a formal review process, people two or three levels above you show up and at your desk to "chat" about what happened last week end when the system was down for an hour. In most orgs these are less than 20% of all the software systems that the organization runs. More like its less than 10%.

These are the systems that set the standards inside of the organization. The quality bars, the deployment cadence, the software architecture, the technology stack, the hosting providers. The particular patterns and needs of these systems set the tone for the organization.

## Necessary

These follow the lead of the Essential. They are the following 80% of systems that must exist to stay in business, and to support the Essential. On their own they are not special. The might be better implemented using someother technology, framework or hosting provider. But they don't produce enough value to warrant that attention. Instead, good enough really is.

## Vestigial

These are systems that should probably be deprecated or sunset, but the incremental cost doesn't rise to the capital cost to replace. They are the "bete noirs" of a software organization. Nobody likes dealing with them but you can't find an ROI arguement for why you should stop or migrate to something else.

## Actually there are 4 kinds

We all have a bias towards what exists. It is hard to focus on the negative space. In software we think of the systems we have in production. We rarely discuss the systems that we didn't build because the ROI case coultdn't be made. We don't talk about the systems that we never talked about because Marketing just assumed it was impossible, or operations couldn't imagine there was a way to build.

If the previous system compose 100% then the unbuilt must include another 50-100% of software systems.
