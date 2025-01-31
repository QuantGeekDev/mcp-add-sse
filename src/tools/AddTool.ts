import { MCPTool } from "mcp-framework";
import { z } from "zod";

interface AddInput {
  a: string;
  b: string
}

class AddTool extends MCPTool<AddInput> {
  name = "add_tool";
  description = "An addition tool that sums numbers A and B";

  schema = {
    a: {
      type: z.string(),
      description: "First number to sum",
    },
    b: {
      type: z.string(),
      description: "Second number to sum"
    }
  };

  async execute(input: AddInput) {
    const a = Number.parseInt(input.a)
    const b = Number.parseInt(input.b)
    const sum = a + b
    return `The sum is: ${sum}`;
  }
}

export default AddTool;
