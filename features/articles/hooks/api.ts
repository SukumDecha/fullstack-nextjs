import { AddArticleInput } from '../admin/type';

export const useCreateArticle = () => {
  return {
    mutateAsync: (form: AddArticleInput) => {
      return fetch('http://localhost:3000/api/admin/articles', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
  };
};
