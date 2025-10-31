import { Meta, StoryObj } from '@storybook/react';

import LevelRadio from '@/components/atoms/radio/LevelRadio';

const meta: Meta<typeof LevelRadio> = {
  title: 'atoms/radio/LevelRadio',
  component: LevelRadio,
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
