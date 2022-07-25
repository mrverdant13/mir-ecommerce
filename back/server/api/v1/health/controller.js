exports.checkAvailability = (_, res) =>
  res.status(200).json({ message: 'The server is up and running' });
