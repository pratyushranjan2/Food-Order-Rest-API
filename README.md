# PRODUCTION SERVER BASE URL
`https://ranjan-food-order.herokuapp.com` <br/>
Note that this URL is only for making API requests, so visiting the URL in the browser is not going to render any HTML. <br/> 

# REQUESTS

**Create User**
----
  Creates a new user/customer account.

* **URL** <br/>
`/users`
  
* **METHOD** <br/>
`POST`

* **DATA PARAMS** <br/>
  * **REQUIRED:** <br/>
  `name=[String]` <br/>
  `email=[String]` <br/>
  `roll=[String]` <br/>
  `password=[String]` <br/>

* **SUCCESS RESPONSE** <br/>
  * **CODE:** `200` <br/>
  * **CONTENT:** ```{
    "user": {
        "_id": "612776587eb003001548428e",
        "name": "Pratyush Ranjan",
        "email": "pratyushranjan02@gmail.com",
        "roll": "imt2019000",
        "__v": 1
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTI3NzY1ODdlYjAwMzAwMTU0ODQyOGUiLCJpYXQiOjE2Mjk5NzYxNTIsImV4cCI6MTYzMDU4MDk1Mn0.6WrlgR-wnrqh2pAHTY5tgdvLHl9JKY1xktfb0rh_LBU"
}```

* **ERROR RESPONSE** <br/>
  * **CODE:** `500` <br/>
  * **CONTENT:** ```{ error: [Object] }``` <br/> <br/> <br/>
  
 **Login User**
----
  Logs in an existing user.

* **URL** <br/>
`/users/login`
  
* **METHOD** <br/>
`POST`

* **DATA PARAMS** <br/>
  * **REQUIRED:** <br/>
  `email=[String]` <br/>
  `password=[String]` <br/>
  
* **SUCCESS RESPONSE** <br/>
  * **CODE:** `200` <br/>
  * **CONTENT:** ```{
    "user": {
        "_id": "60fe5f0366d658001515f875",
        "name": "Pratyush",
        "email": "pratyush.ranjan@iiitb.ac.in",
        "roll": "imt2019065",
        "__v": 3
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGZlNWYwMzY2ZDY1ODAwMTUxNWY4NzUiLCJpYXQiOjE2Mjk5NzY5MDAsImV4cCI6MTYzMDU4MTcwMH0.RARaL0czG1lfO3r1s5saNo4m8gXqB2S1sTK8gdVGsAg"
}```

* **ERROR RESPONSE** <br/>
  * **CODE:** `400` <br/>
  * **CONTENT:** ```{ error: [Object] }``` <br/> <br/> <br/>
  
**Log Out User**
----
  Logs out the user from the current device.

* **URL** <br/>
`/users/logout`
  
* **METHOD** <br/>
`POST`

* **AUTHORIZATION** <br/>
  * **User Authentication** <br/>
  `Bearer Authentication Token` <br/>

* **SUCCESS RESPONSE** <br/>
  * **CODE:** `200` <br/>
  * **CONTENT:** ```{
    "message": "Logged out"
}```

* **ERROR RESPONSE** <br/>
  * **CODE:** `500` <br/>
  * **CONTENT:** ```{ error: [Object] }``` <br/> <br/> <br/>
  
**Log Out User Everywhere**
----
  Logs out the user from all device from which he/she had logged in.

* **URL** <br/>
`/users/logoutAll`
  
* **METHOD** <br/>
`POST`

* **AUTHORIZATION** <br/>
  * **User Authentication** <br/>
  `Bearer Authentication Token` <br/>

* **SUCCESS RESPONSE** <br/>
  * **CODE:** `200` <br/>

* **ERROR RESPONSE** <br/>
  * **CODE:** `500` <br/>
  * **CONTENT:** ```{ error: [Object] }``` <br/> <br/> <br/>
  
**Get User Details**
----
  Fetches the details of the user currently logged in.

* **URL** <br/>
`/users/me`
  
* **METHOD** <br/>
`GET`

* **AUTHORIZATION** <br/>
  * **User Authentication** <br/>
  `Bearer Authentication Token` <br/>

