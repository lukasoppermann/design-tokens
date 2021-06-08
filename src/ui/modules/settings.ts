/* eslint-env browser */
import { Settings } from '../../../types/settings'

const settingIds = {
  accessToken: '#accessToken',
  filename: '#filename',
  nameConversion: '#nameConversion',
  prefix: '#prefix',
  excludePrefix: '#excludePrefix',
  serverUrl: '#serverUrl',
  eventType: '#eventtype',
  acceptHeader: '#acceptHeader',
  authType: '#authType'
}

const getFormSettings = (form: HTMLFormElement): { settings: Settings, accessToken: string } => {
  // get settings
  const settings = {
    filename: (form.querySelector(settingIds.filename) as HTMLInputElement).value,
    nameConversion: (form.querySelector(settingIds.nameConversion) as HTMLInputElement).value,
    prefix: (form.querySelector(settingIds.prefix) as HTMLInputElement).value,
    excludePrefix: (form.querySelector(settingIds.excludePrefix) as HTMLInputElement).checked,
    serverUrl: (form.querySelector(settingIds.serverUrl) as HTMLInputElement).value,
    eventType: (form.querySelector(settingIds.eventType) as HTMLInputElement).value,
    acceptHeader: (form.querySelector(settingIds.acceptHeader) as HTMLInputElement).value,
    authType: (form.querySelector(settingIds.authType) as HTMLInputElement).value
  }
  // get access token
  const accessToken: string = (form.querySelector(settingIds.accessToken) as HTMLInputElement).value
  // return values
  return {
    // @ts-ignore
    settings: settings,
    accessToken: accessToken
  }
}

const setFormSettings = (form: HTMLFormElement, settings: Settings, accessToken?: string): void => {
  // set settings
  (form.querySelector(settingIds.filename) as HTMLInputElement).value = settings.filename;
  (form.querySelector(settingIds.nameConversion).querySelector(`[value=${settings.nameConversion}]`) as HTMLOptionElement).selected = true;
  (form.querySelector(settingIds.prefix) as HTMLInputElement).value = settings.prefix;
  (form.querySelector(settingIds.excludePrefix) as HTMLInputElement).checked = settings.excludePrefix;
  (form.querySelector(settingIds.serverUrl) as HTMLInputElement).value = settings.serverUrl;
  (form.querySelector(settingIds.eventType) as HTMLInputElement).value = settings.eventType;
  (form.querySelector(settingIds.acceptHeader) as HTMLInputElement).value = settings.acceptHeader;
  (form.querySelector(settingIds.authType) as HTMLInputElement).value = settings.authType;
  // set access token
  (form.querySelector(settingIds.accessToken) as HTMLInputElement).value = accessToken
  // return values
}

export { settingIds, getFormSettings, setFormSettings }
