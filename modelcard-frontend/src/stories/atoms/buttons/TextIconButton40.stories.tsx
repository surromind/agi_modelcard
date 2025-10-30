import { Meta, StoryObj } from '@storybook/react';

import TextIconButton40 from '@/components/atoms/buttons/TextIconButton40';

const meta: Meta<typeof TextIconButton40> = {
  title: 'atoms/buttons/TextIconButton40',
  component: TextIconButton40,
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

export const 초기화: Story = {
  args: {
    $iconType: 'reset',
    $text: '초기화',
  },
};

export const 취소: Story = {
  args: {
    $iconType: 'cancel',
    $text: '취소',
  },
};

export const 확인: Story = {
  args: {
    $iconType: 'confirm',
    $text: '확인',
  },
};

export const 등록하기 : Story = {
  args: {
    $iconType: 'confirm',
    $text: '등록하기',
  },
};
