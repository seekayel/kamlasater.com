---
title: Using Slack as an Searchable Event Stream Database
date: "2024-02-01"
tags:
  - tech
  - startups
---

<img
  alt="Slack Search Results"
  src="/posts/slack-search-redacted.jpg"
  width="550px"
>

# Using Slack as an Searchable Event Stream Database

When building a startup I rarely have the time to build software in the way I think of as correct. In these situations I find particular pleasure when simple solutions can be “good enough”. Best yet is when one of these solutions holds up to increasing numbers of users, employees and use cases. One pattern that manages all of these is using Slack as a searchable event stream DB.

This solution ticks all the boxes for me. It is simple to start using since slack is one of the first integrations built by most SaaS products. Adding new employees is easy as access control is delegated to Slack’s user management. I can start with notifications on then turn them down as activity ramps up. New third party systems can be added by adding additional channels. Historical search is enabled by channel filtering and selecting a decent message format.

Here is how I have set up my searchable DB. I have used this pattern in teams up to about 50. With 10’s of channels per environment and hundreds of thousands of events per year for several years.


## Channel naming
Include environment then source and a suffix. For example: `#prod-stripe-events`, `#test-website-events` or `#dev-support-events`. This groups all channels first by the source environment. It also labels the channel as an event stream. A good rule of thumb is a single channel for each type system. Remember you can rename channels so better to spend time on the message format.

Message formats: 
The best messages are useful as both an actionable notification and a searchable event record. At minimum this means including the primary identifier from the source system of the actor that generated the event, some statement of what the event was and a link to more information about that event.

The best messages overload the slack sender name, sender icon and a brief snippet that fits into a mobile notification. After that the message can be more verbose with links to the event or links relevant to that user in other systems.

For example a user signup message could look like this:

```
${name} New Signup ${id}
user: github|${github_id}
email: xxx@gmail.com
github: https://github.com/xxxxx
mixpanel: https://mixpanel.com/project/123/view/123/app/profile#distinct_id=${id}
stripe: https://dashboard.stripe.com/search?query=xxx%40gmail.com
```

If possible I would recommend adding any secondary identifiers or additional links for research and response. Links directly to any internal systems allows for easier navigation and processing from mobile. 


## Usage
In the early phase of building a product I leave notifications on for these channels as almost nothing is happening. When something does happen (demo request, user signup, customer purchase or event item added to cart) the team and I can get notified immediately. At this stage it is possible for reactions to be used to indicate if one team member has taken action. A great slack search is  `-hasmy::white_check_mark after:2024-02-01 in:#prod-user-events "review"`. This lets you search for messages in a channel with certain words that you haven’t processed yet. This is helpful for driving simple workflows or making sure items get processed while giving visibility to the team.

## Examples
- Search by a customer’s email to see when they first signed up with links to their mixpanel customer, customer.io profile, when they purchased and links to their stripe customer record, stripe subscription record and internal product page.
- Have a channel of items to review (perhaps some type of spam or abuse), the messages can contain links to the content, user, and take action. After taking action react with same emoji. This is a handy way to be able to operate easily from mobile.

Let me know if you have tried this and how it has worked out for you on your teams.