* **SUCCESS RESPONSE** <br/>
  * **CODE:** `200` <br/>
  * **CONTENT:** ```{
    "_id": "60fe5f0366d658001515f875",
    "name": "Pratyush",
    "email": "pratyush.ranjan@iiitb.ac.in",
    "roll": "imt2019065",
    "__v": 7
}```

* **ERROR RESPONSE** <br/>
  * **CODE:** `500` <br/>
  * **CONTENT:** ```{ error: [Object] }``` <br/> <br/> <br/>
  
**Delete User**
----
  Deletes the user currently logged in.

* **URL** <br/>
`/users/me`
  
* **METHOD** <br/>
`DELETE`

* **AUTHORIZATION** <br/>
  * **User Authentication** <br/>
  `Bearer Authentication Token` <br/>

* **SUCCESS RESPONSE** <br/>
  * **CODE:** `200` <br/>
  * **CONTENT:** ```{
    "_id": "60fe5f0366d658001515f875",
    "name": "Pratyush",
    "email": "pratyush.ranjan@iiitb.ac.in",
    "roll": "imt2019065",
    "__v": 7
}```

* **ERROR RESPONSE** <br/>
  * **CODE:** `500` <br/>
  * **CONTENT:** ```{ error: [Object] }``` <br/> <br/> <br/>
  
**Update User Details**
----
  Updates the modifiable user account parameters.

* **URL** <br/>
`/users/me`
  
* **METHOD** <br/>
`PATCH`

* **AUTHORIZATION** <br/>
  * **User Authentication** <br/>
  `Bearer Authentication Token` <br/>

* **DATA PARAMS** <br/>
  * **ALLOWED:** <br/>
  `name=[String]` <br/>
  `email=[String]` <br/>
  `roll=[String]` <br/>
  `password=[String]` <br/>
  
  * **RESTRICTED:** <br/>
  `tokens=[{token}]`

* **SUCCESS RESPONSE** <br/>
  * **CODE:** `200` <br/>
  * **CONTENT:** ```{
    "message": "Updated successfully"
}```

* **ERROR RESPONSE** <br/>
  * **CODE:** `400` <br/>
  * **CONTENT:** ```{ error: [Object] }``` <br/> <br/> <br/>
  
**Create Admin**
----
  Creates a new admin account. Only one admin account can be created. Only if the present admin is removed, can the next admin be created.

* **URL** <br/>
`/admin`
  
* **METHOD** <br/>
`POST`

* **DATA PARAMS** <br/>
  * **REQUIRED:** <br/>
  `name=[String]` <br/>
  `email=[String]` <br/>
  `password=[String]` <br/>

* **SUCCESS RESPONSE** <br/>
  * **CODE:** `200` <br/>
  * **CONTENT:** ```{
    "admin": {
        "_id": "612776587eb003001548428e",
        "name": "Admin",
        "email": "admin@iiitb.ac.in",
        "password": "adminiiitb",
        "__v": 1
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTI3NzY1ODdlYjAwMzAwMTU0ODQyOGUiLCJpYXQiOjE2Mjk5NzYxNTIsImV4cCI6MTYzMDU4MDk1Mn0.6WrlgR-wnrqh2pAHTY5tgdvLHl9JKY1xktfb0rh_LBU"
}```

* **ERROR RESPONSE** <br/>
  * **CODE:** `500` <br/>
  * **CONTENT:** ```{ error: [Object] }``` <br/> <br/> <br/>
  
**Login Admin**
----
  Logs in the existing admin.

* **URL** <br/>
`/admin/login`
  
* **METHOD** <br/>
`POST`

* **DATA PARAMS** <br/>
  * **REQUIRED:** <br/>
  `email=[String]` <br/>
  `password=[String]` <br/>
  
* **SUCCESS RESPONSE** <br/>
  * **CODE:** `200` <br/>
  * **CONTENT:** ```{
    "admin": {
        "_id": "60fe9b235ef7790015164c5d",
        "name": "Admin",
        "email": "admin@iiitb.ac.in",
        "__v": 5
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGZlOWIyMzVlZjc3OTAwMTUxNjRjNWQiLCJpYXQiOjE2Mjk5ODM5ODgsImV4cCI6MTYzMDU4ODc4OH0.spwvTMoENa3vk4FYx71a-hm20UaW7UCqq0gM96Mcme8"
}```

