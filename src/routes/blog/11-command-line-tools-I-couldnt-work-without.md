---
title: 11 Command Line Tools I Couldn't Work Without
date: "2022-06-26"
tags:
  - tech
  - cli
---

I work on mac OSX and linux command line environments. My tool kit is shaped by the needs I have. There may be similar tools for powershell or other, I'm just not aware of them.

## 1. `pbpaste` and `pbcopy`

On mac you can access your paste buffer using the paste-buffer-paste (pbpaste) and paste-buffer-copy (pbcopy) commands. I love how they keep my console clean especially when I have trying to transform a large chunk of text/json

### Gotchas

Some commands end with trailing newlines some do not. Also, if you use copy-paste to setup the command

## 2. `grep`


## 3. `wc`

Word count does exactly what it says and more. Counts characters, words and lines. I'm suprised how often it comes in handy.

```
$ wc README.md
      24      62     407 README.md
```

## 4. `jq`

Universal swiss army knife for json. Love it.

## 5. `git`

## 6. `pushd`, `popd` and `dirs`

## 7. `zip` and `unzip`

## 8. `base64`

Encode and decode strings as base64.

### Examples:

(note the `-n` drops the trailing newline from echo)

```
$ echo -n 'hello world :)' | base64
aGVsbG8gd29ybGQgOik=
$ echo -n 'hello world :)' | base64 | base64 -D
hello world :)$
```

## 9. `shasum`

Run hash algorithmns from the commandline.

## 10. `env`

## 11. `curl`

## 12. BONUS: `aws`
