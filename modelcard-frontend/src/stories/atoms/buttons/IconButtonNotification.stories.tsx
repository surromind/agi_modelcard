import { Meta, StoryObj } from '@storybook/react';

import IconButtonNotification from '@/components/atoms/buttons/IconButtonNotification';

const meta = {
  title: 'Atoms/Buttons/IconButtonNotification',
  component: IconButtonNotification,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true, // app router 허용 설정
    },
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof IconButtonNotification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrevIconButton: Story = {
  args: {
  },
};
