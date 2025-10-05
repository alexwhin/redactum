---
prev: false
next: false
search: false
---

# Database Credentials Test Cases

[← Back to Test Cases](/api/test-cases)

This page shows 82 test cases that validate Database Credentials patterns.

| Policy | Test Case |
|--------|-----------|
| `DATABASE_URL` | `postgres://user:pass@localhost:5432/mydb` |
| `DATABASE_URL` | `mysql://root:password@127.0.0.1:3306/database` |
| `DATABASE_URL` | `mongodb://admin:secret123@mongo.example.com:27017/myapp` |
| `DATABASE_URL` | `redis://user:pass@redis.example.com:6379/0` |
| `DATABASE_URL` | `postgres://dbuser:complexPass123@db.internal:5432/prod` |
| `DATABASE_URL` | `mysql://app:dbpass123@mysql.local:3307/appdb` |
| `DATABASE_URL` | `mongodb://user:secret@mongo.local:27017/data` |
| `DATABASE_URL` | `redis://cache:token@redis.internal:6380/1` |
| `MONGODB_CONNECTION_STRING` | `mongodb://admin:secret123@mongo.example.com:27017/myapp` |
| `MONGODB_CONNECTION_STRING` | `mongodb+srv://user:pass@cluster0.mongodb.net/test` |
| `MONGODB_CONNECTION_STRING` | `mongodb://dbuser:P@ssw0rd!@mongo.internal:27018/production` |
| `MONGODB_CONNECTION_STRING` | `mongodb+srv://app:token123@cluster1.abcde.mongodb.net/mydb` |
| `MONGODB_CONNECTION_STRING` | `mongodb://root:rootpass@mongo1.example.com:27017,mongo2.example.com:27017/admin` |
| `MONGODB_CONNECTION_STRING` | `mongodb://user:pass@10.0.0.1:27017/database` |
| `MONGODB_CONNECTION_STRING` | `mongodb://readonly:viewer@mongo.example.com:27017/reports?authSource=admin` |
| `MONGODB_CONNECTION_STRING` | `mongodb+srv://analytics:key789@analytics-cluster.mongodb.net/metrics` |
| `REDIS_CONNECTION_STRING` | `redis://user:pass@redis.example.com:6379/0` |
| `REDIS_CONNECTION_STRING` | `rediss://admin:secret@redis.internal:6380/1` |
| `REDIS_CONNECTION_STRING` | `redis://cache:c@cheP@ss@redis.local:6379/2` |
| `REDIS_CONNECTION_STRING` | `rediss://app:token123@redis-cluster.example.com:6380/0` |
| `REDIS_CONNECTION_STRING` | `redis://default:mypassword@10.0.0.5:6379/3` |
| `REDIS_CONNECTION_STRING` | `redis://user:p@ss!word@redis.example.com:6379/0` |
| `REDIS_CONNECTION_STRING` | `rediss://secure:Str0ng!P@ss@secure-redis.internal:6380/1` |
| `REDIS_CONNECTION_STRING` | `redis://session:sess123@session-redis.example.com:6379/5` |
| `ELASTICSEARCH_URL` | `https://elasticsearch.example.com:9200` |
| `ELASTICSEARCH_URL` | `http://localhost:9200/index` |
| `ELASTICSEARCH_URL` | `https://es-cluster.internal:9200/_search` |
| `ELASTICSEARCH_URL` | `http://10.0.0.10:9200/_cat/indices` |
| `ELASTICSEARCH_URL` | `https://elastic.example.com:9200/_cluster/health` |
| `ELASTICSEARCH_URL` | `http://elasticsearch.local:9200/myindex/_doc/1` |
| `ELASTICSEARCH_URL` | `https://es.prod.example.com:9200/_bulk` |
| `ELASTICSEARCH_URL` | `http://search.example.com:9200/logs-2024/_search` |
| `RABBITMQ_CONNECTION_STRING` | `amqp://guest:guest@localhost:5672/` |
| `RABBITMQ_CONNECTION_STRING` | `amqps://user:pass@rabbitmq.example.com:5671/vhost` |
| `RABBITMQ_CONNECTION_STRING` | `amqp://admin:P@ssw0rd!@rabbit.internal:5672/production` |
| `RABBITMQ_CONNECTION_STRING` | `amqps://app:secret123@rabbitmq-cluster.example.com:5671/app-vhost` |
| `RABBITMQ_CONNECTION_STRING` | `amqp://mquser:mqpass@10.0.0.20:5672/dev` |
| `RABBITMQ_CONNECTION_STRING` | `amqps://publisher:pub123@rmq.example.com:5671/events` |
| `RABBITMQ_CONNECTION_STRING` | `amqp://consumer:cons456@rabbit.local:5672/tasks` |
| `RABBITMQ_CONNECTION_STRING` | `amqps://service:Str0ng!P@ss@secure-rabbit.internal:5671/services` |
| `POSTGRESQL_CONNECTION_STRING` | `postgres://user:pass@localhost:5432/mydb` |
| `POSTGRESQL_CONNECTION_STRING` | `postgresql://admin:u$k9!fR2@qLx2@db:5432/mydb` |
| `POSTGRESQL_CONNECTION_STRING` | `postgres://dbuser:P@ssw0rd!@pg.internal:5432/production` |
| `POSTGRESQL_CONNECTION_STRING` | `postgresql://app:dbpass123@postgres.example.com:5433/appdb` |
| `POSTGRESQL_CONNECTION_STRING` | `postgres://readonly:viewer@10.0.0.30:5432/analytics` |
| `POSTGRESQL_CONNECTION_STRING` | `postgresql://root:rootpass@pg-primary.local:5432/master` |
| `POSTGRESQL_CONNECTION_STRING` | `postgres://service:Str0ng!P@ss@postgres-cluster.internal:5432/services` |
| `POSTGRESQL_CONNECTION_STRING` | `postgresql://analytics:key789@pg.example.com:5432/metrics` |
| `MYSQL_CONNECTION_STRING` | `mysql://root:password@127.0.0.1:3306/database` |
| `MYSQL_CONNECTION_STRING` | `mysql://admin:P@ssw0rd!@mysql.internal:3306/prod` |
| `MYSQL_CONNECTION_STRING` | `mysql://dbuser:dbpass123@mysql.example.com:3307/appdb` |
| `MYSQL_CONNECTION_STRING` | `mysql://app:secret123@mysql-primary.local:3306/application` |
| `MYSQL_CONNECTION_STRING` | `mysql://readonly:viewer@10.0.0.40:3306/analytics` |
| `MYSQL_CONNECTION_STRING` | `mysql://service:Str0ng!P@ss@mysql-cluster.internal:3306/services` |
| `MYSQL_CONNECTION_STRING` | `mysql://webapp:web123@mysql.example.com:3306/webapp_prod` |
| `MYSQL_CONNECTION_STRING` | `mysql://backup:backup789@mysql-replica.local:3306/backupdb` |
| `CASSANDRA_CONNECTION_STRING` | `cassandra://user:pass@cassandra.example.com:9042/keyspace` |
| `CASSANDRA_CONNECTION_STRING` | `cassandra://admin:P@ssw0rd!@cassandra.internal:9042/prod_keyspace` |
| `CASSANDRA_CONNECTION_STRING` | `cassandra://dbuser:secret123@cassandra-cluster.example.com:9042/analytics` |
| `CASSANDRA_CONNECTION_STRING` | `cassandra://app:apppass@10.0.0.50:9042/app_keyspace` |
| `CASSANDRA_CONNECTION_STRING` | `cassandra://readonly:viewer@cassandra.local:9042/metrics` |
| `CASSANDRA_CONNECTION_STRING` | `cassandra://service:Str0ng!P@ss@cassandra-prod.internal:9042/services` |
| `CASSANDRA_CONNECTION_STRING` | `cassandra://webapp:web789@cassandra.example.com:9042/session_store` |
| `CASSANDRA_CONNECTION_STRING` | `cassandra://timeseries:ts123@cassandra-ts.local:9042/timeseries_data` |
| `JDBC_CONNECTION_STRING` | `jdbc:mysql://dbuser:dbpass@localhost:3306/mydb` |
| `JDBC_CONNECTION_STRING` | `jdbc:postgresql://admin:secret123@postgres.example.com:5432/proddb` |
| `JDBC_CONNECTION_STRING` | `jdbc:oracle://oracleuser:oraclepass@oracle.internal:1521/ORCL` |
| `JDBC_CONNECTION_STRING` | `jdbc:sqlserver://sqluser:sqlpass@sqlserver.local:1433/master` |
| `JDBC_CONNECTION_STRING` | `jdbc:mariadb://mariauser:mariapass@mariadb.example.com:3307/webapp` |
| `JDBC_CONNECTION_STRING` | `jdbc:h2://h2user:h2pass@mem:testdb` |
| `JDBC_CONNECTION_STRING` | `jdbc:derby://derbyuser:derbypass@derby.local:1527/sampledb` |
| `JDBC_CONNECTION_STRING` | `jdbc:db2://db2user:db2pass@db2.example.com:50000/testdb` |
| `JDBC_CONNECTION_STRING` | `jdbc:informix://infuser:infpass@informix.local:9088/stores_demo` |
| `SMTP_CONNECTION_STRING` | `smtp://user:password@smtp.gmail.com:587` |
| `SMTP_CONNECTION_STRING` | `smtps://admin:secret123@smtp.example.com:465` |
| `SMTP_CONNECTION_STRING` | `smtp://noreply:mailpass@smtp.sendgrid.net:587` |
| `SMTP_CONNECTION_STRING` | `smtps://mailuser:mailpass@smtp.office365.com:587` |
| `SMTP_CONNECTION_STRING` | `smtp://app:apppass123@smtp.mailgun.org:587` |
| `SMTP_CONNECTION_STRING` | `smtps://service:P@ssw0rd!@smtp.aws.amazon.com:465` |
| `SMTP_CONNECTION_STRING` | `smtp://contact:contact123@smtp.zoho.com:587` |
| `SMTP_CONNECTION_STRING` | `smtps://alerts:alert456@smtp.custom.com:465` |
| `SMTP_CONNECTION_STRING` | `smtp://notifications:n0tify@smtp.internal.local:25` |
