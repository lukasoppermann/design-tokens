import handleVariableAlias from '@utils/handleVariableAlias'

import { tokenExportKeyType } from '@typings/tokenExportKey'
import { tokenTypes } from '@config/tokenTypes'

import { getVariableTypeByValue } from '@utils/getVariableTypeByValue'
import { changeNotation } from '@utils/changeNotation'

jest.mock('@utils/getVariableTypeByValue', () => ({
  getVariableTypeByValue: jest.fn()
}))

jest.mock('@utils/changeNotation', () => ({
  changeNotation: jest.fn()
}))

describe('handleVariableAlias', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  beforeAll(() => {
    // @ts-ignore
    global.figma = {
      variables: {
        getVariableByIdAsync: jest.fn(),
        getVariableCollectionByIdAsync: jest.fn()
      }
    }
  })

  it('should return the correct object', async () => {
    const variable = { description: 'test description' } as any
    const value = { id: 'test id' }
    const resolvedAlias = {
      variableCollectionId: 'test collection id',
      name: 'test name',
      valuesByMode: { mode1: 'value1' }
    }
    const collection = {
      name: 'test collection name',
      modes: 'test modes'
    }

    // @ts-ignore
    await global.figma.variables.getVariableByIdAsync.mockReturnValue(resolvedAlias)

    // @ts-ignore
    getVariableTypeByValue.mockImplementation(() => 'test category')

    // @ts-ignore
    changeNotation.mockImplementation(() => 'test notation')

    // @ts-ignore
    global.figma.variables.getVariableCollectionByIdAsync.mockReturnValue(
      collection
    )

    const result = await handleVariableAlias(variable, value, { modeId: 'passedInModeId', name: 'passedInMode' })

    expect(result).toEqual({
      description: 'test description',
      exportKey: tokenTypes.variables.key as tokenExportKeyType,
      category: 'test category',
      values: '{test collection name.test notation}',
      aliasCollectionName: 'test collection name',
      aliasMode: { modeId: 'passedInModeId', name: 'passedInMode' },
      aliasSameMode: false
    })
  })

  it('should return null when the alias target cannot be resolved', async () => {
    const variable = { name: 'test variable', description: 'test description' } as any
    const value = { id: 'missing alias id' }

    // @ts-ignore
    global.figma.variables.getVariableByIdAsync.mockReturnValue(null)

    const result = await handleVariableAlias(variable, value, { modeId: 'passedInModeId', name: 'passedInMode' })

    expect(result).toBeNull()
    // @ts-ignore
    expect(global.figma.variables.getVariableCollectionByIdAsync).not.toHaveBeenCalled()
    // @ts-ignore
    expect(getVariableTypeByValue).not.toHaveBeenCalled()
    // @ts-ignore
    expect(changeNotation).not.toHaveBeenCalled()
  })

  it('should return null when the alias collection cannot be resolved', async () => {
    const variable = { name: 'test variable', description: 'test description' } as any
    const value = { id: 'test id' }
    const resolvedAlias = {
      variableCollectionId: 'missing collection id',
      name: 'test name',
      valuesByMode: { mode1: 'value1' }
    }

    // @ts-ignore
    global.figma.variables.getVariableByIdAsync.mockReturnValue(resolvedAlias)
    // @ts-ignore
    global.figma.variables.getVariableCollectionByIdAsync.mockReturnValue(null)

    const result = await handleVariableAlias(variable, value, { modeId: 'passedInModeId', name: 'passedInMode' })

    expect(result).toBeNull()
  })

  it('should return null when the alias target has no resolved values', async () => {
    const variable = { name: 'test variable', description: 'test description' } as any
    const value = { id: 'test id' }
    const resolvedAlias = {
      variableCollectionId: 'test collection id',
      name: 'test name',
      valuesByMode: {}
    }
    const collection = {
      name: 'test collection name'
    }

    // @ts-ignore
    global.figma.variables.getVariableByIdAsync.mockReturnValue(resolvedAlias)
    // @ts-ignore
    global.figma.variables.getVariableCollectionByIdAsync.mockReturnValue(collection)

    const result = await handleVariableAlias(variable, value, { modeId: 'passedInModeId', name: 'passedInMode' })

    expect(result).toBeNull()
    // @ts-ignore
    expect(getVariableTypeByValue).not.toHaveBeenCalled()
    // @ts-ignore
    expect(changeNotation).not.toHaveBeenCalled()
  })
})
