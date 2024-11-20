# {JSON} Fake
[JSON Fake](https://jsonfake.com) is your go-to free online REST API for quickly generating placeholder json data without the need to set up a server—ideal for front-end development, teaching, testing, and prototyping!


## Why JSON Fake?
When building a prototype for frontend work, or following a tutorial, I often found myself needing some quick data. Using a public API didn’t appeal to me, as it felt like I was spending more time dealing with registration and navigating a complex API than actually focusing on the task at hand. That's why JSON Fake is here to help you get fake JSON placeholder data instantly.

## Features
* No registration
* Zero-config
* Basic API
* "Has many" relationships
* Cross-domain (CORS and JSONP)
* Supports GET, POST, PUT, PATCH and DELETE

## Todo
Let's contribute to working on this todo list feature for this project

* Codes Refactoring
* Adding pagination data
* Adding sorting data
* Adding filter data
* Delay Responses Simulation
* Custom responses JSON data


## How to Fetch Data?
This is example how to fetch users data
```javascript
fetch('https://jsonfake.com/data/users')
  .then(res => res.json())
  .then(json => console.log(json));

```

Or you can [click this](https://jsonfake.com/data/users) to get data on your browser


## Documentation
You can access our [API Documentation here](https://web.postman.co/api/:apiId/documentation/3460037-2a7b1202-d9f2-40eb-a733-3a803bb0c8ce/publish?workspaceId=72b5a73e-d34f-42e3-8aa1-208055c9c031&requestId=#url)

