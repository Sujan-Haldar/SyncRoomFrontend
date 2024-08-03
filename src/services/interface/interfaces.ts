export type OmitMultiple<T, K extends keyof T> = Omit<T, K>;
export interface ServerInterface {
  id: string;
  name: string;
  imageUrl: string;
  inviteCode: string;
  user: { id: string };
}

export interface ChannelInterface {
  id: string;
  name: string;
  type: string;
}

export interface MemberInterface {
  id: string;
  user: UserInterface;
  role: string;
}
export interface UserInterface {
  id: string;
  name: string;
  email?: string;
  imageUrl?: string;
}

export interface ServerInterfaceForServerSidebar extends ServerInterface {
  members: Array<MemberInterface>;
  channels: Array<ChannelInterface>;
}

export interface ConversationInterface {
  id: string;
  memberOne: MemberInterface;
  memberTwo: MemberInterface;
}
