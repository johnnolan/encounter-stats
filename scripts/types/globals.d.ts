declare global {
  interface LenientGlobalVariableTypes {
    game: never; // the type doesn't matter
  }
  interface Window {
    Hooks: typeof Hooks;
    SimpleCalendar: {
      api: {
        getCurrentDay: () => {
          name: string;
        };
        getCurrentMonth: () => {
          name: string;
        };
        getCurrentYear: () => {
          numericRepresentation: number;
          postfix: string;
        };
      };
    };
  }

  interface DateOptions {
    id: string;
    dateTimeDisplay: string;
    dateDisplay: string;
  }
}

export {};
