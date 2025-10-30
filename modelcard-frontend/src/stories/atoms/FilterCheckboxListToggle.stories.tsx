import { Meta, StoryObj } from '@storybook/react';

import FilterCheckboxListToggle from '@/components/atoms/FilterCheckboxListToggle';

const meta: Meta<typeof FilterCheckboxListToggle> = {
  title: 'atoms/FilterCheckboxListToggle',
  component: FilterCheckboxListToggle,
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

export const DefaultMainContentsTopFilter: Story = {
  args: {
  },
};
