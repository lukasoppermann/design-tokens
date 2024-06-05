import { utf8ToBase64 } from "@src/utilities/base64";
import {
  urlExportRequestBody,
  urlExportSettings,
} from "@typings/urlExportData";

export class GitlabRepository {
  baseUrl: string;
  token: string;

  constructor(props: { baseUrl: string; token: string }) {
    this.baseUrl = props.baseUrl;
    this.token = props.token;
  }

  async upload(
    { client_payload: clientPayload }: urlExportRequestBody,
    { reference: branch }: urlExportSettings,
    responseHandler: {
      onError: () => void;
      onLoaded: (request: XMLHttpRequest) => void;
    }
  ) {
    const encodedContent = utf8ToBase64(clientPayload.tokens);
    const encodedFilepath = encodeURIComponent(clientPayload.filename);

    let isFileExist: boolean;
    try {
      isFileExist = await this._checkFile(encodedFilepath, branch);
    } catch (error) {
      if (error && error.request && error.code === 401) {
        responseHandler.onLoaded(error.request);
      }
      return;
    }

    const uploadRequest = new XMLHttpRequest();
    uploadRequest.onerror = (_err) => responseHandler.onError();
    uploadRequest.onload = (event) =>
      responseHandler.onLoaded(event.target as XMLHttpRequest);

    this._uploadFile({
      request: uploadRequest,
      content: encodedContent,
      commitMessage: clientPayload.commitMessage,
      filepath: encodedFilepath,
      branch: branch,
      isFileExist: isFileExist,
    });
  }

  private _checkFile(
    encodedFilepath: string,
    branch: string
  ): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open(
        "GET",
        `${this.baseUrl}/repository/files/${encodedFilepath}?ref=${branch}`
      );
      request.setRequestHeader("Authorization", `Bearer ${this.token}`);

      request.onreadystatechange = (_ev: ProgressEvent) => {
        if (request.readyState !== XMLHttpRequest.DONE) {
          return;
        }

        const statusCode = request.status;
        if (statusCode === 200) {
          resolve(true);
          return;
        }

        if (statusCode === 404) {
          resolve(false);
          return;
        }

        reject({
          code: statusCode,
          message: request.response,
          request: request,
        });
      };

      request.send();
    });
  }

  private _uploadFile(args: {
    request: XMLHttpRequest;
    filepath: string;
    content: string;
    commitMessage: string;
    branch: string;
    isFileExist: boolean;
  }) {
    const { isFileExist, request, branch, content, commitMessage, filepath } = args;

    const body = {
      branch: branch,
      content: content,
      commit_message: commitMessage,
      encoding: "base64",
    };
    const encodedFilepath = encodeURIComponent(filepath);

    request.open(
      isFileExist ? "PUT" : "POST",
      `${this.baseUrl}/repository/files/${encodedFilepath}`
    );
    request.setRequestHeader("Authorization", `Bearer ${this.token}`);
    request.send(JSON.stringify(body));
  }
}
