import { findAll } from '@/features/articles/api';
import ArticleList from '@/features/articles/components/ArticleList';
import CreateArticle from '@/features/articles/components/CreateArticle';

const ArticlesPage = async () => {
  const articles = await findAll();

  return (
    <>
      <ArticleList articles={articles} />
      <CreateArticle />
    </>
  );
};

export default ArticlesPage;

// export const dynamic = 'force-dynamic';
export const revalidate = 15;
