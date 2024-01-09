'use client';

import { useCreateArticle } from '../hooks/api';

const CreateArticle = () => {
  const { mutateAsync } = useCreateArticle();

  return <button onClick={() => mutateAsync({ title: 'xxx' })}>Create</button>;
};

export default CreateArticle;
