const jsdom = require("jsdom");
(global as any).$ = require("jquery")(new jsdom.JSDOM().window);
