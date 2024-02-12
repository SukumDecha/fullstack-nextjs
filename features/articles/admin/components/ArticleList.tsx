import DataGrid, { DataGridColumn } from '@/features/ui/components/DataGrid';
import React, { useState } from 'react';
import { ArticleItem } from '../../type';
import ArticleDetails from './ArticleDetails';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/features/shadcn/components/ui/dialog';
import { Button } from '@/features/shadcn/components/ui/button';
import { Plus } from 'lucide-react';
import { ScrollArea } from '@/features/shadcn/components/ui/scroll-area';
import ArticleForm from './ArticleForm';
import { AddArticleInput } from '../type';
import { useCreateArticle } from '../hooks/api';

interface ArticleListProps {
  articles: ArticleItem[];
}
const ArticleList = ({ articles }: ArticleListProps) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync } = useCreateArticle();
  const columns: DataGridColumn<ArticleItem>[] = [
    {
      field: 'title',
      headerName: 'Title',
    },
    {
      field: 'slug',
      headerName: 'Slug',
    },
  ];

  const handleAddArticle = async (article: AddArticleInput) => {
    setOpen(false);
    await mutateAsync(article);
  };
  return (
    <>
      <DataGrid
        title="All Articles"
        columns={columns}
        rows={articles}
        detailsComponent={ArticleDetails}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="z-100 fixed bottom-10 right-10 flex items-center justify-center rounded-full bg-blue-600 text-white drop-shadow"
          >
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <ScrollArea className="max-h-[50vh]">
            <div className="p-4">
              <ArticleForm kind="create" onSubmit={handleAddArticle} />
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ArticleList;
