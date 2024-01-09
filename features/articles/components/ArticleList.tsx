import Link from 'next/link';
import { findAll } from '../api';

interface ArticleListProps {
  articles: Awaited<ReturnType<typeof findAll>>;
}

const ArticleList = ({ articles }: ArticleListProps) => {
  return (
    <ul>
      {articles.map((article) => (
        <li key={article.id}>
          <Link href={`/articles`}>{article.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default ArticleList;
