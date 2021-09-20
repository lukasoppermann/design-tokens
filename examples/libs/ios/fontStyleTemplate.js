const dateNow = () => {
  return new Date().toLocaleDateString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

module.exports = (style) => `
//
//  ${style.filename}
//
//  Created by Design Token Generator on ${dateNow()}.
//

import UIKit

public class ${style.class} {

  enum Fonts {
    ${style.font.join('\n    ')}
  }

  enum LineHeight {
    ${style.lineheight.join('\n    ')}
  }

  enum Leading {
    ${style.leading.join('\n    ')}
  }

}
`
