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
        "postgres://user:pass@localhost:5432/mydb",
        "mysql://root:password@127.0.0.1:3306/database",
        "mongodb://admin:secret123@mongo.example.com:27017/myapp",
        "redis://user:pass@redis.example.com:6379/0",
      ],
      shouldNotMatch: ["http://example.com", "invalid"],
    });
  });

  describe("MONGODB_CONNECTION_STRING", () => {
    testPolicySuite({
      policyName: "MONGODB_CONNECTION_STRING",
      replacement: "[REDACTED]",
      shouldMatch: [
        "mongodb://admin:secret123@mongo.example.com:27017/myapp",
        "mongodb+srv://user:pass@cluster0.mongodb.net/test",
      ],
      shouldNotMatch: ["mongodb://localhost", "invalid"],
    });
  });

  describe("REDIS_CONNECTION_STRING", () => {
    testPolicySuite({
      policyName: "REDIS_CONNECTION_STRING",
      replacement: "[REDACTED]",
      shouldMatch: [
        "redis://user:pass@redis.example.com:6379/0",
        "rediss://admin:secret@redis.internal:6380/1",
      ],
      shouldNotMatch: ["redis://localhost", "invalid"],
    });
  });

  describe("ELASTICSEARCH_URL", () => {
    testPolicySuite({
      policyName: "ELASTICSEARCH_URL",
      replacement: "[ELASTICSEARCH_URL]",
      shouldMatch: [
        "https://elasticsearch.example.com:9200",
        "http://localhost:9200/index",
      ],
      shouldNotMatch: ["https://example.com:8080", "invalid"],
    });
  });

  describe("RABBITMQ_CONNECTION_STRING", () => {
    testPolicySuite({
      policyName: "RABBITMQ_CONNECTION_STRING",
      replacement: "[REDACTED]",
      shouldMatch: [
        "amqp://guest:guest@localhost:5672/",
        "amqps://user:pass@rabbitmq.example.com:5671/vhost",
      ],
      shouldNotMatch: ["amqp://localhost", "invalid"],
    });
  });

  describe("POSTGRESQL_CONNECTION_STRING", () => {
    testPolicySuite({
      policyName: "POSTGRESQL_CONNECTION_STRING",
      replacement: "[REDACTED]",
      shouldMatch: [
        "postgres://user:pass@localhost:5432/mydb",
        "postgresql://admin:u$k9!fR2@qLx2@db:5432/mydb",
      ],
      shouldNotMatch: ["postgres://localhost", "invalid"],
    });
  });

  describe("MYSQL_CONNECTION_STRING", () => {
    testPolicySuite({
      policyName: "MYSQL_CONNECTION_STRING",
      replacement: "[REDACTED]",
      shouldMatch: [
        "mysql://root:password@127.0.0.1:3306/database",
        "mysql://admin:P@ssw0rd!@mysql.internal:3306/prod",
      ],
      shouldNotMatch: ["mysql://localhost", "invalid"],
    });
  });

  describe("CASSANDRA_CONNECTION_STRING", () => {
    testPolicySuite({
      policyName: "CASSANDRA_CONNECTION_STRING",
      replacement: "[REDACTED]",
      shouldMatch: [
        "cassandra://user:pass@cassandra.example.com:9042/keyspace",
      ],
      shouldNotMatch: ["cassandra://localhost", "invalid"],
    });
  });
});
