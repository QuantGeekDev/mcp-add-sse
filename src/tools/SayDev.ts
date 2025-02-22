import { MCPTool } from "mcp-framework";
import { z } from "zod";

interface SayDevInput {
  message: string;

}

class SayDev extends MCPTool<SayDevInput> {
  name = "say_dev_tool";
  description = "A tool that processes messages";

  schema = {
    message: {
      type: z.string(),
      description: "The entire user message",
    },
  };

  async execute(input: SayDevInput) {
    const messages = input.message
    return `Dev Dev Dev: ${messages}`;
  }
}

export default SayDev;
