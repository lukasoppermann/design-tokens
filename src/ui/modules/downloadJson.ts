export const downloadJson = (parent, link: HTMLLinkElement, json: string) => {
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
  // try to export tokens
  try {
    link.href = `data:text/json;charset=utf-8,${encodeURIComponent(json)}`
    console.log(link.href)
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
