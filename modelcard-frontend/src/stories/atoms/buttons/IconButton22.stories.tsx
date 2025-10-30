import { Meta, StoryObj } from '@storybook/react';

import IconButton22 from '@/components/atoms/buttons/IconButton22';

const meta = {
  title: 'Atoms/Buttons/IconButton22',
  component: IconButton22,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true, // app router 허용 설정
    },
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof IconButton22>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrevIconButton: Story = {
  args: {
    $iconType: 'prev',
  },
};
