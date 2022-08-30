class Logger {
  public static log(data: unknown, module = "global"): void {
    console.log("Encounter Stats", module, data);
  }

  public static warn(data: unknown, module = "global"): void {
    console.warn("Encounter Stats", module, data);
  }

  public static error(data: unknown, module = "global"): void {
    console.error("Encounter Stats", module, data);
  }
}

export default Logger;
