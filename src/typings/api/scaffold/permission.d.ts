/** 后端返回的用户权益相关类型 */
declare namespace Api {
  interface Permission {
    id: number;
    parent_id: number;
    slug: string;
    type: string;
    path: string;
    title: string;
    icon: string;
    require_auth: boolean;
    keepalive: boolean;
    sort_num: number;
    rules: PermissionRule[];

    children?: Permission[];
  }

  interface PermissionRule {
    http_methods: string[];
    http_path: string;
  }
}
