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
        return this.buttercupServerClient.getDirectoryContent(pathIdentifier);
    }

    getFileContents(fileIdentifier: PathIdentifier): Promise<string> {
        return this.buttercupServerClient.getFileContents(fileIdentifier);
    }

    putFileContents(
        parentPathIdentifier: PathIdentifier,
        fileIdentifier: FileIdentifier,
        encryptedData: string
    ): Promise<FileIdentifier> {
        return this.buttercupServerClient
            .putFileContents(fileIdentifier.name, encryptedData)
            .then(resolvedString => ({
                identifier: "encryptedData",
                name: resolvedString
            }));
    }
}
