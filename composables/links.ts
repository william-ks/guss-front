interface ILink {
  title: string;
  url?: string;
  subDomains?: Omit<ILink, "subDomains">[];
}

const links: ILink[] = [
  {
    title: "Gestors",
    url: "/gestor/dashboard",
  },
];

export { links };
