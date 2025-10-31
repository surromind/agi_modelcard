import { Meta, StoryObj } from '@storybook/react';

import IconTextButton42 from '@/components/atoms/buttons/IconTextButton42';

const meta: Meta<typeof IconTextButton42> = {
  title: 'atoms/buttons/IconTextButton42',
  component: IconTextButton42,
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
