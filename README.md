# Oneshot AI assignment | Backend

## Setup
1. Clone server repo
```sh
git clone https://github.com/arpancodes/oneshotai-be.git; cd oneshotai-be
```
2. install packages
```sh
npm i
```
4. Start local server
```sh
npm run dev
```

5. Clone client repo
```sh
git clone https://github.com/arpancodes/oneshotai-fe.git; cd oneshotai-fe
```
6. install packages
```sh
npm i
```
4. Start client server
```sh
npm start
```


## Routes
1. seed initial data (100 colleges and 100 students)
```
GET /seed
```

1. Randomly seed 500 students
```
GET /seed/random
```

3. Get all colleges (paginated, add states and courses as filters)
```
GET /colleges?page=1&states=Bihar&courses=IT
```

4. Get individual college details by collegeid
```
GET /college/:id
```

5. Get similar colleges
```
GET /college/:id/similar
```

6. Get students of a college
```
GET /college/:id/students
```

7. Get student details of a college by `studentId`
```
GET /college/:id/students/:studentId
```

8. Get statistics of colleges by `states`
```
GET /college/:id/stats/states
```

9. Get statistics of colleges by `courses`
```
GET /college/:id/stats/courses
```
