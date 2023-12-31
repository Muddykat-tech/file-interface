import joinPath from "join-path";
import https from "https";
import { FileSystemInterface } from "../FileSystemInterface.js";
import { FileIdentifier, FileItem, PathIdentifier, DBInterfaceConfig } from "../types.js";
import { ButtercupServerClient } from "buttercup-server-client";
const axios = require("axios");

export class DBInterface extends FileSystemInterface {
    databaseURL: string;
    databaseUUID: string;
    buttercupServerClient: ButtercupServerClient;

    constructor(config: DBInterfaceConfig) {
        super(config);
        this.databaseURL = config.dbURL;
        this.databaseUUID = config.uuid;
        this.buttercupServerClient = config.buttercupServerClient;
    }

    getDirectoryContents(pathIdentifier?: PathIdentifier): Promise<Array<FileItem>> {
        return this.buttercupServerClient.getDirectoryContent(
            this.databaseURL,
            this.databaseUUID,
            pathIdentifier
        );
    }

    // getDirectoryContents(pathIdentifier?: PathIdentifier): Promise<Array<FileItem>> {
    //     const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    //     return new Promise<Array<FileItem>>((resolve, reject) => {
    //         axios
    //             .get(this.databaseURL + "api/UserDatas/" + this.databaseUUID, { httpsAgent })
    //             .then(response => {
    //                 if (response.status == 200 || response.status == 201) {
    //                     const data = response.data;
    //                     resolve([
    //                         {
    //                             identifier: data.vaultName + ".bcup",
    //                             name: data.vaultName + ".bcup",
    //                             type: "file",
    //                             size: data.vaultData.length
    //                         } as FileItem
    //                     ]);
    //                 }
    //             })
    //             .catch(error => {
    //                 console.log("Error: " + error.message);
    //                 if (error.response.status == 404) {
    //                     resolve([]);
    //                 }
    //                 reject("Error Occured: " + String(error));
    //             });
    //     });
    // }

    // getFileContents(fileIdentifier: PathIdentifier): Promise<string> {
    //     const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    //     return new Promise<string>((resolve, reject) => {
    //         axios
    //             .get(this.databaseURL + "api/UserDatas/" + this.databaseUUID, { httpsAgent })
    //             .then(response => {
    //                 console.log(response);
    //                 console.log("Getting File Data!");
    //                 if (response.status == 200 || response.status == 201) {
    //                     const data = response.data;
    //                     resolve(data.vaultData as string);
    //                 }
    //             })
    //             .catch(error => {
    //                 reject("Error Occured: " + String(error));
    //             });
    //     });
    // }

    getFileContents(fileIdentifier: PathIdentifier): Promise<string> {
        return this.buttercupServerClient.getFileContents(
            this.databaseURL,
            this.databaseUUID,
            fileIdentifier
        );
    }

    putFileContents(
        parentPathIdentifier: PathIdentifier,
        fileIdentifier: FileIdentifier,
        data: string
    ): Promise<FileIdentifier> {
        return this.buttercupServerClient.putFileContents(
            this.databaseURL,
            this.databaseUUID,
            parentPathIdentifier,
            fileIdentifier,
            data
        );
    }

    // putFileContents(
    //     parentPathIdentifier: PathIdentifier,
    //     fileIdentifier: FileIdentifier,
    //     data: string
    // ): Promise<FileIdentifier> {
    //     const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    //     const jsonData = {
    //         tideUID: this.databaseUUID,
    //         vaultName: fileIdentifier.toString(),
    //         vaultData: data
    //     };
    //     return new Promise<FileIdentifier>((resolve, reject) => {
    //         axios
    //             .put(this.databaseURL + "api/UserDatas/" + this.databaseUUID, jsonData, {
    //                 httpsAgent
    //             })
    //             .catch(error => {
    //                 reject("Error Occured: " + String(error));
    //             });
    //         resolve(fileIdentifier);
    //     });
    // }
}
