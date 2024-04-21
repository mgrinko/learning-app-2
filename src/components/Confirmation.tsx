import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import React from 'react';

export const Confirmation = ({
  title,
  message,
  okText = 'Save',
  cancelText = 'Cancel',
  trigger,
  okCallback,
  cancelCallback = () => {},
}: {
  title: string;
  message: string;
  okText?: string;
  cancelText?: string;
  trigger: React.ReactNode;
  okCallback: () => void;
  cancelCallback?: () => void;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={cancelCallback}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction onClick={okCallback}>{okText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
