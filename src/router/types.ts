import { RouteRecordRaw } from "vue-router";

type RouteRecordRawType = RouteRecordRaw & {
  title: string;
  children?: RouteRecordRawType[]
}

export type {
  RouteRecordRawType
}