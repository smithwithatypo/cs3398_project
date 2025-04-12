import mongoose from "mongoose";
import connectDB, { getMongoURI } from "../../db.js";
import { describe, test, expect, vi, beforeEach } from "vitest";

describe("Database Connection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("connects to MongoDB successfully", async () => {
    // Set a test URI for the connection.
    process.env.MONGO_URI = "mongodb://127.0.0.1:27017/testDB";
    
    // Mock mongoose.connect to resolve.
    vi.spyOn(mongoose, "connect").mockImplementation(() => Promise.resolve());
    
    // Since your production code still calls connection.db(),
    // we need to simulate that via mongoose.connection.getClient.
    mongoose.connection.getClient = () => ({
      db: () => ({ name: "fakeDb" })
    });
    
    // Now call the connection function.
    const dbInstance = await connectDB();

    // Check that mongoose.connect was called with the expected arguments.
    expect(mongoose.connect).toHaveBeenCalledWith("mongodb://127.0.0.1:27017/testDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // Check that the returned DB instance is our fake one.
    expect(dbInstance).toEqual({ name: "fakeDb" });
  });

  test("handles connection failure", async () => {
    const error = new Error("connection error");
    vi.spyOn(mongoose, "connect").mockRejectedValue(error);
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const processExitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});

    await connectDB();

    expect(consoleErrorSpy).toHaveBeenCalledWith("MongoDB connection failed:", error);
    expect(processExitSpy).toHaveBeenCalledWith(1);

    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });

  test("constructs the correct connection URI from environment variables", () => {
    process.env.DB_HOST = "127.0.0.1";
    process.env.DB_PORT = "27017";
    process.env.DB_NAME = "testDB";

    const expectedURI = "mongodb://127.0.0.1:27017/testDB";
    const uri = getMongoURI();

    expect(uri).toBe(expectedURI);
  });
});
