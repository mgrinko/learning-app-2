import { getLearningMaterials } from '@/actions/learning-material.actions';
import { getUsers } from '@/actions/user.actions';
import { TaskForm } from '@/components/TaskForm';

export default async function NewUserPage() {
  const users = await getUsers();
  const learningMaterials = await getLearningMaterials();

  return (
    <div className="mt-4">
      <h1 className="text-xl  text-center font-bold text-slate-950">
        Create a Task
      </h1>
      <TaskForm users={users} learningMaterials={learningMaterials} />
    </div>
  );
}
