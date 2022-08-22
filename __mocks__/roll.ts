(global as any).Roll = jest.fn().mockImplementation(() => {
  return {
    roll: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue(null),
    render: jest.fn().mockResolvedValue(null),
  };
});
