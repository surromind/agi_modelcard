import { Meta, StoryObj } from '@storybook/react';
import { Reset } from 'styled-reset';

import Modal from '@/components/atoms/Modal';

const meta: Meta<typeof Modal> = {
  title: 'atoms/Modal',
  component: Modal,
  decorators: [
    (Story) => (
      <>
        <Reset />
        <Story />
      </>
    ),
  ],
  parameters: {
    // layout: 'centered',
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
    $contentType: 'projectToStaging',
  },
};
