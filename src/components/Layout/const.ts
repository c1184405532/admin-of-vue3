type SiderBarMenuTree = {
  title: string;
  path?: string;
  children?: SiderBarMenuTree[];
};

const siderBarList: SiderBarMenuTree[] = [
  { title: "首页", path: "/home" },
  { title: "表格页", path: "/table" },
  { title: "标题3" },
  { title: "标题4", children: [{ title: "标题4-1" }, { title: "标题4-2" }] },
  {
    title: "标题5",
    children: [
      { title: "标题5-1", children: [{ title: "标题5-1-1" }] },
      { title: "标题5-2" },
    ],
  },
];

export { siderBarList };

export type { SiderBarMenuTree };
