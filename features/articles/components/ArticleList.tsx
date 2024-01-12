import * as types from '@/features/articles/type';
import { Separator } from '@/features/shadcn/components/ui/separator';
import ArticleItem from './ArticleItem';

interface ArticleListProps {
  articles: types.ArticleItem[];
}

const ArticleList = ({ articles }: ArticleListProps) => {
  return (
    <section>
      <h1 className="my-4 text-center text-4xl font-bold ">All Blogs</h1>
      <Separator className="my-4" />
      <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleItem key={article.id} {...article} />
        ))}
      </div>
    </section>
  );
};

export default ArticleList;
