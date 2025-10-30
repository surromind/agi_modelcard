import { Meta, StoryObj } from '@storybook/react';
import { Reset } from 'styled-reset';

import Navigation from '@/components/atoms/Navigation';

const meta: Meta<typeof Navigation> = {
  title: 'atoms/Navigation',
  component: Navigation,
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
    $navigations: [
      { name: 'Models', url: '/' },
      { name: 'menu1', url: '/' },
      { name: 'menu2', url: '/' },
    ],
  },
};
