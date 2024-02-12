import {
  AddLeaveInput,
  LeaveDetails,
  LeaveItem,
  UpdateLeaveInput,
} from '@/features/leaves/type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
export const useGetLeaves = () => {
  return useQuery({
    queryKey: ['leaves'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/api/leaves');
      const leaves = await (res.json() as Promise<LeaveDetails[]>);

      return leaves;
    },
  });
};

export const useGetLeave = (id: number) => {
  return useQuery({
    queryKey: ['leaves', id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/api/leaves/${id}`);
      const leave = (await res.json()) as Promise<LeaveItem>;

      return leave;
    },
  });
};

export const useCreateLeave = () => {
  return useMutation({
    mutationFn: async (input: AddLeaveInput) => {
      const res = await fetch('http://localhost:3000/api/leaves', {
        method: 'POST',
        body: JSON.stringify(input),
      });

      const leave = await (res.json() as Promise<LeaveDetails>);
      return leave;
    },
  });
};

export const useEditLeave = (id: LeaveItem['id']) => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['leaves', id] });
    },
    mutationFn: async (input: UpdateLeaveInput) => {
      const res = await fetch(`http://localhost:3000/api/leaves/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(input),
      });
      const leave = await (res.json() as Promise<LeaveItem>);

      return leave;
    },
  });
};
