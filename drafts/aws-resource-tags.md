---
title: AWS Resource Tags
date: "2022-10-03"
tags:
  - AWS
  - engineering
  - cloudformation
---

AWS is incredibly powerful. Their products are awesome. Their ability to execute is unparallelled.

Their ability to fumble the ball so completely in some areas is also breath taking. Tagging is one of those features.

The concept is simple, each resource can have user defined keys and values applied to them. These values are then available where ever meta data about those resouces are available. These include:
- IAM policies (ABAC: Attribute Based Access Control)
- billing / usage reports

These tags get created through:
- Console
- API/CLI
- CloudFormation

