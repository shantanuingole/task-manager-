import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!process.env.HUGGINGFACE_API_KEY) {
      return NextResponse.json(
        { error: "AI service not configured" },
        { status: 500 }
      );
    }

    const { taskTitle, taskDescription } = await request.json();

    if (!taskTitle) {
      return NextResponse.json(
        { error: "Task title is required" },
        { status: 400 }
      );
    }

    try {
      const prompt = `You are a helpful task assistant. Given the task title and description, provide 3 actionable suggestions to improve the task or break it down. Be concise and practical.

Task Title: ${taskTitle}
Task Description: ${taskDescription || "No description provided"}

Provide your suggestions as a numbered list.`;

      const response = await hf.textGeneration({
        model: "mistralai/Mistral-7B-Instruct-v0.1",
        inputs: prompt,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
        },
      });

      const suggestions = response.generated_text.replace(prompt, "").trim();

      return NextResponse.json({ suggestions });
    } catch (aiError: any) {
      console.error("Hugging Face API error:", aiError?.message);
      
      const mockSuggestions = `Here are some general suggestions for "${taskTitle}":

1. Break it down into smaller subtasks - divide the main task into smaller, manageable steps that can be completed independently.

2. Set specific deadlines - define clear milestones and deadlines for each subtask to maintain momentum and track progress.

3. Clarify the success criteria - document what "done" looks like for this task, including any acceptance criteria or deliverables.`;

      return NextResponse.json({ suggestions: mockSuggestions });
    }
  } catch (error) {
    console.error("Error generating suggestions:", error);
    return NextResponse.json(
      { error: "Failed to generate suggestions" },
      { status: 500 }
    );
  }
}
