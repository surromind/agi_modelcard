import { Meta, StoryObj } from '@storybook/react';

import Input from '@/components/atoms/input/Input';

const meta: Meta<typeof Input> = {
  title: 'atoms/input/Input',
  component: Input,
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
