import React from 'react';
import { DataGridProps, DataRow } from './DataGrid';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/features/shadcn/components/ui/dialog';
import { Button } from '@/features/shadcn/components/ui/button';
import { ScrollArea } from '@/features/shadcn/components/ui/scroll-area';

interface DataGridItemProps<T extends DataRow>
  extends Pick<DataGridProps<T>, 'columns' | 'detailsComponent'> {
  row: T;
}
const DataGridItem = <T extends DataRow>({
  row,
  columns,
  detailsComponent: DetailsComponent,
}: DataGridItemProps<T>) => {
  const generateRow = () => {
    const result = [
      <td key="id" className="px-6 py-3">
        {row.id}
      </td>,
    ];

    for (const col of columns) {
      const data = row[col.field];

      result.push(<td key={col.field as string}>{String(data)}</td>);
    }

    return result;
  };
  return (
    <tr className="border-b">
      {generateRow()}
      <Dialog>
        <DialogTrigger asChild>
          <td className="px-6 py-3">
            <Button variant={'outline'}>Open</Button>
          </td>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <ScrollArea className="max-h-[80vh]">
              <div className="p-4">
                <DetailsComponent {...row} />
              </div>
            </ScrollArea>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </tr>
  );
};

export default DataGridItem;
