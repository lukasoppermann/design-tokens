const writeJson = (json) => {
  // convert json to string
  const jsonString = JSON.stringify(json, null, 2)
  // send json string to ui to prompt download
  figma.ui.postMessage({
    command: "export",
    data: {
      filename: "design-tokens.json",
      data: jsonString
    }  
  })
}

export default writeJson