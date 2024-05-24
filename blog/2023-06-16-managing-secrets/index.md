---
title: 'Managing Service Account JSON Files or Files with Secrets in Nodejs'
slug: 'managing-service-account-credentials-json-files'
summary: ''
authors: [kam]
tags: [cyclic, software, tech]
image: ./secure-file-dalle2.png
---
![Locked vault](./secure-file-dalle2.png)

# Files with Secrets in Nodejs

In our journey as Node.js developers, we often deal with various external services such as Google Cloud or Firebase. These services require us to provide credentials that authenticate our application and grant it the necessary permissions to interact with the respective service. This post is about to handle large secrets or files that contain private keys. Google provides files like this. You will see them named a few different things: `serviceAccount.json` or sometimes `serviceAccountCredentials.json`. This file contains secret data and is used to authenticate against Google Cloud and/or Firebase.

<!-- truncate -->

## Why an Account Service JSON File is Needed for Google and/or Firebase
Google and Firebase provide us with a JSON files that contains private keys for our application to access their services. These JSON files, often referred to as "account service" files, contain the necessary credentials our application needs to authenticate itself with Google and Firebase.

The JSON file includes several important pieces of information such as the `project_id`, `private_key`, and `client_email`. This data is crucial for establishing an authenticated communication channel between our application and the respective service. Without this JSON file, our application won't be able to authenticate itself, thus not being able to access or interact with the resources provided by Google Cloud or Firebase.

## Why the serviceAccount.json File Needs to be Kept Secret
As you can guess from the information contained within the JSON file, it's crucial that we keep these files secret and safe. If this file falls into the wrong hands, malicious users could use our `private_key` to impersonate our application and misuse the services, causing serious security issues. They could potentially access our Firebase data, use our Google Cloud resources, and even incur costs on our Google Cloud account.

## Problems with Storing the File as a String in Environment Variables
A common practice is to store sensitive data in environment variables. If you do this on AWS Lambda you can run into an issue. AWS Lambda limits the total size of all [environment variables to a maximum of 4KB](https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html#:~:text=The%20total%20size%20of%20all%20environment%20variables%20doesn%27t%20exceed%204%20KB.). Our JSON file along with a few other variables can easily exceed this limit, making it impossible to store the entire file in an environment variable. Worse case scenario is you are able to deploy your code and you only hit the environment variable size limit when you try to update another variable on some future release.

## Why You Shouldn't Commit Secrets to Your Git Repo
It might seem convenient to just commit the JSON file to our Git repository, but yeah, that is a very bad idea. Once a file is committed to a Git repository, its history remains there even if the file is later removed. This means that anyone with access to our repository can find and use these secrets.

If our repository is ever made public, someone could read all the data in our database, delete our database or run up a huge cloud bill mining nonsense-coin. Therefore, it's best to avoid committing any sensitive data, like our JSON file, to our Git repository.

## How to Read and Decrypt a File before Initializing the Firebase SDK
Instead of storing the JSON file directly or as an environment variable, we can encrypt it and then decrypt it when we need to initialize the Firebase SDK. We can use the example code here: [https://github.com/cyclic-software/example-secure-file](https://github.com/cyclic-software/example-secure-file)


### Encrypt your file

Follow the instructions in the repo, basically:

1) clone
1) add `SECRET_PASSPHRASE=<some long and secret passphrase>` to `.env`
1) run `npm run encrypt serviceAccount.json` 
1) copy the `serviceAccount.json.secure` file into your project
1) copy the `secure-file.js` file into your project
1) add `SECRET_PASSPHRASE=<some long and secret passphrase>` to your project's environment variables

### Decrypt on init

```js
const admin = require('firebase-admin')
const { decryptToString } = require('./secure-file.js') // replace with your location

const secureFileName = './serviceAccount.json.secure' // replace with your filename
const jsonStr = await decryptToString(secureFileName)
const serviceAccount = JSON.parse(jsonStr);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
```

## What is it doing?

The `secure-file.js` code is using [AES256 GCM](https://en.wikipedia.org/wiki/Galois/Counter_Mode) to symmetrically encrypt the input file. It also randomly generates an initialization vector (`iv`). It stores the `iv`, encrypted data and a signature of both, `auth_tag` to prevent against tampering. All three of these are stored in the `.secure` output file.

Sample format:
```
{
  "iv": "32-char-long-hex-string",
  "auth_tag": "32-char-long-hex-string",
  "data": "base64-encoded-encrypted-binary-data"
}
```

# tldr

1) Don't store account secrets in git unless you want to let everyone crypto mine on your server.
1) If you hit size limits on environment variables, consider using an encrypted secure file.
1) Have a good time. Coding is fun.
