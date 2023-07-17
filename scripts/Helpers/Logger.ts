class Logger {
  public static log(
    description: string,
    module = "global",
    data: unknown = {},
  ): void {
    console.log("Encounter Stats", module, description, data);
  }

  public static debug(
    description: string,
    module = "global",
    data: unknown = {},
  ): void {
    console.debug("Encounter Stats", module, description, data);
  }

  public static warn(
    description: string,
    module = "global",
    data: unknown = {},
  ): void {
    console.warn("Encounter Stats", module, description, data);
  }

  public static error(
    description: string,
    module = "global",
    data: unknown = {},
  ): void {
    console.error("Encounter Stats", module, description, data);
  }
}

export default Logger;
