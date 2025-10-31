import { Meta, StoryObj } from '@storybook/react';

import SelectBox from '@/components/atoms/selectbox/SelectBox';

const meta: Meta<typeof SelectBox> = {
  title: 'atoms/selectbox/SelectBox',
  component: SelectBox,
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
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
    options: [
      { id: 1, name: 'Option 1' },
      { id: 2, name: 'Option 2' },
      { id: 3, name: 'Option 3' },
      { id: 4, name: 'Option 4' },
      { id: 5, name: 'Option 5' },
    ],
  },
};
