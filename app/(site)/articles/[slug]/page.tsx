import { findBySlug } from '@/features/articles/api';
import ArticleDetail from '@/features/articles/components/ArticleDetail';
import { getImagePath } from '@/features/shared/helpers/upload';
import { Metadata } from 'next';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export const generateStaticParams = async () => {
  return [{ slug: '1' }, { slug: '3' }];
};

export async function generateMetadata({
  params: { slug },
}: ArticlePageProps): Promise<Metadata> {
  const article = await findBySlug(slug);

  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      images: getImagePath(article.image),
    },
  };
}

const ArticlePage = async ({ params: { slug } }: ArticlePageProps) => {
  const article = await findBySlug(slug);

  if (!article) return <div>No article found</div>;
  return <ArticleDetail article={article} />;
};

export default ArticlePage;
