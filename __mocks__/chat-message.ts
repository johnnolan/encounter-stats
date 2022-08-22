(global as any).ChatMessage = {
  create: jest.fn().mockResolvedValue(null),
  getWhisperRecipients: () => {
    return [{ _id: "" }];
  },
};
