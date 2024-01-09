'use client';
import { Article } from '../type';

interface ArticleDetailProps {
  article: Article;
  onUpdate: (id: Article['id']) => void;
}

const ArticleDetail = ({ article, onUpdate }: ArticleDetailProps) => {
  return (
    <>
      {article.title}
      <button onClick={() => onUpdate(article.id)}>Update</button>
    </>
  );
};

export default ArticleDetail;
