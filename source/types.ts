import type { GoogleDriveClient } from "@buttercup/googledrive-client";
import type { WebDAVClient } from "webdav";
import { ButtercupServerClient } from "@amalsaju/buttercup-server-client";

export interface DropboxInterfaceConfig {
    dropboxClient: any;
}

export interface DBInterfaceConfig {
    dbURL: string;
    uuid: string;
    buttercupServerClient: ButtercupServerClient;
}

export interface FileIdentifier {
    identifier: Identifier | null;
    name: string;
}

export interface FileItem {
    identifier: Identifier;
    name: string;
    type: "file" | "directory";
    size: number;
    mime?: string;
    created?: string;
    modified?: string;
    parent?: PathIdentifier;
}

export interface GoogleDriveInterfaceConfig {
    googleDriveClient: GoogleDriveClient;
}

export type Identifier = string | number;

export interface NodeFSInterfaceConfig {
    fs: any;
}

export interface PathIdentifier {
    identifier: Identifier;
    name: string;
}

export interface WebDAVInterfaceConfig {
    webdavClient: WebDAVClient;
}
