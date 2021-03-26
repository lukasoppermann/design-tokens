const getDescription = (description: string|null|undefined, descriptionKey: string = 'comment'): { comment?: string } => {
  if (description && typeof description === 'string' && description.length > 0) {
    return { comment: description }
  }
  // if invalid description return an empty object
  return {}
}

export default getDescription
