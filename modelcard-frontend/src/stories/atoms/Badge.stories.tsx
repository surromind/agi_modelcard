import { Meta, StoryObj } from '@storybook/react';

import Badge from '@/components/atoms/badge/Badge';

const meta: Meta<typeof Badge> = {
  title: 'atoms/Badge',
  component: Badge,
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
  args: {
    $text: 'Project',
  },
};
