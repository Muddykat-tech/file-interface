import joinPath from "join-path";
import https from "https";
import { FileSystemInterface } from "../FileSystemInterface.js";
import { FileIdentifier, FileItem, PathIdentifier, DBInterfaceConfig } from "../types.js";
const axios = require("axios");

export class DBInterface extends FileSystemInterface {
    databaseURL: string;

    constructor(config: DBInterfaceConfig) {
        super(config);
        this.databaseURL = config.dbURL;
    }

    getDirectoryContents(pathIdentifier?: PathIdentifier): Promise<Array<FileItem>> {
        const pathItem = pathIdentifier ? pathIdentifier.identifier : "/";

        const httpsAgent = new https.Agent({ rejectUnauthorized: false });
        axios.get(this.databaseURL + "api/UserDatas", { httpsAgent }).then(response => {
            console.log(response as string);
            //response.map(item => ({
            //    identifier: item.filename,
            //    name: item.basename,
            //    type: item.type,
            //    size: item.type === "directory" ? 0 : item.size,
            //    modified: new Date(item.lastmod).toUTCString(),
            //    parent: pathIdentifier
        });
        return null;
    }
}
