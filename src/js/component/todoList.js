import React, { Fragment, useState, useEffect } from "react";

export const TodoList = props => {
	const [tasks, setTasks] = useState([]);
	const [initialValue, setInitialValue] = useState(null);
	const removeTodo = index => {
		const newTodos = [...tasks];
		newTodos.splice(index, 1);
		setTasks(newTodos);
	};

	let newTask = event => {
		let myInput = document.querySelector("#taskInput");
		let newTask = event.target.value;

		if (event.keyCode == 13) {
			event.preventDefault();
			if (newTask) {
				setTasks(tasks => [...tasks, { label: newTask, done: false }]);
				myInput.value = "";
			}
		}
		console.log(tasks, "eeeeeeeoooooooo");
	};

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/Lorella")
			.then(response => response.json())
			.then(responseJSON => {
				setTasks(responseJSON);
				console.log(responseJSON);
			});
	}, []);

	useEffect(
		() => {
			fetch("https://assets.breatheco.de/apis/fake/todos/user/Lorella", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(tasks)
			})
				.then(response => {
					return response.json();
					//console.log(response, "wertyytrewerghgrgfdfgh");
				})
				.then(data => {
					console.log("Success:", data);
				})
				.catch(error => {
					console.error("Error:", error);
				});
		},
		[tasks]
	);

	return (
		<Fragment>
			<form>
				<input
					id="taskInput"
					type="text"
					placeholder="Add Task"
					value={initialValue}
					onKeyPress={() => {
						newTask(event);
					}}
					removeTodo={removeTodo}
				/>
			</form>
			<div>
				{tasks.map((task, index) => {
					return (
						<li key={index}>
							{task.label}
							<button onClick={() => removeTodo(index)}>x</button>
						</li>
					);
				})}
			</div>
		</Fragment>
	);
};
// const clearInput = () => (taskInput.current.value = "");
