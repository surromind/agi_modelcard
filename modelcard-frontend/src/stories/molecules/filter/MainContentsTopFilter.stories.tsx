import { Meta, StoryObj } from '@storybook/react';

import MainContentsTopFilter from '@/components/molecules/filter/MainContentsTopFilter';

const meta: Meta<typeof MainContentsTopFilter> = {
  title: 'molecules/filter/MainContentsTopFilter',
  component: MainContentsTopFilter,
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
    $contentsTitle: 'Model',
    $contentsCount: 20,
  },
};
