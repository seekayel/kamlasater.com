---
layout: post
title: "Book Notes: How to Create a Mind"
categories: book
---

# [How to Create a Mind: The Secret of Human Thought Revealed][amazon-link]
Author: Ray Kurzweil

This feels like an update to Kurzweil's continuing series of books on how the singularity is coming. Some of the book is even devoted to defending his record of prediction of the Law of Accelerating Returns (LOAR), as well as refuting critics. These parts of the book were of the least interest to me.

# The New Hotness (to me)
What was new to me, and of greatest interest was the portion of the book (first half?) that dealt with descriptions of the latest discoveries in:

- Neuroscience
- Speech recognition
- Artificial vision


# The Neocortex as Repeated "Module"
One of the key concepts presented in the book was the algorithm for the neocortex as encoded by the genome. The neocortex is formed by about 500,000 neocortical columns. These columns contain roughly 60,000 neurons each. This column structure is approximately 2mm tall and 0.5mm wide. This columnar structure contains ~600 pattern recognizers (100 neurons each). This sets a brain wide total of pattern recognizers at 300 million.

The routing between these columns/recognizers takes place on a regular grid like structure of neurons that two distant pattern recognizers would use connect. Kurzweil compares this information routing system to Crossbar routing layouts in integrated circuits including FPGAs. He states that there are on the order of one quadrillion (10^15) connections in the neocortex. Assuming these connections were between recognizers, this would imply that average fan-in to a recognizer was roughly 1,600 connections and the average fan-out was the same.

Given 4 bytes to address a recognizer and 1 byte to define the connection weight the routing matrix of a simulated brain would consume 500GB. How the 100 neurons of a recognizer were wired and weighted would be in addition to this.

# HHMM - Hierarchical Hidden Markov Models
A large portion of the book was based on Kurzweil's experience working on natural language processing, either written or spoken. The primary tools used to crack these challenges were HHMMs using genetic algorithms to design the structure and "god variables".

This section was a learning edge for me. I feel comfortable'ish with Markov models/chains. Hidden Markov Models sorta make sense but HHMM were the next level that I don't yet have my head around. One quote from the book that encourages me is from John von Neumann, "No one understands mathematics, they just get used to it."


# End Notes
It wasn't till about halfway through the book that I noticed the extensive end notes. The book is peppered with references to seminal research papers and longer descriptions of concepts covered in the main text. In a 282 page book the end notes cover 36 pages. They were valuable enough of a resource that I scanned them into Evernote so I can refer back to the links and research paper references.


[amazon-link]: http://www.amazon.com/How-Create-Mind-Thought-Revealed/dp/0143124048


