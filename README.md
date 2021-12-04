# e-commerce

### GET api/product:

```sh
http://localhost:4000/api/product
METHOD : GET
Authorized Required : YES (Bearer Token)
Body : NO
Response Status : 200
Response Status : 401 Not Authorized
Response Status : 500
```

### POST api/product :

```sh
http://localhost:4000/api/product
METHOD : POST
Authorized Required : YES (Bearer Token)
Body : 
    {
        "name": string,
        "quantity": number,
        "price": number
    }
Response Status : 200
Response Status : 500
```

### PUT api/product/:id :

```sh
http://localhost:4000/api/product/:id
METHOD : PUT
Authorized Required : YES
Path Variables : 
    - id
Body :
    {
        "name": string,
        "quantity": number,
        "price": number
    }
Response Status : 200
Response Status : 401 Not Authorized
Response Status : 500
```

### DEL api/product/:id:

```sh
http://localhost:4000/api/product/:id
METHOD : DELETE
Authorization Required : YES
Path Variables : 
    - id
Response Status : 200
Response Status : 401 Not Authenticated
Response Status : 401 Not Authorized
Response Status : 500
```

### api/merchant/sign-up :

```sh
URL: http://localhost:4000/api/merchant/sign-up
METHOD : POST
Authenticated Required : NO
Authorized Required : NO
Body :
    {
        "username"      : string, // required
        "address"       : string, // required
        "join_date"     : string 
        "password"      : string,
        "phone_number"  : string
    }
Response Status : 200
Response Status : 500 internal server error
```

### api/merchant/sign-in :

```sh
http://localhost:4000/api/merchant/sign-in
METHOD : POST
Authenticated Required : NO
Authorized Required : NO
Body :
    {
        "username" : string,
        "password" : string
    }
Response Status : 200
    {
        "token": string
    }
Response Status : 500 internal server error
```

### api/merchant :

```sh
URL: http://localhost:4000/api/merchant
METHOD : DELETE
Authorized Required : YES (Bearer Token)
Body :
    {
        "username"      : string, // required
        "address"       : string, // required
        "join_date"     : string 
        "password"      : string,
        "phone_number"  : string
    }
Response Status : 200
Response Status : 500 internal server error
```

```
Usage
Make sure you have node.js installed on your computer and then run these commands :
$ npm install

For create database, run migration and run :
$ npm run build

create file .env
SECRET=SECRET

For opening, using app and run :
$ npm run dev

see documention with swagger :
http://localhost:4000/api-docs/#

Access the API via http://localhost:4000
```
