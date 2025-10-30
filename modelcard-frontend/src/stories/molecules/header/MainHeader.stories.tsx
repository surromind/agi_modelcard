import { Meta, StoryObj } from '@storybook/react';

import MainHeader from '@/components/molecules/MainHeader';

const meta: Meta<typeof MainHeader> = {
  title: 'molecules/header/MainHeader',
  component: MainHeader,
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

export const DefaultMainHeader: Story = {
  args: {
    $notificationCount: 10,
    $userInitial: 'K',
  },
};
