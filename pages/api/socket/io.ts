import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

import { NextApiResponseServerIo } from "@/types";

export const config = {
  api: {
    bodyParser: false
  }
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (res.socket.server.io) {
    res.end();
    return;
  }

  const path = "/api/socket/io";
  // TODO: get rid of typecast
  const httpServer: NetServer = res.socket.server as unknown as NetServer;
  const io = new ServerIO(httpServer, {
    path: path,
    // TODO: ?
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    addTrailingSlash: false
  });

  res.socket.server.io = io;

  res.end();
};

export default ioHandler;
