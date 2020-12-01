import React, { useState } from "react";
import Task from "./task.jsx";

//create your first component
export function TasksList() {
	const [list, setList] = useState([]);

	const handleKeyDown = e => {
		if (e.keyCode == 13 && e.target.value != "") {
			//e es el evento, que lo puedo llamar de cualquier forma
			e.preventDefault();
			let newList = [...list, e.target.value];
			e.target.value = "";
			setList(newList); //cambia array antiguo por el nuevo
		}
	};
	const deleteTask = id => {
		let newList = [...list];
		newList.splice(id, 1);
		setList(newList);
	};
	return (
		<div className="container-fluid">
			<h1>lista de tareas</h1>
			<div className="card">
				<div className="card-body">
					<form>
						<div className="form-group row">
							<div className="col-sm-12">
								<input
									type="text"
									className="form-control"
									placeholder="¿Qué tienes que hacer?"
									id="inputNeeds"
									onKeyDown={handleKeyDown}
								/>
							</div>
						</div>
					</form>
					<div>
						{list.map((task, index) => {
							return (
								<Task
									key={index}
									task={task}
									id={index}
									deleteTask={deleteTask}
								/>
							); //paso un id al hijo para acceder al elemento del array y poder borrarlo, ademas de pasar la funcion para borrar deleteTask
						})}
					</div>
					<div className="card-footer">
						{list.length}
						&nbsp;Tareas restantes
					</div>
				</div>
			</div>
		</div>
	);
}
