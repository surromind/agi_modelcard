import { Meta, StoryObj } from '@storybook/react';
import { Reset } from 'styled-reset';

import ModelAddHeader from '@/components/molecules/ContentHeaders/ModelAddHeader';

const meta: Meta<typeof ModelAddHeader> = {
  title: 'molecules/contentHeader/ModelAddHeader',
  component: ModelAddHeader,
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
      { name: 'Home', url: '/' },
      { name: 'menu1', url: '/' },
      { name: 'menu22', url: '/' },
    ],
    $step: '3',
  },
};
