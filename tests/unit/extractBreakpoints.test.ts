import extractBreakpoints from '../../src/extractor/extractBreakpoints'
import { customTokenNode } from './data/customTokenNode.data'

describe('extracting breakpoints', () => {
    const nodeArray = [
        customTokenNode,
        {
            ...customTokenNode,
            ...{ name: 'breakpoints/desktop' }
        },
        {
            ...customTokenNode,
            ...{
                name: 'breakpoints/desktop no desc',
                description: null,
                width: 1440
            }
        }
    ]

    test('extracting only the token with correct name from customTokenNodesArray', () => {
        expect(extractBreakpoints(nodeArray)).toStrictEqual([{
            category: 'breakpoint',
            description: 'the width will be set as a max-width for desktop',
            name: 'breakpoints/desktop',
            values: {
                width: {
                    type: 'number',
                    unit: 'pixel',
                    value: 1440,
                }
            }
        },
        {
            category: 'breakpoint',
            description: null,
            name: 'breakpoints/desktop no desc',
            values: {
                width: {
                    type: 'number',
                    unit: 'pixel',
                    value: 1440,
                }
            }
        },
        {
            category: 'breakpoint',
            description: null,
            name: 'breakpoints/tablet no desc',
            values: {
                width: {
                    type: 'number',
                    unit: 'pixel',
                    value: 834,
                }
            }
        },
        {
            category: 'breakpoint',
            description: null,
            name: 'breakpoints/mobile no desc',
            values: {
                width: {
                    type: 'number',
                    unit: 'pixel',
                    value: 375,
                }
            }
        }
        ])
    })
})