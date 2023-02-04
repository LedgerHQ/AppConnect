import { jest, describe, expect, it, beforeAll } from "@jest/globals";
import { setDebug, newLog, module, level } from "./log";

beforeAll(() => {
  jest.spyOn(console, "debug").mockImplementation(jest.fn());
  jest.spyOn(console, "log").mockImplementation(jest.fn());
  jest.spyOn(console, "warn").mockImplementation(jest.fn());
  jest.spyOn(console, "error").mockImplementation(jest.fn());
});

describe("test log and debug", () => {
  it("check console.log is called when debug is true", () => {
    setDebug(true);
    const spy = jest.spyOn(global.console, "debug");
    const log = newLog();
    log.debug("123");
    expect(spy).toHaveBeenCalled();
  });

  it("check console.log is not called when debug is false", () => {
    setDebug(false);
    const spy = jest.spyOn(global.console, "debug");
    const log = newLog();
    log.debug("123");
    expect(spy).not.toHaveBeenCalled();
  });

  it("check console.log is called/not called when debug a Record", () => {
    const logLevel: Record<module, level> = {
      PING: level.INFO,
      KEYRING: level.DEBUG,
      DEFAULT: level.INFO,
      PROVIDER3X: level.INFO,
      ACCOUNT3X: level.INFO,
    };
    setDebug(logLevel);
    const spy = jest.spyOn(global.console, "debug");
    const logDefault = newLog();
    logDefault.debug("123");
    expect(spy).not.toHaveBeenCalled();
    const logKeyring = newLog(module.KEYRING);
    logKeyring.debug("123");
    expect(spy).toHaveBeenCalled();
  });

  it("check console.log when logLevel is ERROR", () => {
    const logLevel: Record<module, level> = {
      PING: level.DEBUG,
      KEYRING: level.DEBUG,
      DEFAULT: level.ERROR,
      PROVIDER3X: level.INFO,
      ACCOUNT3X: level.INFO,
    };
    setDebug(logLevel);
    const spyLog = jest.spyOn(global.console, "log");
    const spyWarn = jest.spyOn(global.console, "warn");
    const spyError = jest.spyOn(global.console, "error");
    const spyDebug = jest.spyOn(global.console, "debug");
    const logDefault = newLog();
    logDefault.debug("123");
    expect(spyDebug).not.toHaveBeenCalled();
    logDefault.log("123");
    expect(spyLog).not.toHaveBeenCalled();
    logDefault.warn("123");
    expect(spyWarn).not.toHaveBeenCalled();
    logDefault.error("123");
    expect(spyError).toHaveBeenCalled();
  });
});
