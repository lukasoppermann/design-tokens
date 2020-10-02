import groupByName from '../../src/utilities/groupByName'

describe("groupByName", () => {
  test("group tokens with name", () => {
    expect(groupByName([
      {
        name: "token/one/first",
        values: {
          'token': 'one first'
        }
      },
      {
        name: "token/one / second",
        values: {
          'token': 'one second'
        }
      },
      {
        name: "token/two /first",
        values: {
          'token': 'two first'
        }
      }
    ], false)).toStrictEqual({ 
      "token": { 
        "one": { 
          "first": { 
            "name": "token/one/first",
            "values": { "token": "one first" } 
          }, 
          "second": { 
            "name": "token/one / second",
            "values": { "token": "one second" } 
          } 
        }, 
        "two": { 
          "first": { 
            "name": "token/two /first",
            "values": { "token": "two first" } 
          } 
        } 
      } 
    })
  })

  test("group tokens & remove name", () => {
    expect(groupByName([
      {
        name: "token/one/first",
        values: {
          'token': 'one first'
        }
      },
      {
        name: "token/one / second",
        values: {
          'token': 'one second'
        }
      },
      {
        name: "token/two /first",
        values: {
          'token': 'two first'
        }
      }
    ])).toStrictEqual({
      "token": {
        "one": {
          "first": {
            "values": { "token": "one first" }
          },
          "second": {
            "values": { "token": "one second" }
          }
        },
        "two": {
          "first": { "values": { "token": "two first" } }
        }
      }
    })
  })

  test("no tokens", () => {
    expect(groupByName([])).toStrictEqual([])
  })
})