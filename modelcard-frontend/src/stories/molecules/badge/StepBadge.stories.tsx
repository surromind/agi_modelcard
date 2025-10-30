import { Meta, StoryObj } from '@storybook/react';

import StepBadge from '@/components/molecules/StepBadge';

const meta: Meta<typeof StepBadge> = {
  title: 'molecules/badge/StepBadge',
  component: StepBadge,
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
    $step: '1',
  },
};
