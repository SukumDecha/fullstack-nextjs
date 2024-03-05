import { findAll } from '@/features/articles/api';
import ArticleList from '@/features/articles/components/ArticleList';

export const metadata = {
  title: 'All Article - Absence Management',
};

const ArticlesPage = async () => {
  const articles = await findAll();

  return (
    <>
      <ArticleList articles={articles} />
    </>
  );
};

export default ArticlesPage;

// export const dynamic = 'force-dynamic';
export const revalidate = 15;
