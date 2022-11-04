import Chat from "./Chat";
import "../__mocks__/index";

describe("Chat", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("createDefaultChat", () => {
    describe("Given I pass it a message", () => {

      it("It returns the just the content", async () => {
        await Chat.Send("My Custom Message");

        expect(ChatMessage.create).toHaveBeenCalledWith({
          content: "<div>My Custom Message</div>",
          speaker: [undefined],
        });
      });
    });
  });
});
