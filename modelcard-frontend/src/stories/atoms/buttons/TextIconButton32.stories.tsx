import { Meta, StoryObj } from '@storybook/react';

import TextIconButton32 from '@/components/atoms/buttons/IconTextButton32';

const meta: Meta<typeof TextIconButton32> = {
  title: 'atoms/buttons/TextIconButton32',
  component: TextIconButton32,
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
    $iconType: 'doc',
  },
};
