import { describe } from "vitest";
import {
  testPolicySuite,
  testCategoryCoverage,
} from "../policy-test-helpers.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("Database Credentials Redaction", () => {
  testCategoryCoverage(PolicyCategory.DATABASE_CREDENTIALS, [
    "DATABASE_URL",
    "MONGODB_CONNECTION_STRING",
    "REDIS_CONNECTION_STRING",
    "ELASTICSEARCH_URL",
    "RABBITMQ_CONNECTION_STRING",
    "POSTGRESQL_CONNECTION_STRING",
    "MYSQL_CONNECTION_STRING",
    "CASSANDRA_CONNECTION_STRING",
  ]);

  describe("DATABASE_URL", () => {
    testPolicySuite({
      policyName: "DATABASE_URL",
      replacement: "[REDACTED]",
      shouldMatch: [
        "postgres://user:pass@localhost:5432/mydb", // PostgreSQL with credentials
        "mysql://root:password@127.0.0.1:3306/database", // MySQL with password
        "mongodb://admin:secret123@mongo.example.com:27017/myapp", // MongoDB with auth
        "redis://user:pass@redis.example.com:6379/0", // Redis with credentials
        "postgres://dbuser:complexPass123@db.internal:5432/prod", // PostgreSQL special chars
        "mysql://app:dbpass123@mysql.local:3307/appdb", // MySQL custom port
        "mongodb://user:secret@mongo.local:27017/data", // MongoDB local
        "redis://cache:token@redis.internal:6380/1", // Redis with DB number
      ],
      shouldNotMatch: [
        "postgresql://dbuser:P@ssw0rd!@db.internal:5432/prod", // postgresql scheme not supported (use postgres)
        "mariadb://maria:secret@mariadb.example.com:3306/data", // mariadb scheme not supported
        "sqlite://user:pass@/var/db/app.db", // sqlite scheme not supported
        "mssql://sa:StrongP@ss1@sqlserver.internal:1433/master", // mssql scheme not supported
        "oracle://system:oracle@oracle.example.com:1521/orcl", // oracle scheme not supported
        "http://example.com", // HTTP not database URL
        "invalid", // plain text
        "postgres://localhost", // missing credentials
        "mysql://user@host/db", // missing password
        "ftp://user:pass@server:21/file", // FTP not database
        "https://api.example.com", // HTTPS not database URL
      ],
    });
  });

  describe("MONGODB_CONNECTION_STRING", () => {
    testPolicySuite({
      policyName: "MONGODB_CONNECTION_STRING",
      replacement: "[REDACTED]",
      shouldMatch: [
        "mongodb://admin:secret123@mongo.example.com:27017/myapp", // standard MongoDB with auth
        "mongodb+srv://user:pass@cluster0.mongodb.net/test", // MongoDB Atlas cluster
        "mongodb://dbuser:P@ssw0rd!@mongo.internal:27018/production", // special chars in password
        "mongodb+srv://app:token123@cluster1.abcde.mongodb.net/mydb", // Atlas with specific cluster
        "mongodb://root:rootpass@mongo1.example.com:27017,mongo2.example.com:27017/admin", // replica set
        "mongodb://user:pass@10.0.0.1:27017/database", // IP address host
        "mongodb://readonly:viewer@mongo.example.com:27017/reports?authSource=admin", // with auth source
        "mongodb+srv://analytics:key789@analytics-cluster.mongodb.net/metrics", // analytics use case
      ],
      shouldNotMatch: [
        "mongodb://localhost", // missing credentials
        "invalid", // plain text
        "mongodb://mongo.example.com", // missing credentials
        "http://mongodb.com", // HTTP not MongoDB URL
        "mongodb://user@host/db", // missing password
        "mongodb+srv://cluster.mongodb.net", // missing credentials
      ],
    });
  });

  describe("REDIS_CONNECTION_STRING", () => {
    testPolicySuite({
      policyName: "REDIS_CONNECTION_STRING",
      replacement: "[REDACTED]",
      shouldMatch: [
        "redis://user:pass@redis.example.com:6379/0", // standard Redis with DB 0
        "rediss://admin:secret@redis.internal:6380/1", // Redis SSL with DB 1
        "redis://cache:c@cheP@ss@redis.local:6379/2", // special chars in password
        "rediss://app:token123@redis-cluster.example.com:6380/0", // SSL cluster
        "redis://default:mypassword@10.0.0.5:6379/3", // IP address with DB 3
        "redis://user:p@ss!word@redis.example.com:6379/0", // exclamation in password
        "rediss://secure:Str0ng!P@ss@secure-redis.internal:6380/1", // strong password SSL
        "redis://session:sess123@session-redis.example.com:6379/5", // session store
      ],
      shouldNotMatch: [
        "redis://localhost", // missing credentials
        "invalid", // plain text
        "redis://redis.example.com", // missing credentials
        "http://redis.com", // HTTP not Redis URL
        "redis://user@host/0", // missing password
        "redis://host:6379", // missing user and password
      ],
    });
  });

  describe("ELASTICSEARCH_URL", () => {
    testPolicySuite({
      policyName: "ELASTICSEARCH_URL",
      replacement: "[ELASTICSEARCH_URL]",
      shouldMatch: [
        "https://elasticsearch.example.com:9200", // HTTPS Elasticsearch
        "http://localhost:9200/index", // local with index
        "https://es-cluster.internal:9200/_search", // cluster with search endpoint
        "http://10.0.0.10:9200/_cat/indices", // IP with cat API
        "https://elastic.example.com:9200/_cluster/health", // cluster health check
        "http://elasticsearch.local:9200/myindex/_doc/1", // document endpoint
        "https://es.prod.example.com:9200/_bulk", // bulk API endpoint
        "http://search.example.com:9200/logs-2024/_search", // logs index search
      ],
      shouldNotMatch: [
        "https://example.com:8080", // wrong port
        "invalid", // plain text
        "http://localhost:3000", // wrong port
        "elasticsearch.example.com", // missing protocol
      ],
    });
  });

  describe("RABBITMQ_CONNECTION_STRING", () => {
    testPolicySuite({
      policyName: "RABBITMQ_CONNECTION_STRING",
      replacement: "[REDACTED]",
      shouldMatch: [
        "amqp://guest:guest@localhost:5672/", // default RabbitMQ
        "amqps://user:pass@rabbitmq.example.com:5671/vhost", // SSL with vhost
        "amqp://admin:P@ssw0rd!@rabbit.internal:5672/production", // production vhost
        "amqps://app:secret123@rabbitmq-cluster.example.com:5671/app-vhost", // cluster SSL
        "amqp://mquser:mqpass@10.0.0.20:5672/dev", // IP with dev vhost
        "amqps://publisher:pub123@rmq.example.com:5671/events", // events vhost
        "amqp://consumer:cons456@rabbit.local:5672/tasks", // tasks queue
        "amqps://service:Str0ng!P@ss@secure-rabbit.internal:5671/services", // secure services
      ],
      shouldNotMatch: [
        "amqp://localhost", // missing credentials
        "invalid", // plain text
        "amqp://rabbitmq.example.com", // missing credentials
        "http://rabbitmq.com", // HTTP not AMQP
        "amqp://user@host/vhost", // missing password
        "amqps://host:5671", // missing user and password
      ],
    });
  });

  describe("POSTGRESQL_CONNECTION_STRING", () => {
    testPolicySuite({
      policyName: "POSTGRESQL_CONNECTION_STRING",
      replacement: "[REDACTED]",
      shouldMatch: [
        "postgres://user:pass@localhost:5432/mydb", // standard PostgreSQL
        "postgresql://admin:u$k9!fR2@qLx2@db:5432/mydb", // complex password with special chars
        "postgres://dbuser:P@ssw0rd!@pg.internal:5432/production", // production database
        "postgresql://app:dbpass123@postgres.example.com:5433/appdb", // custom port
        "postgres://readonly:viewer@10.0.0.30:5432/analytics", // IP with analytics DB
        "postgresql://root:rootpass@pg-primary.local:5432/master", // primary node
        "postgres://service:Str0ng!P@ss@postgres-cluster.internal:5432/services", // cluster
        "postgresql://analytics:key789@pg.example.com:5432/metrics", // metrics database
      ],
      shouldNotMatch: [
        "postgres://localhost", // missing credentials
        "invalid", // plain text
        "postgres://pg.example.com", // missing credentials
        "http://postgres.com", // HTTP not PostgreSQL
        "postgres://user@host/db", // missing password
        "postgresql://host:5432", // missing user and password
      ],
    });
  });

  describe("MYSQL_CONNECTION_STRING", () => {
    testPolicySuite({
      policyName: "MYSQL_CONNECTION_STRING",
      replacement: "[REDACTED]",
      shouldMatch: [
        "mysql://root:password@127.0.0.1:3306/database", // local MySQL with root
        "mysql://admin:P@ssw0rd!@mysql.internal:3306/prod", // production with special chars
        "mysql://dbuser:dbpass123@mysql.example.com:3307/appdb", // custom port
        "mysql://app:secret123@mysql-primary.local:3306/application", // primary node
        "mysql://readonly:viewer@10.0.0.40:3306/analytics", // IP with readonly user
        "mysql://service:Str0ng!P@ss@mysql-cluster.internal:3306/services", // cluster
        "mysql://webapp:web123@mysql.example.com:3306/webapp_prod", // web application
        "mysql://backup:backup789@mysql-replica.local:3306/backupdb", // replica for backups
      ],
      shouldNotMatch: [
        "mysql://localhost", // missing credentials
        "invalid", // plain text
        "mysql://mysql.example.com", // missing credentials
        "http://mysql.com", // HTTP not MySQL
        "mysql://user@host/db", // missing password
        "mysql://host:3306", // missing user and password
      ],
    });
  });

  describe("CASSANDRA_CONNECTION_STRING", () => {
    testPolicySuite({
      policyName: "CASSANDRA_CONNECTION_STRING",
      replacement: "[REDACTED]",
      shouldMatch: [
        "cassandra://user:pass@cassandra.example.com:9042/keyspace", // standard Cassandra
        "cassandra://admin:P@ssw0rd!@cassandra.internal:9042/prod_keyspace", // production keyspace
        "cassandra://dbuser:secret123@cassandra-cluster.example.com:9042/analytics", // cluster analytics
        "cassandra://app:apppass@10.0.0.50:9042/app_keyspace", // IP with app keyspace
        "cassandra://readonly:viewer@cassandra.local:9042/metrics", // readonly metrics
        "cassandra://service:Str0ng!P@ss@cassandra-prod.internal:9042/services", // production services
        "cassandra://webapp:web789@cassandra.example.com:9042/session_store", // session storage
        "cassandra://timeseries:ts123@cassandra-ts.local:9042/timeseries_data", // time series data
      ],
      shouldNotMatch: [
        "cassandra://localhost", // missing credentials
        "invalid", // plain text
        "cassandra://cassandra.example.com", // missing credentials
        "http://cassandra.com", // HTTP not Cassandra
        "cassandra://user@host/keyspace", // missing password
        "cassandra://host:9042", // missing user and password
      ],
    });
  });
});
