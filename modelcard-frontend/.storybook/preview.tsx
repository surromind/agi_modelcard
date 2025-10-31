import type {Preview} from '@storybook/react';
import StyledComponentsRegistry from '@/lib/registry';
import {Inter, Noto_Sans_KR} from 'next/font/google';
import GlobalStyles from '@/assets/styles/globalStyles';
import React from 'react';
import ReactQueryProvider from '@/utils/ReactQueryProvider';
import styled from 'styled-components';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--inter',
});

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--notoSansKr',
});

const preview: Preview = {
      parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
          matchers: {
            color: /(background|color)$/i,
            date: /Date$/i,
          },
        },
      },
      decorators: [
        (Story) => (
            <div className={notoSansKr.className}>
                <div className={`${notoSansKr.variable} ${inter.variable}`}>
                    <StyledComponentsRegistry>
                        <GlobalStyles />
                        <ReactQueryProvider>
                            <BaseFrame>
                                <Story/>
                            </BaseFrame>
                        </ReactQueryProvider>
                    </StyledComponentsRegistry>
                </div>
            </div>
        ),
    ],
};

export default preview;

const BaseFrame = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    min-width: 800px;
`
