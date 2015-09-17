# Requirements

1. Install Redis
Visit [redis download page] (http://redis.io/download) and follow steps

2. Install Postgres
Visit [download page] (http://www.postgresql.org/download/) and follow steps for your OS

3. Additionally install tcl package to test redis install (only linux):
```
yum install tcl
```

##Setup Postgresql
Database name: pionix_test

Database user: postgres

Password: pass

## Start Redis Server
While in folder where redis is installed run:
```
src/redis-server &
```


## Projects CRUD
CRUD methods for projects can imported into Postman from [here] (https://www.getpostman.com/collections/47ffd60027666fe2b9b8)

