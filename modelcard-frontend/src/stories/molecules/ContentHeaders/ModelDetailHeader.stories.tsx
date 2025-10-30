import { Meta, StoryObj } from '@storybook/react';
import { Reset } from 'styled-reset';

import ModelDetailHeader from '@/components/molecules/ContentHeaders/ModelDetailHeader';

const meta: Meta<typeof ModelDetailHeader> = {
  title: 'molecules/contentHeader/ModelDetailHeader',
  component: ModelDetailHeader,
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
    $initial: 'CV',
    $title: 'Compute Vision_Transformer_Car',
    $description: '카드와 관련된 설명이 보여집니다 카드와 관련된 설명이 보여집니다 카드와 관련된 설명이 보여집니다',
    $created: '111',
    $updated: '222',
    $onClick: () => { console.log('click'); },
    $currentStep: 'operation',
    $hashtag: {
      task: 'sdf',
      framework: 'Pytorch',
      license: 'PytorchPytorchPyto20',
    },
    $hashtagIcon: 'computerVision',
  },
};
