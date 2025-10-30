import { Meta, StoryObj } from '@storybook/react';
import { Reset } from 'styled-reset';

import LeftMenu from '@/components/atoms/LeftMenu';

const meta: Meta<typeof LeftMenu> = {
  title: 'atoms/LeftMenu',
  component: LeftMenu,
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
