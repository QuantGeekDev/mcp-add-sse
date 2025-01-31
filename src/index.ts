import { JWTAuthProvider, MCPServer } from "mcp-framework";

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const PORT = parseInt(process.env.PORT || "1337", 10);

const server = new MCPServer(
  {
    transport: {
      type: "sse",
      options: {
        port: PORT,
        auth: {
          provider: new JWTAuthProvider({ secret: JWT_SECRET })
        }
      }
    }
  }
);

server.start().then(() => {
  console.log(`MCP Calculator server running on port ${PORT}`);
}).catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
