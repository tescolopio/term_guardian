const runtime = {
    sendMessage: jest.fn(),
    onMessage: {
      addListener: jest.fn()
    }
  };
  
  global.chrome = {
    runtime
  };
  