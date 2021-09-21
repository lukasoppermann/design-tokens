const TinyColor = require('@ctrl/tinycolor')
const fs = require('fs-extra')
const changeCase = require('change-case')

const contents = {
  info: {
    author: 'xcode',
    version: 1
  }
}

const percentageToFloat = percentageString => {
  return parseInt(percentageString.substring(0, percentageString.length - 1)) / 100
}

const ratioRgb = color => {
  const colorObj = new TinyColor.TinyColor(color)
  const percentages = colorObj.toPercentageRgb()

  return {
    red: `${percentageToFloat(percentages.r).toFixed(3)}`,
    green: `${percentageToFloat(percentages.g).toFixed(3)}`,
    blue: `${percentageToFloat(percentages.b).toFixed(3)}`,
    alpha: `${percentages.a.toFixed(3)}`
  }
}

/**
 * This action will iterate over all the colors in the Style Dictionary
 * and for each one write a colorset with light and (optional) dark
 * mode versions.
 */
module.exports = {
  // This is going to run once per theme.
  do: (dictionary, platform) => {
    const assetPath = `${platform.buildPath}/DesignToken.xcassets`
    fs.emptyDirSync(assetPath)
    fs.writeFileSync(`${assetPath}/Contents.json`, JSON.stringify(contents, null, 2))

    dictionary.allTokens
      .filter(token => token.type === 'color')
      .forEach(token => {
        const colorsetPath = `${assetPath}/${changeCase.pascalCase(token.path.slice(2).join(' '))}.colorset`
        fs.ensureDirSync(colorsetPath)

        // The colorset might already exist because Style Dictionary is run multiple
        // times with different configurations. If the colorset already exists we want
        // to modify it rather than writing over it.
        const colorset = fs.existsSync(`${colorsetPath}/Contents.json`)
          ? fs.readJsonSync(`${colorsetPath}/Contents.json`)
          : { ...contents, colors: [] }

        const color = {
          idiom: 'universal',
          color: {
            'color-space': 'srgb',
            components: ratioRgb(token.value)
          }
        }

        if (token.path[0] === 'dark') {
          color.appearances = [{
            appearance: 'luminosity',
            value: 'dark'
          }]
        }

        colorset.colors.push(color)

        fs.writeFileSync(`${colorsetPath}/Contents.json`, JSON.stringify(colorset, null, 2))
      })
  },
  undo: function (dictionary, platform) {
    // no undo
  }
}
