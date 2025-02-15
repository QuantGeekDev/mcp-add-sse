import { APIKeyAuthProvider, MCPServer } from "mcp-framework";

const API_KEY = process.env.API_KEY || "secret";
const PORT = parseInt(process.env.PORT || "1337", 10);

const server = new MCPServer(
  {
    transport: {
      type: "sse",
      options: {
        port: PORT,
        auth: {
          provider: new APIKeyAuthProvider({ keys: [API_KEY] })
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
