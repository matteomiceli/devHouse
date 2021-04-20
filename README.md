# Progress

## <ins>March 24-27, 2021</ins>

### Octavio

- Attempted Authentication. Created two different versions of PassportConfig.ts

## <ins>April 1, 2021</ins>

### Matteo

- Research into typescript/passport implementations for passport authentication… messing around with Octavio’s passportconfig not getting very far, but starting to understand the interaction between files.

## <ins>April 2, 2021</ins>

### Octavio

- registration. Made sure user cannot register the same email
- Looking into deletePost function in Post.service.mock.ts

### Matteo

- Authentication passport middleware interacting with authentication.service.mock and userModel —> (hopefully) passing data to PassportConfig

### Alex

- Working through starter files, trying to understand how files interact

## <ins>April 8, 2021</ins>

### Octavio

- Implemented deletePost function in post.service.mock. Able to delete posts from temp post object
- Worked on likePost function. Changed shape of IPost interface to require likes to be an object. User’s name will be added as a key of a post they like. Unliking should erase their key.

## <ins>April 9, 2021</ins>

### Matteo

- Worked on auth again… seem to not be making any meaningful progress

### Alex

- Working on auth; infinity load problem, made no progress

## <ins>April 10, 2021</ins>

### Alex

- Gave up on auth temporarily, looked at other files and functions (repost, likes, get posts) unfamiliar and uncertain where to start; still unsure of interaction with a lot of components

## <ins>April 11, 2021</ins>

### Alex

- Worked on auth, rewatched passport lecture & auth videos, read through hidden passport manual, went through tutorials and attempted to understand similar implementation of authentication from another developer

## <ins>April 16, 2021</ins>

### Matteo

- Used in class example to rewrite passportConfig, passing in a PassportStatic param into the constructor
- Throwing this error "this.\_usernameField = options.usernameField || 'username';"
  The user object is not making it’s way back to the strategy for some reason
  passport.authenticate() called and class is instantiated
  Console.logged to try to find error but code wouldn’t transpile
- Giving auth a break so I can move onto another feature

### Alex

- Given up on auth starting to look at other areas like reposting. Tried to also copy the in class version but ran into more errors. Windows update wiped one of my branches, but it really didn’t contain anything that actually worked. Run out of time and didn’t really get to work on anything else (waited too late/worked on auth way too long)

## <ins>April 17, 2021</ins>

### Matteo

- Changed post.controller.ts to use database object and modified
- Implemented methods in postcontroller getAllPosts, getPostById, createComment
- Implemented methods in post.service.mock findById, addCommentToPost
- Posting comments working

### Octavio

- somehow my likes progress was deleted when troubleshooting my local repo. Managed to recover code from my recycling bin. That sucked. Gave me a mini heart attack.

## <ins>April 18, 2021</ins>

### Matteo

- Implemented add post method in post.service.mock
- Implemented createPost method in postcontroller

### Octavio

- Made likes and delete function use real mock db instead of example post data

## <ins>Other Notes</ins>

### Octavio

- did a fair bit of research on passport in the beginning I read from multiple sources and tried to implement code from each of them. Trying to use this many sources on the same thing may have confused me. In the end I found myself stuck on where to implement "passport.use(local)". I read through

  - [passport documentation](http://www.passportjs.org/docs/authenticate/),
  - [Github typscript starter code](https://github.com/microsoft/TypeScript-Node-Starter/blob/master/src/config/passport.ts),
  - [tsed.io](https://tsed.io/tutorials/passport.html#configure-your-server),
  - and [Passport Hidden Manuel](https://github.com/jwalton/passport-api-docs#reqloginuser-callback) by jwalton.

- at some point I fiddled around with the interfaces and modded them to add the deletePost and likePost functions. Had an afterthought that extending them with a new interface may been better to adhere to the Open Closed Principle.

- also wanted to clean up controller code by putting functions into their own files then porting them into the controller file. 

### Matteo
- I struggled a lot with auth. I found a [github starter by Microsoft](https://github.com/microsoft/TypeScript-Node-Starter/blob/master/src/config/passport.ts), but realized all the code was written functionally. After weeks with 0 working code I scrapped auth. The included auth implemented is based off the solution you provided, however, I failed to fix all the bugs. 

- Moving on to the posts section was a lot easier. I did some light modification of the interfaces to suit our needs, but for the most part, I kept the starter file interfaces. As reference, I looked at other labs, but didn't find I needed much help outside of that. I got comments and posts showing up, but wish I had more time to streamline it all. 

### Alex
- Spent the majority of time focused on watching and following along with class videos; went through passport documentation as well as hidden passport documentation

- I still can't wrap my head around authentication but slowly putting some of the pieces together. Ran into a lot of errors during this process. Used the hidden passport guide a lot in the beginning and then moved to random youTube videos and one section of a Udemy course I have after going through all class related videos multiple times

- Cloned a few random repos from GitHub after just searching for "passport" and "passport-local" but could not really make much sense of it

- I still can't wrap my head around authentication but slowly putting some of the pieces together. Ran into a lot of errors during this process. Used the hidden passport guide a lot in the beginning and then moved to random youTube videos and one section of a Udemy course I have after going through all class related videos multiple times; most resources outside of class videos did not end up being that helpful. Looking at random repos did help find patterns and understand what should go where to a certain extent
