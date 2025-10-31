import { Meta, StoryObj } from '@storybook/react';
import { Reset } from 'styled-reset';

import TestView from '@/components/atoms/TestView';
import icDoc from '@/assets/images/atoms/icDoc.svg';

const meta: Meta<typeof TestView> = {
  title: 'atoms/TestView',
  component: TestView,
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
    $isLoading: true,
    $originImg: icDoc,
    $resultImg: icDoc,
  },
};
