import { Meta, StoryObj } from '@storybook/react';

import HashtagForDetail from '@/components/atoms/hashtag/HashtagForDetail';

const meta: Meta<typeof HashtagForDetail> = {
  title: 'atoms/hashtagForDetail/HashtagForDetail',
  component: HashtagForDetail,
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
