# Class Files

## Description

An online system that allows students and tutors to
communicate through files.

- Tech stack used: Nodejs, Nestjs, Postgres, Typescript

## Running the app

```bash

 # Method to run api on local
 - install node version 18.17.1
 - You can install specific node version using nvm
 - run npm i in root directory
 - setup your .env profile in the root directory, sample env provided in the root directory.
 - Add this file in your root directory
 -  npm run start
```

- **NOTE**: No need of SQL file to create tables as code automatically creates them in the DB.
- If setting up on local then set use base url as `localhost:3000`.

## Deployment

- This api has been hosted on render.
- Below is the Api endpoint.

```bash
# url
https://class-files-api.onrender.com
```

- Api Details are provided below.

### Assumptions and Prerequisites

- Authentication endpoint is public.
- Since requirement was to mock authentication signup and login endpoints are there.
- There can be 2 types of users: `student` and `tutor`
- While signing up `userType` has to mentioned in body(more details below)
- JWT authenticatoin has been implemented.
- Login api returns the token which has to be passed in protected apis.
- Guard implementation has been done for roles to restrict apis on roles level.
- For this service files are being uploaded locally in project directory.

### DB Design

```bash
# user
  id: number;
  username: string;
  password: string;
  userType: string;
  createdAt: Date;
  updatedAt: Date;

# classroom
  id: number;
  name: string;
  tutorId: number;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;

# classroom_student
  id: number;
  studentId: number;
  classroomId: number;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;

# file
  id: number;
  name: string;
  description: string;
  classroomId: number;
  uploadedBy: number;
  updatedBy: number;
  fileType: string;
  fileDetails: string;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
```

## Auth Api Details

1.  Signup (method POST)

    - endpoint -> `https://class-files-api.onrender.com/auth/signup`

    ```ruby
    curl --location 'https://class-files-api.onrender.com/auth/signup' \--header 'Content-Type: application/json' \--data '{
    "username":"muneeb",
    "password":"password",
    "userType":"tutor"}'
    ```

2.  Login (method POST)

    - endpoint -> `https://class-files-api.onrender.com/auth/login`

    ```ruby
    curl --location 'https://class-files-api.onrender.com/auth/login' \--header 'Content-Type: application/json' \--data '{
    "username":"muneeb",
    "password":"password"}'
    ```

## Class-files Api Details

1.  Add classroom (method POST)

    - endpoint -> `https://class-files-api.onrender.com/class-files/classroom`

    ```ruby
    curl --location 'https://class-files-api.onrender.com/class-files/classroom' \--header 'Content-Type: application/json' \--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im11bmVlYiIsInVzZXJJZCI6MiwidXNlclR5cGUiOiJ0dXRvciIsImlhdCI6MTY5NDcyMjM1MSwiZXhwIjoxNjk0NzQwMzUxfQ.TDT8JyGaetrLbym1lLsKTc58oI8z_Qh2iKe7NuRWQhA' \--data '{
    "name":"classroom1"}'
    ```

2.  Update classroom (method PATCH)
    - endpoint -> `https://class-files-api.onrender.com/class-files/classroom/:id`
    ```ruby
    curl --location --request PATCH 'https://class-files-api.onrender.com/class-files/classroom/1' \--header 'Content-Type: application/json' \--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im11bmVlYiIsInVzZXJJZCI6MSwidXNlclR5cGUiOiJ0dXRvciIsImlhdCI6MTY5NDYxNjMwOCwiZXhwIjoxNjk0NjM0MzA4fQ.HTX4o8pnFr2_VUxJ8ef2QiCO96R501xQy8y1PWGnQP0' \--data '{
    "name":"classroom1"}'
    ```
3.  Delete classroom (method Delete)

    - endpoint -> `https://class-files-api.onrender.com/class-files/classroom/:id`

    ```ruby
    curl --location --request DELETE 'https://class-files-api.onrender.com/class-files/classroom/1' \--header 'Content-Type: application/json' \--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im11bmVlYiBzdHVkZW50IiwidXNlcklkIjozLCJ1c2VyVHlwZSI6InN0dWRlbnQiLCJpYXQiOjE2OTQ2MzExNTksImV4cCI6MTY5NDY0OTE1OX0.874W8GkX2JDIcrcw3J6kOun6yIPcBLKsocv6GUye3N8'
    ```

