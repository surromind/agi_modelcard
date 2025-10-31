import { Meta, StoryObj } from '@storybook/react';
import { Reset } from 'styled-reset';

import UserProfile from '@/components/atoms/UserProfile';

const meta: Meta<typeof UserProfile> = {
  title: 'atoms/UserProfile',
  component: UserProfile,
  decorators: [
    (Story) => (
      <>
        <Reset />
        <Story />
      </>
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
