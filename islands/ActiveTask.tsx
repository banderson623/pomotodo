import { useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import { TodoItem } from "./TodoList.tsx"

interface ActiveTaskProps {
  id: number | undefined;
}


export default function ActiveTask(props: ActiveTaskProps) {

  if(!props.id) return (<div></div>)

  return (
    <div>
      Active: {props.id}
    </div>
  );
}

