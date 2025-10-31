import { Meta, StoryObj } from '@storybook/react';

import IconButtonUser from '@/components/atoms/buttons/IconButtonUser';

const meta = {
  title: 'Atoms/Buttons/IconButtonUser',
  component: IconButtonUser,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true, // app router 허용 설정
    },
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof IconButtonUser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrevIconButton: Story = {
  args: {
    $iconLetter: 'U',
  },
};
