---
title: 11 Command Line Tools I Couldn't Work Without
date: "2022-06-26"
slug: 11-command-line-tools-I-couldnt-work-without
authors: kam
tags:
  - tech
  - cli
---

I work on mac OSX and linux command line environments. My tool kit is shaped by the needs I have. There may be similar tools for powershell or other, I'm just not aware of them.

<!-- truncate -->

## 1. `pbpaste` and `pbcopy`

On mac you can access your paste buffer using the paste-buffer-paste (pbpaste) and paste-buffer-copy (pbcopy) commands. I love how they keep my console clean especially when I have trying to transform a large chunk of text/json

### Gotchas

Some commands end with trailing newlines some do not. Also, if you use copy-paste to setup the command

## 2. `grep`

Grep stands for Global Regular Expression Print. That is what it does. Search the input for some regex on each line.

### Protips

- `-E` flag for extended, aka more modern, RegEx syntax
- `-n` Print line number
- `-i` Case insensitive matching
- `-v` Invert the selection

## 3. `wc`

Word count does exactly what it says and more. Counts characters, words and lines. I'm suprised how often it comes in handy.

```
$ wc README.md
      24      62     407 README.md
```

## 4. `jq`

Universal swiss army knife for json. Love it.

## 5. `git`

Distributed version control ftw. I probably only use 4-5 git commands regularly (`init`, `status`, `commit`, `push`, `checkout -b`)

## 6. `pushd`, `popd` and `dirs`

When navigating directory structures `pushd` lets you keep your current working directory on a stack. When you are done with the directory you `pushd`'ed into you can `popd` to jump back. This can be handy with `!pu` and `popd` in bash to bounce between two directories. `dirs` lets you see the stack of directories that you can pop. 

## 7. `zip` and `unzip`

Standard zip utils.

### Protips

Try `zip -r output.zip ./some/folder/` to recursively include subfiles. The first few times you use zip it is helpful to use `unzip -l` to see what is inside.

## 8. `base64`

Encode and decode strings as base64.

### Examples

(note the `-n` drops the trailing newline from echo)

```
$ echo -n 'hello world :)' | base64
aGVsbG8gd29ybGQgOik=
$ echo -n 'hello world :)' | base64 | base64 -D
hello world :)$
```

## 9. `man`

Read the manual for a command. Especially when you use `/` then type a search term. Use `n` to cycle to next found item.

### Examples

- `man shasum`
- `man base64`

## 10. `env`

Print all your environment variables. It is also great for hash bang instructions for shell scripts.

### Examples

- Print sorted variables from nodejs: `env | grep -i 'node' | sort`
- Start a bash shell script: `#!/usr/bin/env bash`

## 11. `curl`

Make requests. Although several protocols are supported I usually only use http(s).

### Examples

- See the response headers along with the response: `curl -i https://discord.cyclic.sh`
- Set request headers: `curl -i https://api.example.com -H 'Accept: application/json'`
- Set Basic Auth user/password: `curl -i https://discord.cyclic.sh -H 'Accept: application/json' -u MyUser:Pa$$w0rd`
- Send data: `curl -i https://discord.cyclic.sh -H 'Accept: application/json' -u MyUser:Pa$$w0rd -XPOST --data '{"key":"value"}'`
