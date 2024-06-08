---
title: "Adding Syntax Highlighting to Anki Flash Cards"
authors: [kam]
tags: [tech]
---
# What is [Anki][anki]?
Anki is an "intelligent" flash card system. When you review material it takes the "difficulty" you have in recalling the material. It uses this difficulty to predict when to review the material again. Thus material that you have already mastered is reviewed less frequently and material you are working on is brought back faster.

# So what?
In an effort to learn Ruby at a deeper level, inspired by [Derek Sivers][sivers], I downloaded his [Ruby Anki Deck][ruby-anki]. The deck includes 476 cards. By default [Anki][anki] gives you 20 cards to learn each day while mixing in old cards that are due for review. I found this a great way to be pushed to understand the language deeper.

# Card Format
One element of the [Anki][anki] system is that you can create HTML/CSS/JS formats for the cards that you are creating. I did run into one gotcha. The card template editor has different javascript loading behavior than the card review system.

Since I was trying to load external javascript to handle the code syntax highlighting via [highlite.js][highlight] I needed to install the [javascript boost][js-boost] plugin. To do this launch Anki, goto Menu > Tools > Add-ons > Browse & Install. Then just paste in the following code: `1280253613` Restart Anki and you should be rocking.

Next curl down the JS/CSS you are looking to use and place in the collection.media folder inside of: `~/Documents/Anki/{PROFILE_NAME}/collection.media/` Here is a great post with instructions on how to get any [external javascript working in Anki][external-js-anki]

# Card Template Front
~~~ html
<link rel="stylesheet" href="_external/highlight.js.min.css">
<script src="_external/highlight.js.min.js"></script>

<pre><code class="ruby">{{Front}}</code></pre>

<script>
hljs.initHighlightingOnLoad();
</script>
~~~

# Card Template Back
~~~ html
<link rel="stylesheet" href="_external/highlight.js.min.css">
<script src="_external/highlight.js.min.js"></script>
{{FrontSide}}

<hr id=answer>

<pre><code class="ruby">{{Back}}</code></pre>

<script>
hljs.initHighlightingOnLoad();
</script>
~~~

[anki]: http://ankisrs.net/
[sivers]: https://sivers.org
[ruby-anki]: https://sivers.org/srs
[js-boost]: https://ankiweb.net/shared/info/1280253613
[highlight]: https://highlightjs.org/
[external-js-anki]: https://anki.tenderapp.com/discussions/ankidesktop/15180-jquery-support-in-card-templates#comment_38213845
