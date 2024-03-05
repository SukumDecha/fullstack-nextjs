import { useCallback, useEffect, useState } from 'react';
import { ArticleDetails, ArticleItem } from '../../type';
import { AddArticleInput, UpdateArticleInput } from '../type';

export const useGetArticles = () => {
  const [articles, setArticles] = useState<ArticleItem[]>([]);

  const fetchArticles = async () => {
    const res = await fetch('http://localhost:3000/api/articles');
    const articles = await (res.json() as Promise<ArticleItem[]>);

    setArticles(articles);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return articles;
};

export const useGetArticle = (id: ArticleDetails['id']) => {
  const [article, setArticle] = useState<ArticleDetails>();

  const fetchArticle = useCallback(async () => {
    const res = await fetch(`http://localhost:3000/api/articles/${id}`);
    const article = await (res.json() as Promise<ArticleDetails>);

    setArticle(article);
  }, [id]);

  useEffect(() => {
    fetchArticle();
  }, []);

  return article;
};

export const useCreateArticle = () => {
  return {
    mutateAsync: async (form: AddArticleInput) => {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('excerpt', form.excerpt);
      formData.append('content', form.content);
      if (form.image) formData.append('image', form.image);

      const res = await fetch(`${process.env.NEXTAPP_URL}/api/admin/articles`, {
        method: 'POST',
        body: formData,
       });
      const article = await (res.json() as Promise<ArticleDetails>);

      return article;
    },
  };
};

export const useEditArticle = (id: ArticleDetails['id']) => {
  return {
    mutateAsync: async (form: UpdateArticleInput) => {
      const res = await fetch(
        `http://localhost:3000/api/admin/articles/${id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(form),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const article = await (res.json() as Promise<ArticleDetails>);

      return article;
    },
  };
};