4.  Add student to classroom (method Post)

    - endpoint -> `https://class-files-api.onrender.com/class-files/addStudent`

    ```ruby
    curl --location 'https://class-files-api.onrender.com/class-files/addStudent' \--header 'Content-Type: application/json' \--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im11bmVlYiIsInVzZXJJZCI6MSwidXNlclR5cGUiOiJ0dXRvciIsImlhdCI6MTY5NDYxNjMwOCwiZXhwIjoxNjk0NjM0MzA4fQ.HTX4o8pnFr2_VUxJ8ef2QiCO96R501xQy8y1PWGnQP0' \--data '{
    "classroomId":1,
    "studentId":1}'
    ```

5.  Get class feed (method GET)

    - endpoint -> `https://class-files-api.onrender.com/class-files/class-feed`

    ```ruby
    curl --location 'https://class-files-api.onrender.com/class-files/class-feed' \--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im11bmVlYiBzdHVkZW50IiwidXNlcklkIjozLCJ1c2VyVHlwZSI6InN0dWRlbnQiLCJpYXQiOjE2OTQ2MzExNTksImV4cCI6MTY5NDY0OTE1OX0.874W8GkX2JDIcrcw3J6kOun6yIPcBLKsocv6GUye3N8'
    ```

6.  Get files feed (method GET)

    - endpoint -> `https://class-files-api.onrender.com/class-files/files/:classroomId`

    ```ruby
    curl --location 'https://class-files-api.onrender.com/class-files/files/1' \--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im11bmVlYiIsInVzZXJJZCI6MiwidXNlclR5cGUiOiJ0dXRvciIsImlhdCI6MTY5NDcyMjM1MSwiZXhwIjoxNjk0NzQwMzUxfQ.TDT8JyGaetrLbym1lLsKTc58oI8z_Qh2iKe7NuRWQhA'
    ```

7.  Add file (method POST)

    - endpoint -> `https://class-files-api.onrender.com/class-files/file`

    ```ruby
    curl --location 'https://class-files-api.onrender.com/class-files/file' \--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im11bmVlYiIsInVzZXJJZCI6MiwidXNlclR5cGUiOiJ0dXRvciIsImlhdCI6MTY5NDcyMjM1MSwiZXhwIjoxNjk0NzQwMzUxfQ.TDT8JyGaetrLbym1lLsKTc58oI8z_Qh2iKe7NuRWQhA' \--form 'file=@"/Users/muneebadil/Downloads/file_example_MP3_700KB.mp3"' \--form 'name="myMusic"' \--form 'description="description"' \--form 'classroomId="1"' \--form 'fileType="audio"' \--form 'fileDetails="file detail"'
    ```

    - **NOTE**: Attach the file in postman again

8.  Rename file (method PATCH)

    - endpoint -> `https://class-files-api.onrender.com/class-files/file/:id`

    ```ruby
    curl --location --request PATCH 'https://class-files-api.onrender.com/class-files/file/2' \--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im11bmVlYiIsInVzZXJJZCI6MSwidXNlclR5cGUiOiJ0dXRvciIsImlhdCI6MTY5NDYyNzQwMywiZXhwIjoxNjk0NjQ1NDAzfQ.V4rO91fWQCCF0W2UpC23y9KQBApTtE2xdbaIXGr_RY8' \--header 'Content-Type: application/json' \--data '{
    "newName":"mynewfile"}'
    ```

9.  Delete classroom (method Delete)
    - endpoint -> `https://class-files-api.onrender.com/class-files/file/:id`
    ```ruby
    curl --location --request DELETE 'https://class-files-api.onrender.com/class-files/file/2' \--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im11bmVlYiIsInVzZXJJZCI6MSwidXNlclR5cGUiOiJ0dXRvciIsImlhdCI6MTY5NDYyNzQwMywiZXhwIjoxNjk0NjQ1NDAzfQ.V4rO91fWQCCF0W2UpC23y9KQBApTtE2xdbaIXGr_RY8' \--header 'Content-Type: application/json'
    ```
