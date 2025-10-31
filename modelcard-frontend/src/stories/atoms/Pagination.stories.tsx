import { Meta, StoryObj } from '@storybook/react';

import Pagination from '@/components/atoms/pagination';

const meta: Meta<typeof Pagination> = {
  title: 'atoms/Pagination',
  component: Pagination,
  decorators: [
    (Story) => (
      <Story />
    ),
  ],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true, // app router 허용 설정
    },

  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
