import { Meta, StoryObj } from '@storybook/react';

import ApiTest from '@/components/test/ApiTest';

const meta: Meta<typeof ApiTest> = {
  title: 'API/ApiTest',
  component: ApiTest,
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
