import { getUser } from '@/actions/user.actions';
import { UserForm } from '@/components/UserForm';
import { AppPageTitle } from '@/components/ui/app-page-title';
import { redirect } from 'next/navigation';

export default async function UserPage({ params = { id: '' } }) {
  const userId = +params.id;
  const user = await getUser(userId);

  if (!user) {
    redirect('/users');
  }

  return (
    <div className="p-4">
      <AppPageTitle>{user.firstName} {user.lastName}</AppPageTitle>
      <UserForm user={user} />
    </div>
  );
}
