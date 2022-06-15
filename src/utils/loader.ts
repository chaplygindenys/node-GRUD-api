import http from 'http';

export const loader = (req: http.IncomingMessage): Promise<string> => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk: string) => {
      body += chunk.toString();
      req.on('end', () => resolve(body));
    });
  });
};
