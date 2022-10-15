import { useEffect, useRef, useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import ActiveTask from "./ActiveTask.tsx";

export interface TodoItem {
  id: number;
  name: string;
  complete: boolean;
  time: number;
  startedAt: Date | undefined,
  completedAt: Date | undefined,
}

export type TodoListCollection = Array<TodoItem>;

interface ClickHandlerCallbackFunction{
  (id:number):void;
}

function ProgressBar(props: {percent: number, durationInSeconds: number}) {
  const bar = useRef()

  useEffect(() => {
    bar.current.style.width="100%"
  }, [])

  return <div ref={bar} class="z-10 top-0 bottom-0 absolute  bg-yellow-100"
              style={{width: "3%", transition: `width ${props.durationInSeconds}s`}} />
}

function Todo(props: {
  task: TodoItem,
  onStart?: ClickHandlerCallbackFunction | undefined,
  disabled: boolean
}) {
  const {task, disabled} = props
  const isActive = task.startedAt && !task.completedAt
  const buttonText = isActive ? 'Complete' : 'Start';
  const [percentComplete, setPercentComplete] = useState<number>(0);

  // useEffect(() => {
  //   let timerId;
  //   if(isActive && !!task.startedAt) {
  //     timerId = setInterval(() => {
  //       const activeMs = new Date() - task.startedAt;
  //       const totalAllocatedMs = task.time * 1000 * 60;
  //       const percentComplete = (activeMs / totalAllocatedMs) * 100;
  //       console.log({activeMs, totalAllocatedMs, percentComplete});
  //       // const endTimeFromAllotedValue = task.startedAt.getTime() + (task.time * 1000 * 60)
  //       setPercentComplete(percentComplete);
  //     }, 5000);
  //   }
  // },  [task, isActive]);

  function startTask(task: TodoItem) : void {
    // execute callback
    props.onStart && props.onStart(task.id);

    task.startedAt = new Date();
    fetch("/api/todos", {
      method: "PUT",
      body: JSON.stringify(task)
    }).then(console.log);
  }

  function completeTask(task: TodoItem): void {
    console.log("completing", task);
    task.completedAt = new Date();
    task.complete = true;

    fetch("/api/todos", {
      method: "PUT",
      body: JSON.stringify(task)
    }).then(console.log);
  }

  return (
    <div class={`relative m-1 items-center gap-2 w-full ${disabled ? 'text-gray-300' : ''}`}>
      {isActive && <ProgressBar durationInSeconds={task.time * 60}/>}
      <div class="z-20 relative flex p-3">
        <div class="flex-grow-1">
          <p class="font-bold text-xl">{task.name}</p>
          <p class="text-sm">{task.time} minutes</p>
        </div>
        {!disabled && !isActive && (<Button onClick={() => startTask(task)}>Start</Button>)}
        {!disabled && isActive && (<Button onClick={() => completeTask(task)}>Complete</Button>)}
      </div>
    </div>
  )
}

export default function TodoList(props: {todos: TodoListCollection}) {
  const [activeTask, setActiveTask] = useState<number|undefined>()

  return (
    <>
      {/* <div>
        <ActiveTask id={activeTask}/>
      </div> */}
      <div>
        {props.todos.map(todo => (
          <Todo task={todo}
                disabled={activeTask && (activeTask != todo.id)}
                active={activeTask == todo.id}
                onStart={setActiveTask}/>
        ))}
      </div>
    </>
  );
}

