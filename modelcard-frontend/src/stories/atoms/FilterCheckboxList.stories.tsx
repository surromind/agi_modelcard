import { Meta, StoryObj } from '@storybook/react';

import FilterCheckboxList from '@/components/atoms/FilterCheckboxList';

const meta: Meta<typeof FilterCheckboxList> = {
  title: 'atoms/FilterCheckboxList',
  component: FilterCheckboxList,
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
