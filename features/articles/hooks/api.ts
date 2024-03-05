import { AddArticleInput } from '../admin/type';

export const useCreateArticle = () => {
  return {
    mutateAsync: (form: AddArticleInput) => {
      return fetch(`${process.env.NEXTAPP_URL}/api/admin/articles`, {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
  };
};
