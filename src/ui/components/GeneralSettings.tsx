import * as React from 'react'
import { Button } from '@components/Button'
import { Checkbox } from '@components/Checkbox'
import { Input } from '@components/Input'
import { Select } from '@components/Select'
import { Label } from '@components/Label'
import { Title } from '@components/Title'
import { Text } from '@components/Text'
import { CancelButton } from '@components/CancelButton'
import { useContext, useState } from 'react'
import { FigmaContext, SettingsContext } from '@ui/context'
import { css } from '@emotion/css'
import { commands } from '@config/commands'
import config from '@config/config'
import { Footer } from '@components/Footer'
import { nameConversionType, Settings, tokenFormatType } from '@typings/settings'
import { Row } from '@components/Row'
import { Info } from '@components/Info'
import { Separator } from './Separator'
import { WebLink } from './WebLink'

const style = css`
  display: flex;
  flex-direction: column;
  h1:first-child {
    margin-top: 0 !important;
  }
  .grid-2-col {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`

const labelStyle = css`
  width: 85px;
`

const textStyle = css`
  padding: 0 var(--size-xxxsmall) 0 var(--size-xxsmall);
  color: var(--figma-color-text-secondary);
  margin-top: 0;
`

const isStyle = (key: string): boolean => ['color', 'gradient', 'grid', 'effect', 'font'].includes(key)

