# Mock Backend Setup

## Why

You'll be working most likely with the REST API or graphql backend and this is a really great way to get some practice with tokens and your project.


## Steps 

Note:
- this has already been set up and these notes and comments are solely for your curiosity. The course isn't covering how to set up this backend server, the only requirement is that you know how to run it.
- the steps 1-3 are to get it running from scratch, but the steps after that are all usage examples (with a rest api client or with javascript.)

1. With the empty folder here, initialize npm
`npm init`
2. install `json-server` and also the package `json-server-auth` with the following command:
`npm install -D json-server json-server-auth`
Note: we're using the package [Json Server Auth](https://github.com/jeremyben/json-server-auth) which uses jwt tokens.
3. in the scripts use their module to run json server.
- edit the `package.json` file to have the following scripts
```json
"scripts":{
	"server": "json-server-auth authentication-db.json -p 5000"	
}
```
Note: `authentication-db.json` is just a file we've created, as we'll we're port `5000` to not collide with our  
- then in your terminal run the following command:
`npm run server`
Note: remember to leave this server running!

4. Let's register a user using a REST API client.
- Read the [documentation on the register endpoint](https://github.com/jeremyben/json-server-auth#register-)
- open your REST API client execute the following request.
	- endpoint: http://localhost:5000/register
	- method: POST
	- headers:
		{"Content-Type": "application/json"}
	- data:
```json
{
  "email": "rick.james@test.com",
  "password": "simplepassword",
  "firstname": "Rick",
  "lastname": "James",
  "age": 32
}
```
- Take a look at the response and save the `accessToken` somewhere (for now a file is fine.)
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpY2suamFtZXNAdGVzdC5jb20iLCJpYXQiOjE2NjM5NDgwMTEsImV4cCI6MTY2Mzk1MTYxMSwic3ViIjoiMSJ9.gWLFDK3VQF91xuxFITtbROxKKBDvGQKQjdf8J-OMPRc",
    "user": {
        "email": "rick.james@test.com",
        "firstname": "Rick",
        "lastname": "James",
        "age": 32,
        "id": 1
    }
}
```
- We'll be using this accesstoken to write to a resource.

- Go observe the `authentication-db.json` file, you'll see a result that looks like this: 
```json
{
  "users": [
    {
      "email": "rick.james@test.com",
      "password": "$2a$10$TdUiQRW8xmyzJls0kCMnl.hptkjTeshOhDVKbLUB2GspOQ5Q8wXk2",
      "firstname": "Rick",
      "lastname": "James",
      "age": 32,
      "id": 1
    }
  ],
  "posts": [],
  "comments": []
}
```
You can see that the password uses a hash (using [bcrypt](https://auth0.com/blog/hashing-in-action-understanding-bcrypt/) if you want to understand more) to obfuscate it from us, so we don't keep passwords in plain text.

5. Let's practice doing a login request ([documentation here](https://github.com/jeremyben/json-server-auth#login-)) and see what the result is.
- open your rest api and execute the following request.
	- endpoint: http://localhost:5000/login
	- method: POST
	- headers:
		{"Content-Type": "application/json"}
	- data:
```json
{
  "email": "rick.james@test.com",
  "password": "simplepassword"
}
```
- observe the result from the response (with the code 200 ok)
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpY2suamFtZXNAdGVzdC5jb20iLCJpYXQiOjE2NjM5NTA1MzksImV4cCI6MTY2Mzk1NDEzOSwic3ViIjoiMSJ9.rsND1g0ONfXt0DT9hpQIlry0MD47iPFl5sHzlvtJr30",
    "user": {
        "email": "rick.james@test.com",
        "firstname": "Rick",
        "lastname": "James",
        "age": 32,
        "id": 1
    }
}
```
You can see that we get the same result as when you register that's great! As well remember to save your password.
- Let's try a similar request except with a wrong password
	- endpoint: http://localhost:5000/login
	- method: POST
	- headers:
		{"Content-Type": "application/json"}
	- data:
```json
{
  "email": "rick.james@test.com",
  "password": "NOTTHERIGHTPASSWORD"
}
```
- observe that the response gives you a status code of 400 which means bad request, and doesn't give you the access code.



6. Let's use a route that requires authentication.
- refer to the [guarded routes docs](https://github.com/jeremyben/json-server-auth#guarded-routes-). 
In software when you're using a backend, there's always going to be what's called "guarded routes" or endpoints that you need authentication to do certain actions.
- Let's try to add a post without the token and see what happens.
	- endpoint: http://localhost:5000/664/posts
	- method: POST
	- headers:
		{"Content-Type": "application/json"}
	- data:
```json
{
	"title": "a post that is way too awesome",
	"body": "this post is going to blow up."	
}
```
- Observe the response, it gives us an error with at status code of "401 Unauthorized" and the error says `"Missing authorization header"` this is where the token is crucial.
- Let's try to add a post but add the token and see what happens, please observe the "Authorization" header.
	- endpoint: http://localhost:5000/664/posts
	- method: POST
	- headers
		{"Content-Type": "application/json",
		"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpY2suamFtZXNAdGVzdC5jb20iLCJpYXQiOjE2NjM5NTYwNzUsImV4cCI6MTY2Mzk1OTY3NSwic3ViIjoiMSJ9.MjhywK5eMo8RpXhW-LTyMXe-D0s5XzdXMGXkDYlNIY4"}
	- data:
```json
{
	"title": "a post that is way too awesome",
	"body": "this post is going to blow up.",
	"userId": 1	
}
```
- Observe the response it will give you a 200 ok status and the following data.
```json
{
    "title": "a post that is way too awesome",
    "body": "this post is going to blow up.",
    "userId": 1,
    "id": 2
}
```
Note: if you get an error "jwt expired" then you'll need to login again.

7. Let's get all of those posts
- Get all of the posts (that are not protected)
	- endpoint: http://localhost:5000/664/posts/
	- method: GET
	- headers:
		{"Content-Type": "application/json"}
- Observe the result of the endpoint is just the posts that we've built:
```json
[
    {
        "title": "a post that is way too awesome",
        "body": "this post is going to blow up.",
        "userId": 1,
        "id": 2
    }
]
```
Note: that is our endpoint `http://localhost:5000/664/posts` is "write" protected and you don't need the access token to read this resource. There are many other scenarios that you can take a look at and ask questions about on the [Gaurded routes documentation](https://github.com/jeremyben/json-server-auth#guarded-routes-)

## Conclusions
- Hopfully you feel comfortable using json-server and json-server-auth.
- As well, this shows how you can use Authenticated Rest APIs with JWTs (Json Web Tokens).
