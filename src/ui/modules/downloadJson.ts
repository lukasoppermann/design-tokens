const downloadJson = (parent, link: HTMLLinkElement, filename: string, json: string) => {
  // if no tokens are present
  if (json === '[]') {
    parent.postMessage({
      pluginMessage: {
        command: 'closePlugin',
        notification: '⛔️ No design token detected!'
      }
    }, '*')
    // abort
    return
  }
  // set name
  // @ts-ignore
  link.download = filename || 'design-tokens'
  link.title = filename || 'design-tokens'
  // Create an object URL for the blob object
  link.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(json)
  // try to export tokens
  try {
    // Programmatically trigger a click on the anchor element
    link.click()
    // send success messgae
    parent.postMessage({
      pluginMessage: {
        command: 'closePlugin',
        notification: '🎉 Design token export succesfull!'
      }
    }, '*')
  } catch (error) {
    // send success messgae
    parent.postMessage({
      pluginMessage: {
        command: 'closePlugin',
        notification: '⛔️ Design token failed!'
      }
    }, '*')
    // log error
    console.error('Export error: ', error)
  }
}

export default downloadJson
