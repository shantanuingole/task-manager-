"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TaskForm } from "@/components/task-form";
import { format } from "date-fns";
import { Trash2, CheckCircle2, Circle } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks");
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchTasks();
    }
  }, [status]);

  const deleteTask = async (id: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTasks(tasks.filter((t) => t.id !== id));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTaskStatus = async (id: string, status: Task["status"]) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      LOW: "bg-blue-100 text-blue-800",
      MEDIUM: "bg-yellow-100 text-yellow-800",
      HIGH: "bg-orange-100 text-orange-800",
      URGENT: "bg-red-100 text-red-800",
    };
    return colors[priority] || "bg-gray-100 text-gray-800";
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black">Dashboard</h1>
            <p className="text-gray-700">Welcome, {session?.user?.name}!</p>
          </div>
          <Button
            onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
            className="bg-black text-white hover:bg-gray-800"
          >
            Sign Out
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <TaskForm onSuccess={fetchTasks} />
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>My Tasks ({tasks.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {tasks.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    No tasks yet. Create one to get started!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className="p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 cursor-pointer">
                            <button
                              onClick={() =>
                                updateTaskStatus(
                                  task.id,
                                  task.status === "COMPLETED"
                                    ? "PENDING"
                                    : "COMPLETED"
                                )
                              }
                              className="flex items-start gap-3 w-full"
                            >
                              {task.status === "COMPLETED" ? (
                                <CheckCircle2 className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                              ) : (
                                <Circle className="w-6 h-6 text-gray-400 mt-0.5 flex-shrink-0" />
                              )}
                              <div className="text-left">
                                <h3
                                  className={`font-semibold ${
                                    task.status === "COMPLETED"
                                      ? "line-through text-gray-400"
                                      : ""
                                  }`}
                                >
                                  {task.title}
                                </h3>
                                {task.description && (
                                  <p className="text-sm text-gray-600 mt-1">
                                    {task.description}
                                  </p>
                                )}
                                <div className="flex gap-2 mt-2 flex-wrap">
                                  <Badge className={getPriorityColor(task.priority)}>
                                    {task.priority}
                                  </Badge>
                                  {task.dueDate && (
                                    <Badge className="border border-slate-200 bg-white text-slate-700">
                                      {format(
                                        new Date(task.dueDate),
                                        "MMM dd, yyyy"
                                      )}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </button>
                          </div>

                          <button
                            onClick={() => deleteTask(task.id)}
                            className="p-2 hover:bg-red-50 rounded-md transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
