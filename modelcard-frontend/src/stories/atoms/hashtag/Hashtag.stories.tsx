import { Meta, StoryObj } from '@storybook/react';

import Hashtag from '@/components/atoms/hashtag/Hashtag';

const meta: Meta<typeof Hashtag> = {
  title: 'atoms/hashtagForDetail/Hashtag',
  component: Hashtag,
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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    $text: 'Computer Viesion > Pose Estimation',
  },
};
