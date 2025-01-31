import { JWTAuthProvider, MCPServer } from "mcp-framework";

const server = new MCPServer (
  {
    transport:
    {
      type: "sse",
      options:{
        auth:{
          provider: new JWTAuthProvider({secret: "hello"})
        }
      }
}}
);

server.start()
