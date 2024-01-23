import pino, { type DestinationStream } from 'pino';

const transport: DestinationStream = pino.transport({
  target: 'pino-pretty',
  options: {
    colorized: true,
    singleLine: true,
  },
});

const logger = pino(
  {
    formatters: {
      bindings: (bindings) => {
        return { pid: bindings.pid };
      },
    },
    redact: {
      paths: ['password', '*.password'],
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  transport,
);

export default logger;
