import { getLearningMaterials } from '@/actions/learning-material.actions';
import { getTask } from '@/actions/task.actions';
import { getUsers } from '@/actions/user.actions';
import { TaskForm } from '@/components/TaskForm';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

export default async function NewUserPage({ params: { id = '' } }) {
  const taskId = +id;
  const task = await getTask(taskId);

  if (!task) {
    toast.error('Task not found');
    redirect('/tasks');
  }

  const users = await getUsers();
  const learningMaterials = await getLearningMaterials();

  return (
    <div className="mt-4">
      <h1 className="text-xl  text-center font-bold text-slate-950">
        Update a Task
      </h1>
      <TaskForm users={users} learningMaterials={learningMaterials} task={task} />
    </div>
  );
}
