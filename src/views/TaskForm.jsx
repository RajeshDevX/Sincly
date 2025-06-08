// TaskForm.js
import { useCreateTaskMutation } from '../redux/apis/taskApi';

const TaskForm = () => {
  const [createTask, { isLoading, isSuccess }] = useCreateTaskMutation();

  const handleSubmit = async () => {
    await createTask({ title: 'New Task', description: 'Demo' });
  };

  return <button onClick={handleSubmit}>Create Task</button>;
};
