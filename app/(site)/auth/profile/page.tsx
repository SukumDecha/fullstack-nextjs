'use client';

import Profile from '@/features/auth/components/Profile';
import { useEditProfile } from '@/features/auth/hooks/api';
import * as types from '@/features/auth/types';
import { useUiStore } from '@/features/ui/store';
import { useSession } from 'next-auth/react';

const ProfilePage = () => {
  const { data: session, status, update: updateProfile } = useSession();
  const { mutateAsync } = useEditProfile();
  const setToast = useUiStore((state) => state.setToast);

  const handleUpdateProfile = async (input: types.ProfileForm) => {
    const formData = new FormData();
    if (input.name) formData.append('name', input.name);
    if (input.email) formData.append('email', input.email);
    if (input.image) formData.append('image', input.image);
    if (input.password) formData.append('password', input.password);
    
    const profile = await mutateAsync(formData);
    //Update session and token
    await updateProfile(profile);
    setToast({ type: 'Success', message: 'Your profile has been updated.' });
  };

  if (status === 'loading') return <div>Loading </div>;
  if (!session?.user) return null;

  return (
    <Profile
      profile={session?.user as types.Profile}
      onSubmit={handleUpdateProfile}
    />
  );
};

export default ProfilePage;
