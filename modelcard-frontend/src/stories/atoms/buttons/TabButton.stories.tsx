import { Meta, StoryObj } from '@storybook/react';

import TabButton from '@/components/atoms/buttons/TabButton';

const meta: Meta<typeof TabButton> = {
  title: 'atoms/buttons/TabButton',
  component: TabButton,
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

export const primary: Story = {
  args: {
  },
};
