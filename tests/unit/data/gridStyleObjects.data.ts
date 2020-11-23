export const gridStyles = [
  {
    name: 'grid/rows & columns',
    description: 'a description grid',
    layoutGrids: [
      {
        //   readonly pattern: "ROWS" | "COLUMNS"
        pattern: "ROWS",
        //   readonly alignment: "MIN" | "MAX" | "STRETCH" | "CENTER"
        alignment: "CENTER",
        gutterSize: 7,
        count: 8,        // Infinity when "Auto" is set in the UI
        sectionSize: 10, // Not set for alignment: "STRETCH"
        // offset?: number      // Not set for alignment: "CENTER"
        visible: true,
        color: { 
          r: 0.1,
          g: 0.2,
          b: 0.3,
          a: 0.4
        }
      },
      {
        //   readonly pattern: "ROWS" | "COLUMNS"
        pattern: "COLUMNS",
        //   readonly alignment: "MIN" | "MAX" | "STRETCH" | "CENTER"
        alignment: "MAX",
        gutterSize: 7,
        count: Infinity,        // Infinity when "Auto" is set in the UI
        sectionSize: 10, // Not set for alignment: "STRETCH"
        offset: 9,      // Not set for alignment: "CENTER"
        visible: true,
        color: { 
          r: 0.1,
          g: 0.2,
          b: 0.3,
          a: 0.4
        }
      }
    ]
  },
  {
    name: 'grid/grid no description',
    layoutGrids: [
      {
        pattern: "GRID",
        sectionSize: 5,
        visible: true,
        color: { 
          r: 0.1,
          g: 0.2,
          b: 0.3,
          a: 0.4
        }
      }
    ]
  }
]
export const gridStyleObjects = [
  {
    name: 'grid/rows & columns',
    description: 'a description grid',
    layoutGrids: [
      {
        //   readonly pattern: "ROWS" | "COLUMNS"
        pattern: "ROWS",
        //   readonly alignment: "MIN" | "MAX" | "STRETCH" | "CENTER"
        alignment: "CENTER",
        gutterSize: 7,
        count: 8,        // Infinity when "Auto" is set in the UI
        sectionSize: 10, // Not set for alignment: "STRETCH"
        // offset?: number      // Not set for alignment: "CENTER"
        visible: true,
        color: { 
          r: 0.1,
          g: 0.2,
          b: 0.3,
          a: 0.4
        }
      },
      {
        //   readonly pattern: "ROWS" | "COLUMNS"
        pattern: "COLUMNS",
        //   readonly alignment: "MIN" | "MAX" | "STRETCH" | "CENTER"
        alignment: "MAX",
        gutterSize: 7,
        count: Infinity,        // Infinity when "Auto" is set in the UI
        sectionSize: 10, // Not set for alignment: "STRETCH"
        offset: 9,      // Not set for alignment: "CENTER"
        visible: true,
        color: { 
          r: 0.1,
          g: 0.2,
          b: 0.3,
          a: 0.4
        }
      }
    ]
  },
  {
    name: 'grid/grid no description',
    description: undefined,
    layoutGrids: [
      {
        pattern: "GRID",
        sectionSize: 5,
        visible: true,
        color: { 
          r: 0.1,
          g: 0.2,
          b: 0.3,
          a: 0.4
        }
      }
    ]
  }
]