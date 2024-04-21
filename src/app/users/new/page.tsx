import { UserForm } from '@/components/UserForm';
import { AppPageTitle } from '@/components/ui/app-page-title';

export default async function NewUserPage() {
  return (
    <div className="p-4">
      <AppPageTitle>Invite New User</AppPageTitle>
      <UserForm />
    </div>
  );
}
