import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stage, setStage] = useState("Todo");

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "https://task-manager-ba05.onrender.com/api/tasks"
      );

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://task-manager-ba05.onrender.com/api/tasks",
        {
          title,
          description,
          stage,
        }
      );

      setTitle("");
      setDescription("");
      setStage("Todo");

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `https://task-manager-ba05.onrender.com/api/tasks/${id}`
      );

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const moveTask = async (task) => {
    let newStage = "Todo";

    if (task.stage === "Todo") {
      newStage = "In Progress";
    } else if (task.stage === "In Progress") {
      newStage = "Done";
    } else {
      newStage = "Todo";
    }

    try {
      await axios.put(
        `https://task-manager-ba05.onrender.com/api/tasks/${task._id}`,
        {
          title: task.title,
          description: task.description,
          stage: newStage,
        }
      );

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        Task Manager
      </h1>

      <form
        onSubmit={createTask}
        className="bg-white p-4 rounded shadow mb-8"
      >
        <input
          type="text"
          placeholder="Task Title"
          className="border p-2 w-full mb-3"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <textarea
          placeholder="Description"
          className="border p-2 w-full mb-3"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <select
          className="border p-2 w-full mb-3"
          value={stage}
          onChange={(e) =>
            setStage(e.target.value)
          }
        >
          <option>Todo</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </form>

      <div className="grid grid-cols-3 gap-6">
        {/* TODO */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Todo
          </h2>

          {tasks
            .filter(
              (task) => task.stage === "Todo"
            )
            .map((task) => (
              <div
                key={task._id}
                className="bg-white p-4 rounded shadow mb-3"
              >
                <h3 className="font-bold">
                  {task.title}
                </h3>

                <p>{task.description}</p>

                <button
                  onClick={() =>
                    moveTask(task)
                  }
                  className="bg-green-500 text-white px-3 py-1 rounded mt-3 mr-2"
                >
                  Move
                </button>

                <button
                  onClick={() =>
                    deleteTask(task._id)
                  }
                  className="bg-red-500 text-white px-3 py-1 rounded mt-3"
                >
                  Delete
                </button>
              </div>
            ))}
        </div>

        {/* IN PROGRESS */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            In Progress
          </h2>

          {tasks
            .filter(
              (task) =>
                task.stage === "In Progress"
            )
            .map((task) => (
              <div
                key={task._id}
                className="bg-white p-4 rounded shadow mb-3"
              >
                <h3 className="font-bold">
                  {task.title}
                </h3>

                <p>{task.description}</p>

                <button
                  onClick={() =>
                    moveTask(task)
                  }
                  className="bg-green-500 text-white px-3 py-1 rounded mt-3 mr-2"
                >
                  Move
                </button>

                <button
                  onClick={() =>
                    deleteTask(task._id)
                  }
                  className="bg-red-500 text-white px-3 py-1 rounded mt-3"
                >
                  Delete
                </button>
              </div>
            ))}
        </div>

        {/* DONE */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Done
          </h2>

          {tasks
            .filter(
              (task) => task.stage === "Done"
            )
            .map((task) => (
              <div
                key={task._id}
                className="bg-white p-4 rounded shadow mb-3"
              >
                <h3 className="font-bold">
                  {task.title}
                </h3>

                <p>{task.description}</p>

                <button
                  onClick={() =>
                    moveTask(task)
                  }
                  className="bg-green-500 text-white px-3 py-1 rounded mt-3 mr-2"
                >
                  Move
                </button>

                <button
                  onClick={() =>
                    deleteTask(task._id)
                  }
                  className="bg-red-500 text-white px-3 py-1 rounded mt-3"
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;