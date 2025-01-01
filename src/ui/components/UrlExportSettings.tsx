import * as React from "react";
import { useContext, useState } from "react";
import { Button } from "@components/Button";
import { Checkbox } from "@components/Checkbox";
import { Input } from "@components/Input";
import { Select } from "@components/Select";
import { Title } from "@components/Title";
import { FigmaContext, SettingsContext, TokenContext } from "@ui/context";
import { CancelButton } from "./CancelButton";
import { css } from "@emotion/css";
import { Footer } from "./Footer";
import { prepareExport } from "@utils/prepareExport";
import { Settings } from "@typings/settings";
import { Info } from "@components/Info";
import { Row } from "@components/Row";
import { urlExport } from "../modules/urlExport";
import {
  urlExportRequestBody,
  urlExportSettings,
} from "@typings/urlExportData";
import { PluginMessage } from "@typings/pluginEvent";
import { commands } from "@config/commands";
import { stringifyJson } from "@utils/stringifyJson";
import { WebLink } from "./WebLink";
import { Separator } from "./Separator";
import config from "@config/config";

const style = css`
  display: flex;
  flex-direction: column;
  h1:first-child {
    margin-top: 0 !important;
  }
  .grid-3-col {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const UrlExportSettings = () => {
  const { settings, updateSettings } = useContext<{
    settings: Settings;
    updateSettings: any;
  }>(SettingsContext);
  const { tokens, setTokens } = useContext(TokenContext);
  const { figmaUIApi } = useContext(FigmaContext);
  const [commitMessage, setCommitMessage] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent form submit triggering navigation
    const exportSettingsForm = event.target;
    if (exportSettingsForm.checkValidity() === true) {
      const { accessToken, ...pluginSettings } = settings;
      // save settings to local storage
      figmaUIApi.postMessage(
        {
          pluginMessage: {
            command: commands.saveSettings,
            payload: {
              settings: pluginSettings,
              accessToken: accessToken,
            },
          } as PluginMessage,
          // @ts-ignore
        },
        "*"
      );
      // prepare token json
      const tokensToExport = prepareExport(tokens, pluginSettings);
      setTokens(tokensToExport);
      // download tokens
      urlExport(
        parent,
        {
          url: settings.serverUrl,
          accessToken: settings.accessToken,
          acceptHeader: settings.acceptHeader,
          contentType: settings.contentType,
          authType: settings.authType,
          reference: settings.reference,
        } as urlExportSettings,
        {
          event_type: settings.eventType,
          client_payload: {
            tokens: `${stringifyJson(
              tokensToExport,
              settings.urlJsonCompression
            )}`,
            filename: `${settings.filename}${settings.extension}`,
            commitMessage: `${commitMessage}`,
          },
        } as urlExportRequestBody
      );
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className={style}>
      <Title size="xlarge" weight="bold">
        URL Export settings
      </Title>
      <Row>
        <Checkbox
          label="Compress JSON output"
          type="switch"
          checked={settings.urlJsonCompression}
          onChange={(value) =>
            updateSettings((draft) => {
              draft.urlJsonCompression = value;
            })
          }
        />
        <Info
          width={240}
          label="Compression removes line breaks and whitespace from the json string"
        />
      </Row>
      <Separator />
      <Title size="xlarge" weight="bold">
        Server settings
      </Title>
      <h3>
        Event type
        <Info width={150} label='"event_type" property in post request' />
      </h3>
      <Row fill>
        <Input
          type="text"
          required
          pattern="^[\w\-\.\+@]+$"
          placeholder="update-tokens"
          value={settings.eventType}
          onChange={(value) =>
            updateSettings((draft) => {
              draft.eventType = value;
            })
          }
        />
      </Row>

      <h3>
        Server url
        <Info width={150} label="Url the request is sent to, must be https" />
      </h3>
      <Row fill>
        <Input
          type="text"
          required
          pattern="^https://.*"
          placeholder={
            (settings.authType === config.key.authType.gitlabCommit &&
              "https://gitlab.com/api/v4/projects/:projectId") ||
            "https://api.github.com/repos/:username/:repo/dispatches"
          }
          value={settings.serverUrl}
          onChange={(value) =>
            updateSettings((draft) => {
              draft.serverUrl = value;
            })
          }
        />
      </Row>

      <h3>Accept header</h3>
      <Row fill>
        <Input
          type="text"
          required
          pattern="\S+"
          placeholder="application/vnd.github.v3+json"
          value={settings.acceptHeader}
          onChange={(value) =>
            updateSettings((draft) => {
              draft.acceptHeader = value;
            })
          }
        />
      </Row>

      <h3>Content-Type header</h3>
      <Row fill>
        <Input
          type="text"
          required
          pattern="\S+"
          placeholder="text/plain;charset=UTF-8"
          value={settings.contentType}
          onChange={(value) =>
            updateSettings((draft) => {
              draft.contentType = value;
            })
          }
        />
      </Row>

      <h3>Auth type</h3>
      <Row fill>
        <Select
          defaultValue={settings.authType}
          onChange={({ value }) =>
            updateSettings((draft) => {
              draft.authType = value;
            })
          }
          placeholder="Auth type"
          options={[
            {
              label: "(Github) token",
              value: config.key.authType.token,
            },
            {
              label: "(Gitlab) token",
              value: config.key.authType.gitlabToken,
            },
            {
              label: "(Gitlab) Project Token",
              value: config.key.authType.gitlabCommit,
            },
            {
              label: "Basic authentication",
              value: config.key.authType.basic,
            },
            {
              label: "Bearer token authentication",
              value: config.key.authType.bearer,
            },
          ]}
        />
      </Row>

      <h3>Access token</h3>
      <Row fill>
        <Input
          type="text"
          required
          pattern="\S+"
          placeholder="Your access token"
          value={settings.accessToken}
          onChange={(value) =>
            updateSettings((draft) => {
              draft.accessToken = value;
            })
          }
        />
      </Row>
      {settings.authType === config.key.authType.gitlabToken && (
        <>
          <h3>
            Reference
            <Info
              width={150}
              label='The branch or commit to associate with a Gitlab trigger. Only used when Gitlab is selected for "Auth type"'
            />
          </h3>
          <Row fill>
            <Input
              type="text"
              required
              pattern="\S+"
              placeholder="main"
              value={settings.reference}
              onChange={(value) =>
                updateSettings((draft) => {
                  draft.reference = value;
                })
              }
            />
          </Row>
        </>
      )}

      {config.key.authType.gitlabCommit === settings.authType && (
        <>
          <h3>
            Branch
            <Info
              width={150}
              label='The branch where the file will be committed. Only used when Gitlab Project selected for "Auth type"'
            />
          </h3>
          <Row fill>
            <Input
              type="text"
              required
              pattern="\S+"
              placeholder="main"
              value={settings.reference}
              onChange={(value) =>
                updateSettings((draft) => {
                  draft.reference = value;
                })
              }
            />
          </Row>
        </>
      )}

      <Separator />
      <Title size="xlarge" weight="bold">
        About This Export
      </Title>
      <h3>
        Commit Message
        <Info
          width={200}
          label='Typically this will be a "commit message" for Git. Your organization may require a specific convention for these messages.'
        />
      </h3>
      <Row fill>
        <Input
          type="text"
          placeholder="Describe what has changed since the last export"
          value={commitMessage}
          onChange={(value) => setCommitMessage(value)}
        />
      </Row>
      <Footer>
        <WebLink
          align="start"
          href="https://github.com/lukasoppermann/design-tokens#design-tokens"
        >
          Documentation
        </WebLink>
        <CancelButton />
        <Button type="submit" autofocus>
          Save & Export
        </Button>
      </Footer>
    </form>
  );
};
