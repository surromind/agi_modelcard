import { Meta, StoryObj } from '@storybook/react';

import TextButton from '@/components/atoms/buttons/TextButton';

const meta = {
  title: 'Atoms/Buttons/TextButton',
  component: TextButton,
  // decorators: [(Story) => <TestLayout><Story /></TestLayout>],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true, // app router 허용 설정
    },
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof TextButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    $text: '시작하기',
  },
};
