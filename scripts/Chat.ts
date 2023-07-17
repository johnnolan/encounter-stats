/**
 * Chat class for handling common chat methods
 * @class Chat
 */
export default class Chat {
  /**
   * Sends the correct ChatMessage to the Chat window
   * @public
   * @return {Promise<void>}
   * @param message - The chat message to send.
   */
  static async Send(message: string): Promise<void> {
    const gmsToWhisper = ChatMessage.getWhisperRecipients("GM").map(
      (u: User) => u.id,
    );

    const chatData = {
      content: `<div>${message}</div>`,
      speaker: gmsToWhisper,
    };

    ChatMessage.create(chatData);
  }
}
