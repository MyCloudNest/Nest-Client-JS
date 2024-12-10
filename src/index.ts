import axios from "axios";
import type { AxiosResponse } from "axios";

interface FileResponse {
  ok: boolean;
  file_id: string;
  file_name: string;
  file_path: string;
  file_hash: string;
}

export default class NestClient {
  private readonly baseUrl: string;
  private readonly apiPath = "/api/v1/files";

  /**
   * The constructor function in TypeScript validates a URL and assigns it to the baseUrl property.
   * @param {string} url - The `url` parameter in the constructor function is a string that represents
   * the URL that will be validated and set as the base URL for the instance.
   */
  constructor(url: string) {
    this.validateUrl(url);
    this.baseUrl = url;
  }

  private validateUrl(url: string): void {
    if (!url) {
      throw new Error("URL is required");
    }
  }

  private validateFileId(fileId: string): void {
    if (!fileId) {
      throw new Error("File ID is required");
    }
  }

  private validateFileUpload(file: File, fileName: string): void {
    if (!file) {
      throw new Error("File is required");
    }
    if (!fileName) {
      throw new Error("File name is required");
    }
  }

  private handleError(error: Error, operation: string): never {
    console.error(`Error ${operation}:`, error);
    throw error;
  }

  /**
   * The `upload` function in TypeScript asynchronously uploads a file along with optional file name and
   * description using Axios and returns a Promise of FileResponse.
   * @param {File} file - The `file` parameter in the `upload` function represents the file that you want
   * to upload. It should be of type `File`, which is typically obtained from an input element in a form
   * or through some other means of file selection in a web application. This file will be sent as part
   * of
   * @param [fileName] - The `fileName` parameter in the `upload` function is used to specify the name of
   * the file being uploaded. It allows the user to provide a custom name for the file instead of using
   * the default name.
   * @param [description] - The `description` parameter in the `upload` function is a string that
   * represents additional information or a description related to the file being uploaded. It is an
   * optional parameter, meaning you can provide a description if needed, but it is not required for the
   * file upload process to be successful.
   * @returns The `upload` function returns a Promise that resolves to a `FileResponse` object.
   */
  async upload(
    file: File,
    fileName = "",
    description = ""
  ): Promise<FileResponse> {
    this.validateFileUpload(file, fileName);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("file_name", fileName);
      formData.append("description", description);

      const response: AxiosResponse<FileResponse> = await axios.post(
        `${this.baseUrl}${this.apiPath}`,
        formData
      );
      return response.data;
    } catch (error) {
      this.handleError(error as Error, "uploading file");
    }
  }

  /**
   * The `delete` function asynchronously deletes a file using Axios and returns the file response.
   * @param {string} fileId - The `fileId` parameter is a string that represents the unique identifier of
   * the file that you want to delete. This identifier is used to locate and delete the specific file
   * from the server.
   * @returns The `delete` method is returning a `Promise` that resolves to a `FileResponse` object.
   */
  async delete(fileId: string): Promise<FileResponse> {
    this.validateFileId(fileId);

    try {
      const response: AxiosResponse<FileResponse> = await axios.delete(
        `${this.baseUrl}${this.apiPath}/${fileId}`
      );
      return response.data;
    } catch (error) {
      this.handleError(error as Error, "deleting file");
    }
  }

  /**
   * This TypeScript function asynchronously fetches a file using Axios based on the provided fileId and
   * download option.
   * @param {string} fileId - The `fileId` parameter in the `get` function is a string that represents
   * the unique identifier of the file that you want to retrieve. It is used to specify which file to
   * fetch from the server.
   * @param [download=false] - The `download` parameter in the `get` function is a boolean parameter that
   * specifies whether the file should be downloaded or not. When `download` is set to `true`, the file
   * will be downloaded, and when set to `false`, the file will be fetched without downloading.
   * @returns The `get` method is returning a Promise that resolves to a `FileResponse` object.
   */
  async get(fileId: string, download = false): Promise<FileResponse> {
    this.validateFileId(fileId);

    try {
      const response: AxiosResponse<FileResponse> = await axios.get(
        `${this.baseUrl}${this.apiPath}/${fileId}`,
        {
          params: { download },
        }
      );
      return response.data;
    } catch (error) {
      this.handleError(error as Error, "fetching file");
    }
  }
}
