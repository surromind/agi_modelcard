import { Meta, StoryObj } from '@storybook/react';

import ModelCard from '@/components/molecules/ModelCard';

const meta: Meta<typeof ModelCard> = {
  title: 'molecules/ModelCard',
  component: ModelCard,
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
  },
};
