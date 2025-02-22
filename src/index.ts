import { MCPServer } from "mcp-framework";

const PORT = parseInt(process.env.PORT || "1337", 10);

const server = new MCPServer(
  {
    transport: {
      type: "sse",
      options: {
        port: PORT,
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
