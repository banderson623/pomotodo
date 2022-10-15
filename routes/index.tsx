import { useEffect, useState } from "preact/hooks";
import { Head } from "$fresh/runtime.ts";
import TodoList, {TodoListCollection} from "../islands/TodoList.tsx";
import ActiveTask from "../islands/ActiveTask.tsx"
import { getAllTodos } from "./api/todos.ts";
import { Handlers, HandlerContext, PageProps } from "$fresh/server.ts";


type TodosProps = {
  todos: TodoListCollection;
};

export const handler: Handlers<TodosProps> = {
  async GET(_req, ctx) {
    const todos = await getAllTodos();

    return ctx.render({
      todos: todos ?? [],
    });
  },
}


export default function Home(props: PageProps<TodosProps>) {
  const { data } = props;
  const { todos } = props.data;

  return (
    <>
      <Head>
        <title>Pomodoro Todo Thing</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md border">
        <TodoList todos={todos}/>
      </div>
    </>
  );
}


// export const handler: Handlers = {
//   GET(req) {
//     return new Response(JSON.stringify(todos), {
//       headers: { "Content-Type": "application/json" },
//     });
//   },
// }