* **ERROR RESPONSE** <br/>
  * **CODE:** `400` <br/>
  * **CONTENT:** ```{ error: [Object] }``` <br/> <br/> <br/>
  
**Log Out Admin**
----
  Logs out the admin from the current device.

* **URL** <br/>
`/admin/logout`
  
* **METHOD** <br/>
`POST`

* **AUTHORIZATION** <br/>
  * **Admin Authentication** <br/>
  `Bearer Authentication Token` <br/>

* **SUCCESS RESPONSE** <br/>
  * **CODE:** `200` <br/>
  * **CONTENT:** ```{
    "message": "Logged out"
}```

* **ERROR RESPONSE** <br/>
  * **CODE:** `500` <br/>
  * **CONTENT:** ```{ error: [Object] }``` <br/> <br/> <br/>
  
**Log Out Admin Everywhere**
----
  Logs out the admin from all device from which he/she had logged in.

* **URL** <br/>
`/admin/logoutAll`
  
* **METHOD** <br/>
`POST`

* **AUTHORIZATION** <br/>
  * **Admin Authentication** <br/>
  `Bearer Authentication Token` <br/>

* **SUCCESS RESPONSE** <br/>
  * **CODE:** `200` <br/>
  * **CONTENT:** ```{message: 'Logged out from all devices'}```

* **ERROR RESPONSE** <br/>
  * **CODE:** `500` <br/>
  * **CONTENT:** ```{ error: [Object] }``` <br/> <br/> <br/>
  
**Update Admin Details**
----
  Updates the modifiable admin account parameters.

* **URL** <br/>
`/admin/current`
  
* **METHOD** <br/>
`PATCH`

* **AUTHORIZATION** <br/>
  * **Admin Authentication** <br/>
  `Bearer Authentication Token` <br/>

* **DATA PARAMS** <br/>
  * **ALLOWED:** <br/>
  `name=[String]` <br/>
  `email=[String]` <br/>
  `password=[String]` <br/>
  
  * **RESTRICTED:** <br/>
  `tokens=[{token}]`

* **SUCCESS RESPONSE** <br/>
  * **CODE:** `200` <br/>
  * **CONTENT:** ```{
    "message": "Details updated successfully"
}```

* **ERROR RESPONSE** <br/>
  * **CODE:** `400` <br/>
  * **CONTENT:** ```{ error: [Object] }``` <br/> <br/> <br/>
  
**Create Food**
----
  Adds a new food item to the database.

* **URL** <br/>
`/food`
  
* **METHOD** <br/>
`POST`

* **AUTHORIZATION** <br/>
  * **Admin Authentication** <br/>
  `Bearer Authentication Token` <br/>

* **DATA PARAMS** <br/>
  * **REQUIRED:** <br/>
  `name=[String]` <br/>
  `price=[String]` <br/>
  `availability=[Boolean]` <br/>
  
  * **OPTIONAL:** <br/>
  `discount=[Number]` <br/>
  `stock=[Number]` <br/>

* **SUCCESS RESPONSE** <br/>
  * **CODE:** `200` <br/>
  * **CONTENT:** ```{
    "message": "Food successfully added"
}```

* **ERROR RESPONSE** <br/>
  * **CODE:** `500` <br/>
  * **CONTENT:** ```{ error: [Object] }``` <br/> <br/> <br/>
  
**Get Food**
----
  Fetches the food details of a particular food.

* **URL** <br/>
`/food/:id`
  
* **METHOD** <br/>
`GET`

* **URL PARAMS** <br/>
  * **REQUIRED:** <br/>
  `id=[mongoose.Schema.Types.ObjectId]` <br/>
  
* **SUCCESS RESPONSE** <br/>
  * **CODE:** `200` <br/>
  * **CONTENT:** ```{
    "_id": "612798386ad0390015574a0a",
    "name": "Dosa",
    "price": 50,
    "availability": true,
    "stars": 5,
    "description": "Medium-sized dosa. Serves 1.",
    "discount": 10,
    "__v": 0
}```

