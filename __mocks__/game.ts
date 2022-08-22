const user = {
  name: "",
  id: "",
  active: true,
  viewedScene: "",
  avatar: "",
  permissions: [],
  isTrusted: false,
  isGM: false,
  isSelf: true,
  data: {},
  can: jest.fn((_permission) => {
    return false;
  }),
  hasPermission: jest.fn((_permission) => {
    return false;
  }),
  hasRole: jest.fn((_role) => {
    return true;
  }),
  isRole: jest.fn((_role) => {
    return false;
  }),
};

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'game'.
const game = {
  data: null,
  user: user,
  paused: true,
  tables: [
    {
      name: "Wild Magic Surge",
      roll: jest.fn().mockResolvedValue(true),
      results: jest.fn().mockResolvedValue([]),
    },
  ],
  i18n: {
    format: jest.fn().mockResolvedValue("test language string"),
  },
  settings: {
    get: jest.fn().mockResolvedValue("true"),
    register: jest.fn((_moduleName, _settingName, _data) => {
      // This is intentional
    }),
    registerMenu: jest.fn(),
    set: (_moduleName: any, _settingName: any, _data: any) => {
      return Promise.resolve(true);
    },
  },
  time: {
    worldTime: 10,
    advance: jest.fn(),
  },
  socket: {
    on: jest.fn(),
    emit: jest.fn(),
  },
  combats: {
    size: 0,
    find: jest.fn((v) => {
      return v.call(undefined, { started: true });
    }),
  },
  modules: {
    get: jest.fn(),
  },
  Gametime: {
    DTC: {
      saveUserCalendar: jest.fn(),
    },
  },
  users: {
    get: jest.fn(),
    find: (v: any) => {
      return v.call(undefined, { isGM: false, active: true });
    },
    forEach: (v: any) => {
      return v.call(undefined, { id: "" });
    },
    filter: (v: any) => {
      return v.call(undefined, user);
    },
    map: (v: any) => {
      return v.call(undefined, user);
    },
  },
  scenes: null,
  system: {
    id: "",
    data: {
      version: "1.2.3",
    },
  },
  togglePause: jest.fn(),
  journal: {
    get: (id: any, _obj: any) => {
      if (id) {
        return {
          getFlag: jest.fn().mockReturnValue({
            calendarId: "test",
            startDate: {},
            endDate: {},
            allDay: true,
            repeats: 0,
            order: 0,
            categories: [],
            remindUsers: ["qwe"],
          }),
          update: jest.fn(),
          delete: async () => {
            // This is intentional
          },
        };
      }
      return null;
    },
    forEach: (v: any) => {
      return v.call(undefined, {});
    },
    directory: {
      folders: {
        find: (v: any) => {
          return v.call(undefined, {
            getFlag: jest
              .fn()
              .mockReturnValueOnce(undefined)
              .mockReturnValue({}),
          });
        },
      },
    },
  },
  macros: {
    forEach: (v: any) => {
      return v.call(undefined, { canExecute: true, name: "asd", id: "123" });
    },
    get: () => {
      return { canExecute: true, execute: jest.fn() };
    },
  },
};

(global as any).game = game;
