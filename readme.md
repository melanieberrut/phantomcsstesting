# phantomcsstesting

CSS regression testing using [PhantomCSS](https://github.com/Huddle/PhantomCSS)

## What is PhantomCSS

> PhantomCSS takes screenshots captured by CasperJS and compares them to baseline images using Resemble.js to test for rgb pixel differences. PhantomCSS then generates image diffs to help you find the cause.
> Screenshot based regression testing can only work when UI is predictable. It's possible to hide mutable UI components with PhantomCSS but it would be better to test static pages or drive the UI with faked data during test runs. [> Read more](https://github.com/Huddle/PhantomCSS#what)

## Install

Clone download the repository

In the root folder from your terminal run:
```
 npm install
```

Once the dependencies are installed, we can now run the page with:
```
 npm start
```
Http-server will create a http server and list the URLs where the page will be avaiable. By default, it will be [http://127.0.0.1:8080](http://127.0.0.1:8080)

## The down-low

The idea was to split the page in components and test them individually. Components on the page are:
* navbar
* jumbotron
* 3 x blocks
* footer

With that in mind, I've created a test for each of the components on the different breakpoint needed (desktop, portrait tablet, and portrait mobile). 

You should first run the test so you have a "base" of the initial project look and feel:

```
 npm test
```

All the test would have PASSED and the screenshots will be generated in `<root>/screenshots`

Now that you have the base, you can modify the content or the CSS of the page, and run the command `npm test`, and if the changes are more than `0.05%` (default), your tests will fail. You can see the visual difference if you navigate in the folder `<root>/screenshots/failures`.

Now it's up to you, if you want to allow the change, you will have to remove the "screenshot" and run the test again so you change become the "base" to compare future screenshot against.

Happy CSS regression testing!
