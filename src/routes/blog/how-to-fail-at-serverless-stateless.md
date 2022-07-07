---
title: 'How to Fail at Serverless: Serverless is Stateless'
date: "2022-07-09"
tags:
  - How to Fail at Serverless
  - tech
  - serverless
---

This blog series is a extended version of talk I gave at [Serverless Days NYC 2022](https://nyc.serverlessdays.io/). The goal is to share ways that a "friend of mine" has failed at serverless to help level up the community. Just as the transportation industry shares accident report analysis with the whole industry to improve safety, we in the software community need to do the same. This is my attempt to do that.

I'm sure there is some product X that has feature Y that fixes issue Z. I either didn't know about it at the time, didn't have budget, couldn't get it through vendor/security review or they didn't comply with enterprise architecture's plan for our product roadmap. As some guy said once: You go to production with the tools you have not the tools you want.

Note:

- Names have been changed to protect the innocent and not so innocent.
- Only egos (and wallets) were harmed by the failures recounted here.

## Contents

## Serverless is Stateless

All the architecture posts talk about Stateless computing and serverless. How serverless is so scalable because it spins up new instances to satisfy increased load. This all made sense. Lambda was like a big thread pool in the sky. I could set some parameters to manage the maximum and minimum number of threads and AWS would handle all the hard work of hosting, spinning up, spinning down and networking the instances together. Awesome-sauce.

Well not quite...

## Use Case

Background job that receives batches (10's-100's) of PDFs from the client, splits them apart into individual pages (1-1000 per PDF) and does analysis on each page. The load is lumpy coming from the client and response is measured in hours. This feels like a perfect HelloWorld use case for StepFunctions doing orchestration and Lambda doing image manipulation.

Lambda logic:

1) Invoke with S3 path to file
1) Read 10+mb files from S3 to /tmp
1) Process file
1) Write results to S3
1) Respond with S3 path to transformed file
1) Serverless FTW!

Everything works great until... inconsistent out of disk space errors, or no space left on device.

## How to Fail

### Problem

Periodically a step function run will fail due to a Lambda invoke failing on no space left on device (or similar depending on os and language). Running the same file in dev/test doesn't reproduce the error. Re-running the step function in production succeeds.

### Solution

Well Lambda instance have a writable `/tmp` folder where you can store temporary files. And somewhere in the AWS docs they describe how instances of your Lambda function are reused between invocations.

Some quick googling gets you a solution of clearing `/tmp` at the start and/or end of each invocation [#stackoverflow-ftw](https://stackoverflow.com/questions/44108712/aws-lambda-release-tmp-storage-after-each-execution). Till that fix makes it to production you can just re-execute any failed step function runs.

