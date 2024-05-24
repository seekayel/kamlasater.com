---
title: 'AWS Tools Suck'
slug: 'aws-tools-suck'
summary: 'If you have ever worked with AWS as a developer then you will know what I mean, AWS tools suck. They suck so bad there is an entire industry focused on solving for this pile of suck.'
authors: [kam]
tags: [cyclic, aws]
image: ./tools.jpg
---

![Tools](./tools.jpg)

If you have ever worked with AWS as a developer then you will know what I mean, AWS tools suck. They suck so bad there is an entire industry focused on solving for this pile of suck. For just Infrastructure as Code, for example, there are Terraform, Pulumi and Serverless Framework. AWS is famous for "listening to customers". So what gives? Why do their tools still feel clunky, complex and riddled with infuriating edge cases?  

<!-- truncate -->

### tldr

You, the developer, are not the customer.

The longer answer is a combination of several factors. Here are my three reasons for why things are the way they are.


### Reason 1: AWS never was a developer tools company

AWS never won based on having the best experience or tooling. They offered one powerful value proposition, you could shorten your project lead time by using their services. You no longer need to do capacity planning for the number of disks (s3), servers (ec2) or network capacity (egregious egress). Oh, and they were fanatical about availability.


### Reason 2: AWS doesn't sell based on Dev Ex

AWS is growing at least as faster than the cloud market as a whole \[1\], yet they have below average developer experience. The only way that this can happen is if their customers are purchasing for reasons other than quality of developer tools. If the decision maker cared about developer experience why do they keep choosing AWS? The only reasonable answer is the person picking doesn't prioritize Dev Experience over some other attributes of the vendor (that is for another post).


### Reason 3: If AWS wanted it they would have it

Given the near 1 billion dollar a week capital expense annual run rate AWS was at in Q4 of 2020 \[2\], if it was of strategic importance for them to solve for better tooling they would. This is not a case of "not enough resources'', this is a case of the project not getting the internal priority to invest in improvement.


### Conclusion

AWS continues to grow despite having bad tooling and developer experience. If it impacted their sales they would make it a priority. If they made it a priority to have great tooling, they would have it. The only conclusion is: bad tooling isn't affecting their sales. Therefore, sales decisions aren't being made at the level or for the reasons that developer tooling changes the outcome.

Which means AWS tools will continue to suck for the foreseeable future.

  
\[1\] [https://techcrunch.com/2021/08/02/cloud-infrastructure-market-kept-growing-in-q2-reaching-42b/](https://techcrunch.com/2021/08/02/cloud-infrastructure-market-kept-growing-in-q2-reaching-42b/)

\[2\] [https://www.platformonomics.com/2021/03/follow-the-capex-oracle-fy21-q3-update/](https://www.platformonomics.com/2021/03/follow-the-capex-oracle-fy21-q3-update/)
