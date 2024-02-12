import * as types from '@/features/articles/type';
import { useEditArticle, useGetArticle } from '../hooks/api';
import Image from 'next/image';
import { CalendarDays, FileEdit } from 'lucide-react';
import { toDateString } from '@/features/shared/helpers/date';
import { Button } from '@/features/shadcn/components/ui/button';
import { Separator } from '@/features/shadcn/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/features/shadcn/components/ui/dialog';
import { ScrollArea } from '@/features/shadcn/components/ui/scroll-area';
import ArticleForm from './ArticleForm';
import { useState } from 'react';
import { UpdateArticleInput } from '../type';
import { getImagePath } from '@/features/shared/helpers/upload';

interface ArticleDetailsProps {
  id: types.ArticleDetails['id'];
}
const ArticleDetails = ({ id }: ArticleDetailsProps) => {
  const [open, setOpen] = useState(false);
  const article = useGetArticle(id);
  const { mutateAsync: updateArticle } = useEditArticle(id);

  if (!article) return <div>No article found.</div>;

  const handleUpdateArticle = async (form: UpdateArticleInput) => {
    setOpen(false);
    await updateArticle(form);
  };
  return (
    <article>
      <figure>
        <div className="relative h-48 w-full object-contain">
          <Image
            src={getImagePath(article.image)}
            alt={article.title}
            fill
            sizes="(min-width: 800px) 50vw, 100vw"
          />
        </div>
      </figure>
      <h2 className="my-2 text-center text-xl ">{article.title}</h2>
      <Separator />
      <div className="flex justify-between rounded-sm bg-gray-50 p-3">
        <div className="flex items-center">
          <CalendarDays className="mr-2 w-6" />
          {toDateString(article.createdAt)}
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <FileEdit className="w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <ScrollArea className="max-h-[50vh]">
              <div className="p-4">
                <ArticleForm
                  kind="edit"
                  article={article}
                  onSubmit={handleUpdateArticle}
                />
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
      <Separator />
      <p className="my-2 text-gray-600">{article.content}</p>
    </article>
  );
};

export default ArticleDetails;
