import { Meta, StoryObj } from '@storybook/react';

import LevelFormInfoBox from '@/components/atoms/info/LevelFormInfoBox';

const meta: Meta<typeof LevelFormInfoBox> = {
  title: 'atoms/info/LevelFormInfoBox',
  component: LevelFormInfoBox,
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

export const StagingLevelFormInfoBox: Story = {
  args: {
    $infoType: 'staging',
  },
};
