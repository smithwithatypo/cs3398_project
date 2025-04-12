// db.test.js
import mongoose from "mongoose";
import connectDB, { getMongoURI } from "../../db.js"; // Adjust the path if needed
import { describe, test, expect, vi, beforeEach } from "vitest";

describe("Database Connection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("connects to MongoDB successfully", async () => {
    // Set a test URI for the connection.
    process.env.MONGO_URI = "mongodb://127.0.0.1:27017/testDB";
    
    // Mock mongoose.connect to resolve successfully.
    const fakeConnection = Promise.resolve({
      db: () => ({ name: "fakeDb" })
    });
    vi.spyOn(mongoose, "connect").mockImplementation(() => fakeConnection);

    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledWith("mongodb://127.0.0.1:27017/testDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  test("handles connection failure", async () => {
    // Simulate a connection error.
    const error = new Error("connection error");
    vi.spyOn(mongoose, "connect").mockRejectedValue(error);

    // Spy on console.error and process.exit to verify error handling.
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const processExitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});

    await connectDB();

    expect(consoleErrorSpy).toHaveBeenCalledWith("MongoDB connection failed:", error);
    expect(processExitSpy).toHaveBeenCalledWith(1);

    // Restore original behavior.
    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });

});
