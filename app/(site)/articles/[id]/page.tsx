import { findById, update } from '@/features/articles/api';
import ArticleDetail from '@/features/articles/components/ArticleDetail';
import { Article } from '@/features/articles/type';
import { revalidatePath } from 'next/cache';

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export const generateStaticParams = async () => {
  return [{ id: '1' }, { id: '3' }];
};

// Server Action
const updateArticle = async (id: Article['id']) => {
  'use server';
  await update(id, { title: 'YYY' });
  revalidatePath(`/articles/${id}`);
};

const ArticlePage = async ({ params: { id } }: ArticlePageProps) => {
  const article = await findById(+id);

  if (!article) return <div>No article found</div>;
  return <ArticleDetail article={article} onUpdate={updateArticle} />;
};

export default ArticlePage;
