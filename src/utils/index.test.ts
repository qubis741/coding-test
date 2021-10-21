import { roundTo2Decimals } from 'utils/index'

test('roundTo2Decimals works', () => {
    expect(roundTo2Decimals(69.8999999999999999)).toEqual(69.90)
})
