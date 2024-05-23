---
title: 'Why I Started Cyclic'
slug: 'why-i-started-cyclic'
summary: 'Choosing to start a company is a combination of an analytical and subjective decision. Commitment is required by both your head and your heart.'
date: "2021-06-23"
authors: [kam]
tags: [cyclic]
image: ./cyclic-logo-original.png
---
![Cyclic Logo (original)](./cyclic-logo-original.png)

At my last company we had a micro-services architecture. We also focused on recruiting developers who were smart and dedicated, but not yet experienced. When they started we would task them to add some new functionality. This would require on the order of perhaps 20 to 50 lines of business logic.

However this would require 500 to 1000 lines of infrastructure code. Between project setup, framework config and infrastructure as code yaml, the actual purpose of the service was drowned out. The gearing ratio was all wrong.

When these developers went to build and deploy, they would encounter more troubles. If you have ever worked with AWS you will know that CloudFormation is not known for the predictability or clarity of its errors. If you have worked with API Gateway and Lambda you will know how quickly you can get lost in a dark thicket of abstractions and frameworks, each blurring and bending into the the next.

Even when the infrastructure would provision without error the call paths and observability was lacking. The infinite power combined with the lack of knowledge of where to start reminded me of staring at the blinking command prompt the first time I loaded linux. "Something is happening in here, I just don't know how or where"

I believe as experienced engineers we too often default to expecting those coming behind us to spend their time learning the same lessons we learned. Instead I want to clear the way for not yet experienced developers to go beyond what I have been able to accomplish. To do this we need new tools. And we need a new abstraction.

Our vision is a world where you write your hello world on your local and then publish it in a way the whole world can use it immediately. No where in that process do you size servers or design fail-over health checks. Instead you just worry about what you want to say.

‍

‍