* **ERROR RESPONSE** <br/>
  * **CODE:** `404` <br/>
  * **CONTENT:** ```{ error: [Object] }``` <br/> <br/> <br/>
  
**Get Foods**
----
  Fetches multiple foods according to filters provided(if any). Pagination supported through *limit* and *skip* as query parameters.

* **URL** <br/>
`/food`
  
* **METHOD** <br/>
`GET`

* **URL PARAMS** <br/>
  * **OPTIONAL:** <br/>
  `limit:[Integer]` <br/>
  `skip:[Integer]` <br/>

* **BODY PARAMS** <br/>
  * **OPTIONAL:** <br/>
  `name:[String]` <br/>
  `price:[Number]` <br/>
  `discount:[Number]` <br/>
  `availability:[Boolean]` <br/>
  `stars:[Number]` <br/>
  
* **SUCCESS RESPONSE** <br/>
  * **CODE:** `200` <br/>
  * **CONTENT:** ```[{
    "_id": "612798386ad0390015574a0a",
    "name": "Dosa",
    "price": 50,
    "availability": true,
    "stars": 5,
    "description": "Medium-sized dosa. Serves 1.",
    "discount": 10,
    "__v": 0
}, {
    "_id": "612798386ad0390015574a0a",
    "name": "Dosa",
    "price": 50,
    "availability": true,
    "stars": 5,
    "description": "Medium-sized dosa. Serves 1.",
    "discount": 10,
    "__v": 0
}]```

* **ERROR RESPONSE** <br/>
  * **CODE:** `500` <br/>
  * **CONTENT:** ```{ error: [Object] }``` <br/> <br/> <br/>
  
**Update Food Details**
----
  Updates the modifiable food parameters in the database.

* **URL** <br/>
`/food/:id`
  
* **METHOD** <br/>
`PATCH`

* **AUTHORIZATION** <br/>
  * **Admin Authentication** <br/>
  `Bearer Authentication Token` <br/>
  
* **URL PARAMS** <br/>
  * **REQUIRED:** <br/>
  `id=[mongoose.Schema.Types.ObjectId]` <br/>

* **DATA PARAMS** <br/>
  * **ALLOWED:** <br/>
  `name=[String]` <br/>
  `price=[Number]` <br/>
  `availability=[Boolean]` <br/>
  `discount=[Number]` <br/>
  `stock=[Number]` <br/>
  
  * **RESTRICTED:** <br/>
  `stars=[Number]`

* **SUCCESS RESPONSE** <br/>
  * **CODE:** `200` <br/>
  * **CONTENT:** ```{ [Food] }```

* **ERROR RESPONSE** <br/>
  * **CODE:** `400` <br/>
  * **CONTENT:** ```{ error: [Object] }``` <br/> <br/> <br/>
  
**Delete Food**
----
  Deletes the food from the database.

* **URL** <br/>
`/food/:id`
  
* **METHOD** <br/>
`DELETE`

* **AUTHORIZATION** <br/>
  * **Admin Authentication** <br/>
  `Bearer Authentication Token` <br/>
  
* **URL PARAMS** <br/>
  * **REQUIRED:** <br/>
  `id=[mongoose.Schema.Types.ObjectId]` <br/>

* **SUCCESS RESPONSE** <br/>
  * **CODE:** `200` <br/>
  * **CONTENT:** ```{
    "_id": "612798386ad0390015574a0a",
    "name": "Dosa",
    "price": 50,
    "availability": true,
    "stars": 5,
    "description": "Medium-sized dosa. Serves 1.",
    "discount": 10,
    "__v": 0
}```

* **ERROR RESPONSE** <br/>
  * **CODE:** `500` <br/>
  * **CONTENT:** ```{ error: [Object] }``` <br/> <br/> <br/>
  
**Create Order**
----
  Creates a new food-order.

* **URL** <br/>
`/order/:foodID`
  
* **METHOD** <br/>
`POST`

* **AUTHORIZATION** <br/>
  * **User Authentication** <br/>
  `Bearer Authentication Token` <br/>

