import React, { useState, useEffect } from "react";
import Task from "./task.jsx";

//create your first component
export function TasksList() {
	const [list, setList] = useState([]);
	useEffect(() => {
		//Obtengo los datos de la API con GET cuando el componente se carga. Previamente hice un POST con Insomnia a https://assets.breatheco.de/apis/fake/todos/user/mario para crear mi lista. En vez de crear aquí el GET lo creo con la función retornarTareas() y así puedo reutilizar el codigo del GET a la hora de borrar y añadir tareas asegurandome de esta forma que los datos que me pinta son los de la bbdd
		retornarTareas();
	}, []);

	const handleKeyDown = e => {
		if (e.keyCode == 13 && e.target.value != "") {
			//e es el evento, que lo puedo llamar de cualquier forma
			e.preventDefault();
			let newList = [...list, { label: e.target.value, done: false }];
			console.log(newList);
			e.target.value = "";
			actualizarTareas(newList);
		}
	};
	const deleteTask = id => {
		let newList = [...list];
		newList.splice(id, 1);
		actualizarTareas(newList);
	};

	//Creo una función para añadir y borrar tareas de la API a la que llamo desde deleteTask y handleKeyDown

	const actualizarTareas = newList => {
		console.log(newList);
		fetch("https://assets.breatheco.de/apis/fake/todos/user/mario", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newList)
		})
			.then(response => response.json())
			.then(list => {
				retornarTareas(); //cada vez que hay un cambio de tareas hago un GET para obtener los datos de la bbdd
				console.log("updated", list);
			})
			.catch(error => {
				console.error("Error:", error);
			});
	};

	//Hago un Get en una función para poder reutilizarlo en el useEffect, delte y creacion de tareas

	const retornarTareas = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/mario", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				console.log(data);
				setList(data); //actualizo mi lista con la data guardada en la API
				console.log("GET despues del seteo", data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
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
