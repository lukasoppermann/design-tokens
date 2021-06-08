import { css } from '@emotion/css'
import * as React from 'react'
import { versionDifference } from '../../utilities/semVerDifference'

const style = css`
  font-family: var(--font-stack);
  font-size: var(--font-size-xsmall);
  font-weight: var(--font-weight-normal);
  letter-spacing: var(--font-letter-spacing-pos-xsmall);
  line-height: var(--font-line-height);
  margin-top: var(--size-xxsmall);
  padding: var(--size-xxsmall);
  border-radius: 3px;
  display: flex;
  align-items: center;
  position: relative;
  background: var(--blue-10);
  color: var(--blue-black);
  &.is-hidden {
    display: none;
  }
  a {
    color: var(--blue);
    &:hover {
      text-decoration: none;
    }
    &.subtle {
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .icon {
    margin-right: var(--size-xxsmall);
    margin-left: var(--size-xxxsmall);
  }
`

interface VersionNoticeProps {
  versionDifference?: versionDifference
}

export const VersionNotice = ({ versionDifference }: VersionNoticeProps) => {
  if (versionDifference !== 'major' && versionDifference !== 'minor') {
    return <></>
  }
  return (
    <div id='versionNotice' className={style}>
      <div className='icon'>🎉</div>
      <div>
        The <a className='subtle' href='https://www.figma.com/community/plugin/888356646278934516/Design-Tokens' target='_blank' rel='noreferrer'>Design Token plugin</a> was
        updated.<br />
        Find out about changes & new features in the <a href='https://github.com/lukasoppermann/design-tokens/releases' target='_blank' rel='noreferrer'>release notes →</a>
      </div>
    </div>
  )
}