export const GeneralSettings = () => {
  const [isStandard, setStandard] = useState(false)
  const { figmaUIApi, figmaMetaData } = useContext(FigmaContext)
  const { settings, updateSettings } = useContext<{settings: Settings, updateSettings: any}>(SettingsContext)

  const handleFormSubmit = (event) => {
    event.preventDefault() // Prevent form submit triggering navigation
    const settingsForm = event.target
    if (settingsForm.checkValidity() === true) {
      const { accessToken, ...pluginSettings } = settings
      // save date to local storage
      figmaUIApi.postMessage({
        pluginMessage: {
          command: commands.saveSettings,
          payload: {
            closePlugin: true,
            settings: pluginSettings,
            accessToken: accessToken
          }
        }
      // @ts-ignore
      }, '*')
    }
  }

  return (
    <form className={style} onSubmit={handleFormSubmit}>
      <Title size="xlarge" weight="bold">
        Design Token Settings
      </Title>
      <Row>
        <Checkbox
          label="Add token type to name of the token"
          type="switch"
          checked={settings.keyInName}
          onChange={(value) =>
            updateSettings((draft) => {
              draft.keyInName = value;
            })
          }
        />
        <Info
          width={240}
          label='The token type (e.g. "color" or "font") will be added to the name e.g. "color/light/bg".'
        />
      </Row>
      <Title size="small" weight="bold">
        Filename
        <Info
          width={160}
          label="The file name used when exporting the tokens"
        />
      </Title>
      <div className="grid-2-col">
        <Input
          type="text"
          required
          pattern="^[\w\d\s\[\]._\-]+$"
          placeholder={figmaMetaData.filename}
          value={settings.filename}
          onChange={(value) =>
            updateSettings((draft: Settings) => {
              draft.filename = value;
            })
          }
        />
        <Select
          defaultValue={settings.extension}
          onChange={({ value }) =>
            updateSettings((draft: Settings) => {
              draft.extension = value as string;
            })
          }
          placeholder="file extension"
          options={config.fileExtensions}
        />
      </div>
      <Separator />
      <div className="grid-2-col">
        <div>
          <Title size="small" weight="bold">
            Name conversion
          </Title>
          <Select
            defaultValue={settings.nameConversion}
            onChange={({ value }) =>
              updateSettings((draft: Settings) => {
                draft.nameConversion = value as nameConversionType;
              })
            }
            placeholder="Name conversion"
            options={[
              {
                label: "Default",
                value: "default",
              },
              {
                label: "camelCase",
                value: "camelCase",
              },
              {
                label: "kebab-case",
                value: "kebabCase",
              },
            ]}
          />
        </div>
        <div>
          <Title size="small" weight="bold">
            Token format
            <Info
              width={240}
              label="The structure of the output json file. Learn more in the docs."
            />
          </Title>
          <Select
            defaultValue={settings.tokenFormat}
            onChange={({ value }) => {
              updateSettings((draft: Settings) => {
                draft.tokenFormat = value as tokenFormatType;
              });
              setStandard(value === "standard");
            }}
            placeholder="Token format"
            options={[
              {
                label: "Standard (W3C draft)",
                value: "standard",
              },
              {
                label: "Original (deprecated)",
                value: "original",
              },
            ]}
          />
        </div>
      </div>
      <Separator />
      <div className="grid-2-col">
        <div>
          <Title size="small" weight="bold">
            Exclusion prefix{" "}
            <Info
              width={240}
              label='Styles & tokens with this prefix will be ignored when exporting. ("." and "_" work by default)'
            />
          </Title>
          <Input
            type="text"
            pattern="^[#\+*\\/&%$!?;:~,\s]+$"
            placeholder="exclusion prefix"
            value={settings.exclusionPrefix}
            onChange={(value) =>
              updateSettings((draft: Settings) => {
                draft.exclusionPrefix = value;
              })
            }
          />
        </div>
        {isStandard && (
          <div>
            <Title size="small" weight="bold">
              Alias identifier{" "}
              <Info
                width={180}
                label="Use to define an alias for a token; case insensitive"
              />
            </Title>
            <Input
              type="text"
              pattern="^[A-Za-z,\s]+$"
              placeholder="alias, ref, reference"
              value={settings.alias}
              onChange={(value) =>
                updateSettings((draft: Settings) => {
                  draft.alias = value;
                })
              }
            />
          </div>
        )}
      </div>
      <Separator />
      <div className="grid-2-col">
        <div>
          <Title size="small" weight="bold">
            Reference mode in variables
            <Info
              width={240}
              label="If disabled, the exported json will not include the mode of variables."
            />
          </Title>
          <Checkbox
            label="Enable/disable mode referencing"
            type="switch"
            checked={settings.modeReference}
            onChange={(value) =>
              updateSettings((draft) => {
                draft.modeReference = value;
              })
            }
          />
        </div>
      </div>
      <Separator />
      <Title size="small" weight="bold">
        Token prefixes{" "}
        <Info width={150} label="Use commas to separate multiple prefixed" />
      </Title>
      <Text className={textStyle} size="small">
        Prefixes are the first part of a tokens name e.g. "radius" in
        "radius/small". They are used to identify the type of a custom token.
      </Text>
      <Row>
        <Checkbox
          label="Include token prefix in token names"
          type="switch"
          checked={settings.prefixInName}
          onChange={(value) =>
            updateSettings((draft) => {
              draft.prefixInName = value;
            })
          }
        />
        <Info
          width={240}
          label='When disabled the prefix is removed ("radius/small" → "small"), when enabled it is added ("radius/small" → "radius/small").'
        />
      </Row>
      <Separator />
      <Title size="small" weight="bold">
        Hide from publish{" "}
        <Info width={150} label='Export "Hide from publish" variables' />
      </Title>
      <Text className={textStyle} size="small">
        If you edit one or more variables to set them to "Hide from Publish", they are not exported.
        By turning this option on, they will be instead included in the export.
      </Text>
      <Row>
        <Checkbox
          label='Export "Hide from publish" variables'
          type="switch"
          checked={settings.exportHideFromPublish}
          onChange={(value) =>
            updateSettings((draft) => {
              console.log(value, draft)
              draft.exportHideFromPublish = value;
            })
          }
        />
      </Row>
      <Separator />
      <div className="grid-2-col">
        {Object.entries(settings.prefix).map(([key, currentValue]) => (
          <Row fill key={key}>
            <Label className={`${labelStyle} flex-grow--none`}>
              {key}
              {isStyle(key) ? <Info width={90} label="Prefix for style" /> : ""}
            </Label>
            <Input
              type="text"
              // eslint-disable-next-line
              pattern={isStyle(key) ? "^[\\w\\-@]+$" : "^[\\w\\-@,\\s]+$"}
              required
              placeholder={key}
              value={currentValue}
              onChange={(value) =>
                updateSettings((draft: Settings) => {
                  draft.prefix[key] = value;
                })
              }
            />
          </Row>
        ))}
      </div>
      <Footer>
        <WebLink
          align="start"
          href="https://github.com/lukasoppermann/design-tokens#design-tokens"
        >
          Documentation
        </WebLink>
        <CancelButton />
        <Button type="submit" autofocus>
          Save changes
        </Button>
      </Footer>
    </form>
  );
}
