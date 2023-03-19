# Project: E-commerce Transaction
# 📁 Collection: user 


## End-point: Get List
### Method: GET
>```
>{{BASE_URL}}/api/{{API_VERSION}}/user?order_by=codot&order_type=DESC
>```
### Query Params

|Param|value|
|---|---|
|pagination|true|
|page|1|
|row|2|
|search|satu|
|order_by|codot|
|order_type|DESC|


### Response: 200
```json
{
    "code": 200,
    "response": {
        "count": 3,
        "rows": [
            {
                "id": 1,
                "name": "User Satu",
                "created_at": "2023-03-18T15:30:37.997Z"
            },
            {
                "id": 2,
                "name": "User Dua",
                "created_at": "2023-03-18T15:30:37.997Z"
            },
            {
                "id": 3,
                "name": "User Tiga",
                "created_at": "2023-03-18T15:30:37.997Z"
            }
        ]
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get Detail
### Method: GET
>```
>{{BASE_URL}}/api/{{API_VERSION}}/user/:userId
>```
### Response: 200
```json
{
    "code": 200,
    "response": {
        "id": 1,
        "name": "User Satu",
        "created_at": "2023-03-18T15:30:37.997Z",
        "updated_at": "2023-03-18T15:30:37.997Z",
        "deleted_at": null
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: product 


## End-point: Get List
### Method: GET
>```
>{{BASE_URL}}/api/{{API_VERSION}}/product?order_by=name&order_type=DESC
>```
### Query Params

|Param|value|
|---|---|
|pagination|true|
|page|1|
|row|2|
|search|satu|
|order_by|name|
|order_type|DESC|


### Response: 200
```json
{
    "code": 200,
    "response": {
        "count": 3,
        "rows": [
            {
                "id": 3,
                "name": "Product C",
                "price": 30000,
                "stock": 3
            },
            {
                "id": 2,
                "name": "Product B",
                "price": 20000,
                "stock": 25
            },
            {
                "id": 1,
                "name": "Product A",
                "price": 10000,
                "stock": 10
            }
        ]
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get Detail
### Method: GET
>```
>{{BASE_URL}}/api/{{API_VERSION}}/product/:productId
>```
### Response: 200
```json
{
    "code": 200,
    "response": {
        "id": 2,
        "name": "Product B",
        "price": 20000,
        "description": "Description B",
        "stock": 24,
        "stock_alert": 5,
        "created_at": "2023-03-18T15:30:29.750Z",
        "updated_at": "2023-03-19T07:33:46.033Z",
        "deleted_at": null
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: transaction 


## End-point: Get List
### Method: GET
>```
>{{BASE_URL}}/api/{{API_VERSION}}/transaction?order_by=id&order_type=DESC
>```
### Query Params

|Param|value|
|---|---|
|pagination|true|
|page|1|
|row|2|
|search|satu|
|order_by|id|
|order_type|DESC|


### Response: 200
```json
{
    "code": 200,
    "response": {
        "count": 20,
        "rows": [
            {
                "id": 20,
                "user_id": 2,
                "product_id": 2,
                "quantity": 1,
                "created_at": "2023-03-19T07:36:48.044Z"
            },
            {
                "id": 19,
                "user_id": 2,
                "product_id": 2,
                "quantity": 1,
                "created_at": "2023-03-19T07:33:46.039Z"
            },
            {
                "id": 18,
                "user_id": 2,
                "product_id": 1,
                "quantity": 1,
                "created_at": "2023-03-19T05:04:48.371Z"
            },
            {
                "id": 17,
                "user_id": 1,
                "product_id": 1,
                "quantity": 1,
                "created_at": "2023-03-19T05:04:48.368Z"
            },
            {
                "id": 16,
                "user_id": 2,
                "product_id": 1,
                "quantity": 1,
                "created_at": "2023-03-19T05:04:48.364Z"
            },
            {
                "id": 15,
                "user_id": 1,
                "product_id": 1,
                "quantity": 1,
                "created_at": "2023-03-19T05:04:48.360Z"
            },
            {
                "id": 14,
                "user_id": 3,
                "product_id": 1,
                "quantity": 1,
                "created_at": "2023-03-19T05:04:48.355Z"
            },
            {
                "id": 13,
                "user_id": 3,
                "product_id": 1,
                "quantity": 1,
                "created_at": "2023-03-19T05:04:48.350Z"
            },
            {
                "id": 12,
                "user_id": 1,
                "product_id": 1,
                "quantity": 1,
                "created_at": "2023-03-19T05:04:48.345Z"
            },
            {
                "id": 11,
                "user_id": 2,
                "product_id": 1,
                "quantity": 1,
                "created_at": "2023-03-19T05:04:48.336Z"
            }
        ]
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Create
### Method: POST
>```
>{{BASE_URL}}/api/{{API_VERSION}}/transaction
>```
### Headers

|Content-Type|Value|
|---|---|
|x-user-id|1|


### Response: 201
```json
{
    "code": 201,
    "response": {
        "id": 1,
        "user_id": 1,
        "product_id": 1,
        "quantity": 2,
        "updated_at": "2023-03-19T04:03:06.333Z",
        "created_at": "2023-03-19T04:03:06.333Z",
        "deleted_at": null
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
_________________________________________________
Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
