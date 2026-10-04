/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query Me {\n  me {\n    id\n    email\n    role\n  }\n}": typeof types.MeDocument,
    "query GetMyNotifications($limit: Int, $offset: Int) {\n  getMyNotifications(limit: $limit, offset: $offset) {\n    id\n    type\n    title\n    message\n    read\n    action_url\n    created_at\n  }\n}\n\nquery NotificationStats {\n  notificationStats {\n    unreadCount\n  }\n}\n\nmutation MarkNotificationAsRead($notificationId: ID!) {\n  markNotificationAsRead(notificationId: $notificationId)\n}\n\nmutation MarkAllNotificationsAsRead {\n  markAllNotificationsAsRead\n}\n\nmutation RegisterPushToken($token: String!, $device: String) {\n  registerPushToken(token: $token, device: $device)\n}": typeof types.GetMyNotificationsDocument,
};
const documents: Documents = {
    "query Me {\n  me {\n    id\n    email\n    role\n  }\n}": types.MeDocument,
    "query GetMyNotifications($limit: Int, $offset: Int) {\n  getMyNotifications(limit: $limit, offset: $offset) {\n    id\n    type\n    title\n    message\n    read\n    action_url\n    created_at\n  }\n}\n\nquery NotificationStats {\n  notificationStats {\n    unreadCount\n  }\n}\n\nmutation MarkNotificationAsRead($notificationId: ID!) {\n  markNotificationAsRead(notificationId: $notificationId)\n}\n\nmutation MarkAllNotificationsAsRead {\n  markAllNotificationsAsRead\n}\n\nmutation RegisterPushToken($token: String!, $device: String) {\n  registerPushToken(token: $token, device: $device)\n}": types.GetMyNotificationsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Me {\n  me {\n    id\n    email\n    role\n  }\n}"): (typeof documents)["query Me {\n  me {\n    id\n    email\n    role\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetMyNotifications($limit: Int, $offset: Int) {\n  getMyNotifications(limit: $limit, offset: $offset) {\n    id\n    type\n    title\n    message\n    read\n    action_url\n    created_at\n  }\n}\n\nquery NotificationStats {\n  notificationStats {\n    unreadCount\n  }\n}\n\nmutation MarkNotificationAsRead($notificationId: ID!) {\n  markNotificationAsRead(notificationId: $notificationId)\n}\n\nmutation MarkAllNotificationsAsRead {\n  markAllNotificationsAsRead\n}\n\nmutation RegisterPushToken($token: String!, $device: String) {\n  registerPushToken(token: $token, device: $device)\n}"): (typeof documents)["query GetMyNotifications($limit: Int, $offset: Int) {\n  getMyNotifications(limit: $limit, offset: $offset) {\n    id\n    type\n    title\n    message\n    read\n    action_url\n    created_at\n  }\n}\n\nquery NotificationStats {\n  notificationStats {\n    unreadCount\n  }\n}\n\nmutation MarkNotificationAsRead($notificationId: ID!) {\n  markNotificationAsRead(notificationId: $notificationId)\n}\n\nmutation MarkAllNotificationsAsRead {\n  markAllNotificationsAsRead\n}\n\nmutation RegisterPushToken($token: String!, $device: String) {\n  registerPushToken(token: $token, device: $device)\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;