* **URL PARAMS** <br/>
  * **REQUIRED:** <br/>
  `foodID=[mongoose.Schema.Types.ObjectId]` <br/>

* **SUCCESS RESPONSE** <br/>
  * **CODE:** `200` <br/>
  * **CONTENT:** ```{
    "message": "Order created"
}```

* **ERROR RESPONSE** <br/>
  * **CODE:** `500` <br/>
  * **CONTENT:** ```{ error: [Object] }``` <br/> <br/> <br/>
  
**Get Order**
----
  Fetches the details of an order.

* **URL** <br/>
`/orders/:id`
  
* **METHOD** <br/>
`GET`

* **AUTHORIZATION** <br/>
  * **Admin Authentication** <br/>
  `Bearer Authentication Token` <br/>

* **URL PARAMS** <br/>
  * **REQUIRED:** <br/>
  `id=[mongoose.Schema.Types.ObjectId]` <br/>
  
* **SUCCESS RESPONSE** <br/>
  * **CODE:** `200` <br/>
  * **CONTENT:** ```{
    "quantity": 1,
    "paid": false,
    "_id": "6127b447e53db0001516aad2",
    "owner": "612784af7eb00300154842ab",
    "food": "6127b3d7e53db0001516aac7",
    "createdAt": "2021-08-26T15:33:27.298Z",
    "updatedAt": "2021-08-26T15:33:27.298Z",
    "__v": 0
}```

* **ERROR RESPONSE** <br/>
  * **CODE:** `500` <br/>
  * **CONTENT:** ```{ error: [Object] }``` <br/>
  OR <br/>
  * **CODE:** `404` <br/>
  * **CONTENT:** ```{ error: 'No order found' }``` <br/> <br/> <br/>
  
**Get Orders**
----
  Fetches multiple orders according to filters provided(if any). Pagination supported through *limit* and *skip* as query parameters.

* **URL** <br/>
`/orders`
  
* **METHOD** <br/>
`GET`

* **AUTHORIZATION** <br/>
  * **Admin Authentication** <br/>
  `Bearer Authentication Token` <br/>

* **URL PARAMS** <br/>
  * **OPTIONAL:** <br/>
  `limit:[Integer]` <br/>
  `skip:[Integer]` <br/>
  `paid:[Boolean]` <br/>
  
* **SUCCESS RESPONSE** <br/>
  * **CODE:** `200` <br/>
  * **CONTENT:** ```[{
    "quantity": 1,
    "paid": false,
    "_id": "6127b447e53db0001516aad2",
    "owner": "612784af7eb00300154842ab",
    "food": "6127b3d7e53db0001516aac7",
    "createdAt": "2021-08-26T15:33:27.298Z",
    "updatedAt": "2021-08-26T15:33:27.298Z",
    "__v": 0
}, {
    "quantity": 2,
    "paid": true,
    "_id": "6127b447e53db0001516aae9",
    "owner": "612784af7eb00300154842sg",
    "food": "6127b3d7e53db0001516aaqe",
    "createdAt": "2021-08-26T13:33:27.298Z",
    "updatedAt": "2021-08-26T11:33:27.298Z",
    "__v": 0
}]```

* **ERROR RESPONSE** <br/>
  * **CODE:** `500` <br/>
  * **CONTENT:** ```{ error: [Object] }``` <br/> <br/> <br/>
  
**Delete Order**
----
  Deletes the order from the database.

* **URL** <br/>
`/order/:id`
  
* **METHOD** <br/>
`DELETE`

* **AUTHORIZATION** <br/>
  * **Admin Authentication** <br/>
  `Bearer Authentication Token` <br/>
  
* **URL PARAMS** <br/>
  * **REQUIRED:** <br/>
  `id=[mongoose.Schema.Types.ObjectId]` <br/>

* **SUCCESS RESPONSE** <br/>
  * **CODE:** `200` <br/>

* **ERROR RESPONSE** <br/>
  * **CODE:** `500` <br/>
  * **CONTENT:** ```{ error: [Object] }``` <br/> <br/> <br/>
  
**Upload User Avatar**
----
  Uploads an avatar/profile-pic for the user.

* **URL** <br/>
`/users/me/avatar`
  
