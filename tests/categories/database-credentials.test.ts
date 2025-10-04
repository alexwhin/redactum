import { describe, it, expect } from "vitest";
import { redactum } from "../../src/index.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("Database Credentials Redaction", () => {
  describe("PostgreSQL connection strings", () => {
    it("should redact basic PostgreSQL URLs", () => {
      const input = "postgres://user:pass@localhost:5432/mydb";
      const result = redactum(input, {
        policies: [
          "DATABASE_URL",
          "MONGODB_CONNECTION_STRING",
          "REDIS_CONNECTION_STRING",
          "RABBITMQ_CONNECTION_STRING",
          "POSTGRESQL_CONNECTION_STRING",
          "MYSQL_CONNECTION_STRING",
          "CASSANDRA_CONNECTION_STRING",
        ],
      });
      expect(result.redactedText).toBe(
        "postgres://[REDACTED]:[REDACTED]@localhost:5432/mydb"
      );
    });

    it("should redact PostgreSQL URLs with special characters in password", () => {
      const input = "postgres://admin:u$k9!fR2@qLx2@db:5432/mydb";
      const result = redactum(input, {
        policies: [
          "DATABASE_URL",
          "MONGODB_CONNECTION_STRING",
          "REDIS_CONNECTION_STRING",
          "RABBITMQ_CONNECTION_STRING",
          "POSTGRESQL_CONNECTION_STRING",
          "MYSQL_CONNECTION_STRING",
          "CASSANDRA_CONNECTION_STRING",
        ],
      });
      expect(result.redactedText).toBe(
        "postgres://[REDACTED]:[REDACTED]@db:5432/mydb"
      );
    });

    it("should redact postgresql:// variant", () => {
      const input = "postgresql://user:password@localhost:5432/db";
      const result = redactum(input, {
        policies: [
          "DATABASE_URL",
          "MONGODB_CONNECTION_STRING",
          "REDIS_CONNECTION_STRING",
          "RABBITMQ_CONNECTION_STRING",
          "POSTGRESQL_CONNECTION_STRING",
          "MYSQL_CONNECTION_STRING",
          "CASSANDRA_CONNECTION_STRING",
        ],
      });
      expect(result.redactedText).toBe(
        "postgresql://[REDACTED]:[REDACTED]@localhost:5432/db"
      );
    });

    it("should preserve connection string structure", () => {
      const input = "postgres://user:pass@host:5432/database";
      const result = redactum(input, {
        policies: [
          "DATABASE_URL",
          "MONGODB_CONNECTION_STRING",
          "REDIS_CONNECTION_STRING",
          "RABBITMQ_CONNECTION_STRING",
          "POSTGRESQL_CONNECTION_STRING",
          "MYSQL_CONNECTION_STRING",
          "CASSANDRA_CONNECTION_STRING",
        ],
      });
      expect(result.redactedText).toContain("@host:5432/database");
      expect(result.redactedText).not.toContain("user");
      expect(result.redactedText).not.toContain("pass");
    });
  });

  describe("MySQL connection strings", () => {
    it("should redact MySQL URLs", () => {
      const input = "mysql://root:password@127.0.0.1:3306/database";
      const result = redactum(input, {
        policies: [
          "DATABASE_URL",
          "MONGODB_CONNECTION_STRING",
          "REDIS_CONNECTION_STRING",
          "RABBITMQ_CONNECTION_STRING",
          "POSTGRESQL_CONNECTION_STRING",
          "MYSQL_CONNECTION_STRING",
          "CASSANDRA_CONNECTION_STRING",
        ],
      });
      expect(result.redactedText).toBe(
        "mysql://[REDACTED]:[REDACTED]@127.0.0.1:3306/database"
      );
    });

    it("should redact MySQL with special characters", () => {
      const input = "mysql://admin:P@ssw0rd!@mysql.internal:3306/prod";
      const result = redactum(input, {
        policies: [
          "DATABASE_URL",
          "MONGODB_CONNECTION_STRING",
          "REDIS_CONNECTION_STRING",
          "RABBITMQ_CONNECTION_STRING",
          "POSTGRESQL_CONNECTION_STRING",
          "MYSQL_CONNECTION_STRING",
          "CASSANDRA_CONNECTION_STRING",
        ],
      });
      expect(result.redactedText).toBe(
        "mysql://[REDACTED]:[REDACTED]@mysql.internal:3306/prod"
      );
    });
  });

  describe("MongoDB connection strings", () => {
    it("should redact MongoDB URLs", () => {
      const input = "mongodb://admin:secret123@mongo.example.com:27017/myapp";
      const result = redactum(input, {
        policies: [
          "DATABASE_URL",
          "MONGODB_CONNECTION_STRING",
          "REDIS_CONNECTION_STRING",
          "RABBITMQ_CONNECTION_STRING",
          "POSTGRESQL_CONNECTION_STRING",
          "MYSQL_CONNECTION_STRING",
          "CASSANDRA_CONNECTION_STRING",
        ],
      });
      expect(result.redactedText).toBe(
        "mongodb://[REDACTED]:[REDACTED]@mongo.example.com:27017/myapp"
      );
    });

    it("should redact MongoDB+srv URLs", () => {
      const input = "mongodb+srv://user:pass@cluster0.mongodb.net/test";
      const result = redactum(input, {
        policies: [
          "DATABASE_URL",
          "MONGODB_CONNECTION_STRING",
          "REDIS_CONNECTION_STRING",
          "RABBITMQ_CONNECTION_STRING",
          "POSTGRESQL_CONNECTION_STRING",
          "MYSQL_CONNECTION_STRING",
          "CASSANDRA_CONNECTION_STRING",
        ],
      });
      expect(result.redactedText).toBe(
        "mongodb+srv://[REDACTED]:[REDACTED]@cluster0.mongodb.net/test"
      );
    });
  });

  describe("Redis connection strings", () => {
    it("should redact Redis URLs", () => {
      const input = "redis://default:mypassword@redis-server:6379";
      const result = redactum(input, {
        policies: [
          "DATABASE_URL",
          "MONGODB_CONNECTION_STRING",
          "REDIS_CONNECTION_STRING",
          "RABBITMQ_CONNECTION_STRING",
          "POSTGRESQL_CONNECTION_STRING",
          "MYSQL_CONNECTION_STRING",
          "CASSANDRA_CONNECTION_STRING",
        ],
      });
      expect(result.redactedText).toBe(
        "redis://[REDACTED]:[REDACTED]@redis-server:6379"
      );
    });

    it("should redact rediss:// (secure) URLs", () => {
      const input = "rediss://user:pass@secure-redis:6380";
      const result = redactum(input, {
        policies: [
          "DATABASE_URL",
          "MONGODB_CONNECTION_STRING",
          "REDIS_CONNECTION_STRING",
          "RABBITMQ_CONNECTION_STRING",
          "POSTGRESQL_CONNECTION_STRING",
          "MYSQL_CONNECTION_STRING",
          "CASSANDRA_CONNECTION_STRING",
        ],
      });
      expect(result.redactedText).toBe(
        "rediss://[REDACTED]:[REDACTED]@secure-redis:6380"
      );
    });
  });

  describe("RabbitMQ connection strings", () => {
    it("should redact AMQP URLs", () => {
      const input = "amqp://guest:guest@rabbitmq:5672";
      const result = redactum(input, {
        policies: [
          "DATABASE_URL",
          "MONGODB_CONNECTION_STRING",
          "REDIS_CONNECTION_STRING",
          "RABBITMQ_CONNECTION_STRING",
          "POSTGRESQL_CONNECTION_STRING",
          "MYSQL_CONNECTION_STRING",
          "CASSANDRA_CONNECTION_STRING",
        ],
      });
      expect(result.redactedText).toBe(
        "amqp://[REDACTED]:[REDACTED]@rabbitmq:5672"
      );
    });

    it("should redact AMQPS URLs", () => {
      const input = "amqps://admin:secret@rabbitmq.secure:5671";
      const result = redactum(input, {
        policies: [
          "DATABASE_URL",
          "MONGODB_CONNECTION_STRING",
          "REDIS_CONNECTION_STRING",
          "RABBITMQ_CONNECTION_STRING",
          "POSTGRESQL_CONNECTION_STRING",
          "MYSQL_CONNECTION_STRING",
          "CASSANDRA_CONNECTION_STRING",
        ],
      });
      expect(result.redactedText).toBe(
        "amqps://[REDACTED]:[REDACTED]@rabbitmq.secure:5671"
      );
    });
  });

  describe("Cassandra connection strings", () => {
    it("should redact Cassandra URLs", () => {
      const input = "cassandra://user:pass@cassandra.local:9042/keyspace";
      const result = redactum(input, {
        policies: [
          "DATABASE_URL",
          "MONGODB_CONNECTION_STRING",
          "REDIS_CONNECTION_STRING",
          "RABBITMQ_CONNECTION_STRING",
          "POSTGRESQL_CONNECTION_STRING",
          "MYSQL_CONNECTION_STRING",
          "CASSANDRA_CONNECTION_STRING",
        ],
      });
      expect(result.redactedText).toBe(
        "cassandra://[REDACTED]:[REDACTED]@cassandra.local:9042/keyspace"
      );
    });
  });

  describe("Edge cases", () => {
    it("should handle passwords with @ symbols", () => {
      const input = "postgres://admin:p@ssw0rd@host:5432/db";
      const result = redactum(input, {
        policies: [
          "DATABASE_URL",
          "MONGODB_CONNECTION_STRING",
          "REDIS_CONNECTION_STRING",
          "RABBITMQ_CONNECTION_STRING",
          "POSTGRESQL_CONNECTION_STRING",
          "MYSQL_CONNECTION_STRING",
          "CASSANDRA_CONNECTION_STRING",
        ],
      });
      expect(result.redactedText).toBe(
        "postgres://[REDACTED]:[REDACTED]@host:5432/db"
      );
    });

    it("should handle passwords with multiple @ symbols", () => {
      const input = "postgres://admin:p@ss@w0rd@host:5432/db";
      const result = redactum(input, {
        policies: [
          "DATABASE_URL",
          "MONGODB_CONNECTION_STRING",
          "REDIS_CONNECTION_STRING",
          "RABBITMQ_CONNECTION_STRING",
          "POSTGRESQL_CONNECTION_STRING",
          "MYSQL_CONNECTION_STRING",
          "CASSANDRA_CONNECTION_STRING",
        ],
      });
      expect(result.redactedText).toBe(
        "postgres://[REDACTED]:[REDACTED]@host:5432/db"
      );
    });

    it("should handle passwords with colons", () => {
      const input = "postgres://admin:pa:ss:word@host:5432/db";
      const result = redactum(input, {
        policies: [
          "DATABASE_URL",
          "MONGODB_CONNECTION_STRING",
          "REDIS_CONNECTION_STRING",
          "RABBITMQ_CONNECTION_STRING",
          "POSTGRESQL_CONNECTION_STRING",
          "MYSQL_CONNECTION_STRING",
          "CASSANDRA_CONNECTION_STRING",
        ],
      });
      expect(result.redactedText).toBe(
        "postgres://[REDACTED]:[REDACTED]@host:5432/db"
      );
    });

    it("should handle ENV_VAR format with database URLs", () => {
      const input = "DATABASE=postgres://admin:secret@localhost:5432/db";
      const result = redactum(input);
      expect(result.redactedText).toBe(
        "DATABASE=postgres://[REDACTED]:[REDACTED]@localhost:5432/db"
      );
    });

    it("should prioritize database URL over ENV_VAR pattern", () => {
      const input = "DB_URL=postgres://user:pass@host:5432/db";
      const result = redactum(input);
      expect(result.redactedText).toContain(
        "postgres://[REDACTED]:[REDACTED]@"
      );
      expect(result.redactedText).not.toBe("[ENV_VAR]");
    });
  });

  describe("Findings metadata", () => {
    it("should report correct findings", () => {
      const input = "postgres://user:pass@localhost:5432/db";
      const result = redactum(input, {
        policies: [
          "DATABASE_URL",
          "MONGODB_CONNECTION_STRING",
          "REDIS_CONNECTION_STRING",
          "RABBITMQ_CONNECTION_STRING",
          "POSTGRESQL_CONNECTION_STRING",
          "MYSQL_CONNECTION_STRING",
          "CASSANDRA_CONNECTION_STRING",
        ],
      });

      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(
        PolicyCategory.DATABASE_CREDENTIALS
      );
      expect(result.findings[0]?.value).toBe(
        "postgres://user:pass@localhost:5432/db"
      );
    });

    it("should report statistics", () => {
      const input = "Connect to postgres://user:pass@localhost:5432/db";
      const result = redactum(input, {
        policies: [
          "DATABASE_URL",
          "MONGODB_CONNECTION_STRING",
          "REDIS_CONNECTION_STRING",
          "RABBITMQ_CONNECTION_STRING",
          "POSTGRESQL_CONNECTION_STRING",
          "MYSQL_CONNECTION_STRING",
          "CASSANDRA_CONNECTION_STRING",
        ],
      });

      expect(result.stats.totalFindings).toBe(1);
      expect(
        result.stats.findingsByCategory[PolicyCategory.DATABASE_CREDENTIALS]
      ).toBe(1);
    });
  });

  describe("Integration with default categories", () => {
    it("should work without specifying categories", () => {
      const input = "postgres://admin:secret@localhost:5432/db";
      const result = redactum(input);
      expect(result.redactedText).toBe(
        "postgres://[REDACTED]:[REDACTED]@localhost:5432/db"
      );
    });

    it("should not interfere with other patterns", () => {
      const input =
        "Email: john@example.com, DB: postgres://user:pass@localhost:5432/db";
      const result = redactum(input);
      expect(result.redactedText).toContain("[EMAIL]");
      expect(result.redactedText).toContain(
        "postgres://[REDACTED]:[REDACTED]@localhost:5432/db"
      );
    });
  });
});
