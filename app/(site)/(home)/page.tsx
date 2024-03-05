import ArticleList from '@/features/articles/components/ArticleList';
import Image from 'next/image';
import * as articleApi from '@/features/articles/api';
import * as announcementApi from '@/features/announcements/api';

const HomePage = async () => {
  
  return (
    <div>
      <h1 className="my-4 text-center text-4xl font-bold">
        Absence Management
      </h1>
      <div className="relative h-[500px]">
        <Image
          src="/assets/images/homepage.png "
          alt="Homepage"
          fill
          sizes="(min-width: 808px) 50vw, 100vw"
          className="object-cover"
        ></Image>
      </div>
    </div>
  );
};

export default HomePage;
