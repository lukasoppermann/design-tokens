export default (prevSemVers = '1.0.0', currentSemVer) => {
  const [pMajor, pMinor, pPatch] = prevSemVers.split('.')
  const [cMajor, cMinor, cPatch] = currentSemVer.split('.')

  if (pMajor < cMajor) {
    return 'major'
  }
  if (pMinor < cMinor) {
    return 'minor'
  }
  if (pPatch < cPatch) {
    return 'patch'
  }
}