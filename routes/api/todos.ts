import { Handlers } from "$fresh/server.ts";
import { TodoListCollection, TodoItem } from "../../islands/TodoList.tsx";

let id = 1;
const todos: TodoListCollection = [
  {
    id: id++,
    startedAt: undefined,
    completedAt: undefined,
    name: "Make the timer work",
    time: 0.5,
    complete: false,
  },
  {
    id: id++,
    startedAt: undefined,
    completedAt: undefined,
    name: "Persist to backend storage",
    time: 30,
    complete: false,
  },
  {
    id: id++,
    startedAt: undefined,
    completedAt: undefined,
    name: "Style the page",
    time: 40,
    complete: false,
  },
];

export async function getAllTodos(): Promise<TodoListCollection> {
  return await todos
}

export const handler: Handlers = {
  GET(req) {
    return new Response(JSON.stringify(todos), {
      headers: { "Content-Type": "application/json" },
    });
  },

  // create a todo
  // POST(req) {
  //   return new Response(JSON.stringify(todos), {
  //     headers: { "Content-Type": "application/json" },
  //   });
  // },

  // update a todo
  async PUT(req) {
    const todo: TodoItem = await req.json();

    // const todo = (await getAllTodos()).filter(t => t.id ==

    return new Response(JSON.stringify(todo), {
      headers: { "Content-Type": "application/json" },

    });
  },

};
