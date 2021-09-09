# notes

react typescript eslint redux-toolkit react-router axios materialUI (graphql)
.net core entityframework signalR sqlite (graphql)
cloud deployment

## todos

add back to top and add new article on the right bottom
learn back end
graphql

## eslint

[eslint](https://andrebnassis.medium.com/setting-eslint-on-a-react-typescript-project-2021-1190a43ffba)
npm install eslint --save-dev
npx eslint --init
npm install eslint-config-airbnb-typescript --save-dev
npx install-peerdeps --dev eslint-config-airbnb-typescript
npm install --save-dev eslint-config-prettier

## redux toolkit

## styled components

## react router

``` js
  let history = useHistory();

  function handleClick() {
    history.push("/home");
  }
```

## antd customise theme

use craco to eject react script and modify webpack

## problem

### problem1

We don't need to import react to use jsx in react 17, although eslint give errors with import.

### fix1

```js
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off"
```

### problem2

Parsing error “parserOptions.project” has been set for @typescript-eslint/parser

### fix2

Add it to the includes in tsconfig.json

```js
"include": [
  ".eslintrc.js",
]
```

how to get the types of the actions in slice?

## 配置

1. npm init -y 生成package.json
2. 然后npx tsconfig.json下载ts配置
3. 安装npm i -D @types/node nodemon ts-node typescript
4. 创建src/index.ts，随便写点东西
5. 更改npm script     "start": "nodemon --exec ts-node src/index.ts"

## 配置mikro-orm

1. index写配置

   ```ts
   const main = async () => {
     const orm = await MikroORM.init({
       dbName: 'JustinBlog',
       debug: !__prod__,
       type: 'sqlite',
       entities: [],
     });
   };
   ```

   `export const __prod__ = process.env.NODE_ENV === 'production';`
2. 创建一个entity

   ```ts
     @Entity()
     export class Test {
       @PrimaryKey()
       id!: number;

       @Property()
       title!: string;

       @Property()
       createdAt: Date = new Date();

       @Property({ onUpdate: () => new Date() })
       updatedAt: Date = new Date();
     }
   ```

3. 把数据格式写进数据库里
   1. 第一种用cli来migration

      ```shell
      npx mikro-orm migration:create --initial 第一次
      npx mikro-orm migration:create 以后
      ```

      这种在看教程时管用，用的数据库时postgresql。但是这个项目用sqlite的时候只创建了mikro_orm_migrations的table。不创建test表。
   2. 第二种用schemaGenerator

      `npx mikro-orm schema:update --run`

      这个在和sqlite使用是管用。
   3. 在index中写在代码里

      ```ts
      const main = async () => {
      const orm = await MikroORM.init(mikroOrmConfig);
      // orm.getMigrator().up(); 好像和下面那个只能用一个
      orm.getSchemaGenerator().updateSchema();
      const post = orm.em.create(Test, { title: 'first' });
      await orm.em.persistAndFlush(post);
      };
      ```

4. 安装apollo