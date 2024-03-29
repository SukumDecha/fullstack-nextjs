import React from 'react';
import * as types from '../type';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/features/shadcn/components/ui/card';
import { truncate } from 'lodash';
import Image from 'next/image';
import { getImagePath } from '@/features/shared/helpers/upload';

const ArticleItem = ({ slug, title, excerpt, image }: types.ArticleItem) => {
  return (
    <Link href={`/articles/${slug}`}>
      <Card className="h-full">
        <div className="relative h-[200px]">
          <Image
            src={getImagePath(image)}
            alt={title}
            fill
            sizes="(min-width: 800px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <CardHeader>
          <CardTitle>{truncate(title, { length: 30 })}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{truncate(excerpt, { length: 100 })}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ArticleItem;
