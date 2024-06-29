Starter ExpressJS server application providing login and registration system. It uses TypeScript, MongoDB and JsonWebToken.  
The authentication token can be provided through the request header using the Bearer token format or HTTP-only cookie.


## Features
- JWT Authentication
- BCrypt password hashing
- HTTP-Only Cookies


## Endpoints
### POST: /auth/register
```json
{
  "username": "Example User",
  "email": "example@gmail.com",
  "password": "12345678"
}
```
- Returns JWT and Cookie
### POST: /auth/log-in
```json
{
  "email": "example@gmail.com",
  "password": "12345678"
}
```
- Returns JWT and Cookie
### POST: /auth/log-out
- Log out by removing HTTP-only cookies
### GET: /auth
- Retrieve user data
- Requires authentication
### GET: /auth/admin
- Requires authentication
- Requires admin role

### GET: /users
- Retrieve list of users
### GET: /users/:id
- Retrieve chosen user by id
### PUT: /users/:id
```json
{
  "username": "Example User",
  "email": "example@gmail.com",
  "password": "12345678",
  "role": "USER"
}
```
- Edit chosen user
- Only admin can change user's role
### DELETE: /users/:id
- Delete chosen user by id