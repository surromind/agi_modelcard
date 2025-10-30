import { Meta, StoryObj } from '@storybook/react';

import FilterTab from '@/components/molecules/filter/FilterTab';

const meta: Meta<typeof FilterTab> = {
  title: 'molecules/filter/FilterTab',
  component: FilterTab,
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
