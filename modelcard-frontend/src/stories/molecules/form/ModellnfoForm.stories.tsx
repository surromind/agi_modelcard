import { Meta, StoryObj } from '@storybook/react';

import ModelInfoForm from '@/components/molecules/form/ModelInfoForm';

const meta: Meta<typeof ModelInfoForm> = {
  title: 'molecules/form/ModelInfoForm',
  component: ModelInfoForm,
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

export const DefaultMainHeader: Story = {
  args: {},
};