* **METHOD** <br/>
`POST`

* **AUTHORIZATION** <br/>
  * **User Authentication** <br/>
  `Bearer Authentication Token` <br/>
  
* **BODY PARAMS** <br/>
  * **REQUIRED:** <br/>
  `avatar=[File(png/jpg/jpeg)]` <br/>

* **SUCCESS RESPONSE** <br/>
  * **CODE:** `200` <br/>
  * **Content:** ```{ 'message': 'Image uploaded' }```

* **ERROR RESPONSE** <br/>
  * **CODE:** `400` <br/>
  * **CONTENT:** ```{ error: [Object] }``` <br/> <br/> <br/>
  
**Upload Food Image**
----
  Uploads an image for a food.

* **URL** <br/>
`/food/:id/image`
  
* **METHOD** <br/>
`POST`

* **AUTHORIZATION** <br/>
  * **Admin Authentication** <br/>
  `Bearer Authentication Token` <br/>
  
* **URL PARAMS** <br/>
  * **REQUIRED:** <br/>
  `id=[mongoose.Schema.Types.ObjectId]` <br/>
  
* **BODY PARAMS** <br/>
  * **REQUIRED:** <br/>
  `image=[File(png/jpg/jpeg)]` <br/>

* **SUCCESS RESPONSE** <br/>
  * **CODE:** `200` <br/>
  * **Content:** ```{ 'message': 'Image uploaded' }```

* **ERROR RESPONSE** <br/>
  * **CODE:** `400` <br/>
  * **CONTENT:** ```{ error: [Object] }``` <br/> <br/> <br/>
  
**Get User Avatar**
----
  Fetches the avatar of a user.

* **URL** <br/>
`/users/:id/avatar`
  
* **METHOD** <br/>
`GET`

* **URL PARAMS** <br/>
  * **REQUIRED:** <br/>
  `id=[mongoose.Schema.Types.ObjectId]` <br/>
  
* **SUCCESS RESPONSE** <br/>
  * **CODE:** `200` <br/>
  * **Content:** ```image/png```

* **ERROR RESPONSE** <br/>
  * **CODE:** `500` <br/>
  * **CONTENT:** ```{ error: [Object] }``` <br/> <br/> <br/>
  
**Get Food Image**
----
  Fetches the image of a food.

* **URL** <br/>
`/food/:id/image`
  
* **METHOD** <br/>
`GET`

* **URL PARAMS** <br/>
  * **REQUIRED:** <br/>
  `id=[mongoose.Schema.Types.ObjectId]` <br/>
  
* **SUCCESS RESPONSE** <br/>
  * **CODE:** `200` <br/>
  * **Content:** ```image/png```

* **ERROR RESPONSE** <br/>
  * **CODE:** `500` <br/>
  * **CONTENT:** ```{ error: [Object] }``` <br/> <br/> <br/>
  
**Delete User Avatar**
----
  Deletes the avatar/profile-pic of the user.

* **URL** <br/>
`/users/me/avatar`
  
* **METHOD** <br/>
`DELETE`

* **AUTHORIZATION** <br/>
  * **User Authentication** <br/>
  `Bearer Authentication Token` <br/>
  
* **SUCCESS RESPONSE** <br/>
  * **CODE:** `200` <br/>
  
* **ERROR RESPONSE** <br/>
  * **CODE:** `500` <br/>
  * **CONTENT:** ```{ error: [Object] }``` <br/> <br/> <br/>
  
**Delete Food Image**
----
  Deletes the image of a food.

* **URL** <br/>
`/food/:id/image`
  
* **METHOD** <br/>
`DELETE`

* **AUTHORIZATION** <br/>
  * **Admin Authentication** <br/>
  `Bearer Authentication Token` <br/>
  
* **URL PARAMS** <br/>
  * **REQUIRED:** <br/>
  `id=[mongoose.Schema.Types.ObjectId]` <br/>
  
* **SUCCESS RESPONSE** <br/>
  * **CODE:** `200` <br/>

* **ERROR RESPONSE** <br/>
  * **CODE:** `500` <br/>
  * **CONTENT:** ```{ error: [Object] }``` <br/> <br/> <br/>
