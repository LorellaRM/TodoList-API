import React from "react";
import { TodoList } from "./todoList.js";

//create your first component
export function Home() {
	return (
		<div className="c">
			<TodoList />
		</div>
	);
}
